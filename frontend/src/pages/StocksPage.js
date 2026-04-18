import React, { useEffect, useState } from 'react';
import api from '../services/api';

function StockModal({ stock, onClose, onSaved }) {
  const [form, setForm] = useState(stock || {
    code_article: '', designation: '', fournisseur: '', emplacement: '',
    quantite_disponible: 0, quantite_bloquee: 0, seuil_min: 0, seuil_max: 0,
    consommation_journaliere: 0, valeur_unitaire: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (stock?.id) await api.put(`/stocks/${stock.id}`, form);
      else await api.post('/stocks', form);
      onSaved();
    } finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{stock?.id ? 'Modifier article' : 'Nouvel article'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { name: 'code_article', label: 'Code article' },
              { name: 'designation', label: 'Désignation' },
              { name: 'fournisseur', label: 'Fournisseur' },
              { name: 'emplacement', label: 'Emplacement' },
              { name: 'quantite_disponible', label: 'Qté disponible', type: 'number' },
              { name: 'quantite_bloquee', label: 'Qté bloquée', type: 'number' },
              { name: 'seuil_min', label: 'Seuil min', type: 'number' },
              { name: 'seuil_max', label: 'Seuil max', type: 'number' },
              { name: 'consommation_journaliere', label: 'Conso. journalière', type: 'number' },
              { name: 'valeur_unitaire', label: 'Valeur unitaire', type: 'number' },
            ].map(f => (
              <div className="form-group" key={f.name}>
                <label>{f.label}</label>
                <input className="form-control" name={f.name} type={f.type || 'text'}
                  value={form[f.name] || ''} onChange={handleChange} required />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DOHBadge({ doh, statut }) {
  const map = { critique: 'badge-danger', surstock: 'badge-warning', normal: 'badge-success', inconnu: 'badge-gray' };
  return <span className={`badge ${map[statut] || 'badge-gray'}`}>{doh}j — {statut}</span>;
}

export default function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'new' | stock object
  const [dohMap, setDohMap] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async (q = '') => {
    setLoading(true);
    const { data } = await api.get('/stocks', { params: { search: q } });
    setStocks(data);
    setLoading(false);
  };

  const loadDOH = async (stockList) => {
    const results = await Promise.all(stockList.map(s => api.get(`/stocks/${s.id}/doh`).then(r => ({ id: s.id, ...r.data }))));
    const map = {};
    results.forEach(r => { map[r.id] = r; });
    setDohMap(map);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { if (stocks.length) loadDOH(stocks); }, [stocks]);

  const handleDelete = async id => {
    if (!window.confirm('Supprimer cet article ?')) return;
    await api.delete(`/stocks/${id}`);
    load(search);
  };

  const handleSaved = () => { setModal(null); load(search); };

  return (
    <div>
      <h1 className="page-title">Gestion des stocks</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="search-bar">
          <span style={{ color: 'var(--text-muted)' }}>⌕</span>
          <input placeholder="Rechercher article, fournisseur..." value={search}
            onChange={e => { setSearch(e.target.value); load(e.target.value); }} />
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}>+ Nouvel article</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Code</th><th>Désignation</th><th>Fournisseur</th><th>Emplacement</th>
                <th>Dispo</th><th>Bloqué</th><th>Seuil min</th><th>DOH</th><th>Valeur unit.</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.code_article}</strong></td>
                  <td>{s.designation}</td>
                  <td>{s.fournisseur || '—'}</td>
                  <td>{s.emplacement || '—'}</td>
                  <td style={{ color: s.quantite_disponible < s.seuil_min ? 'var(--danger)' : 'inherit', fontWeight: 600 }}>
                    {s.quantite_disponible}
                  </td>
                  <td>{s.quantite_bloquee}</td>
                  <td>{s.seuil_min}</td>
                  <td>{dohMap[s.id] ? <DOHBadge {...dohMap[s.id]} /> : '—'}</td>
                  <td>{s.valeur_unitaire} DT</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => setModal(s)}>Modifier</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
              {stocks.length === 0 && (
                <tr><td colSpan={10} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 30 }}>Aucun article trouvé</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <StockModal
          stock={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
