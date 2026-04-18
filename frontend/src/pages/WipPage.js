import React, { useEffect, useState } from 'react';
import api from '../services/api';

function WipModal({ wip, onClose, onSaved }) {
  const [form, setForm] = useState(wip || {
    ligne: '', zone: '', designation: '', quantite_reelle: 0, quantite_theorique: 0, statut: 'normal'
  });
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (wip?.id) await api.put(`/wip/${wip.id}`, form);
      else await api.post('/wip', form);
      onSaved();
    } finally { setLoading(false); }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{wip?.id ? 'Modifier WIP' : 'Nouveau WIP'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          {[
            { name: 'ligne', label: 'Ligne' },
            { name: 'zone', label: 'Zone' },
            { name: 'designation', label: 'Désignation' },
            { name: 'quantite_reelle', label: 'Quantité réelle', type: 'number' },
            { name: 'quantite_theorique', label: 'Quantité théorique', type: 'number' },
          ].map(f => (
            <div className="form-group" key={f.name}>
              <label>{f.label}</label>
              <input className="form-control" name={f.name} type={f.type || 'text'}
                value={form[f.name] || ''} onChange={handleChange} required />
            </div>
          ))}
          <div className="form-group">
            <label>Statut</label>
            <select className="form-control" name="statut" value={form.statut} onChange={handleChange}>
              <option value="normal">Normal</option>
              <option value="ecart">Écart</option>
              <option value="critique">Critique</option>
            </select>
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

export default function WipPage() {
  const [wips, setWips] = useState([]);
  const [ecarts, setEcarts] = useState([]);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');

  const load = async () => {
    setLoading(true);
    const [all, ec] = await Promise.all([api.get('/wip'), api.get('/wip/ecarts')]);
    setWips(all.data);
    setEcarts(ec.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const statut_badge = { normal: 'badge-success', ecart: 'badge-warning', critique: 'badge-danger' };
  const data = tab === 'ecarts' ? ecarts : wips;

  return (
    <div>
      <h1 className="page-title">Suivi WIP — Work In Progress</h1>

      {ecarts.length > 0 && (
        <div className="alert alert-danger" style={{ marginBottom: 16 }}>
          ⚠ {ecarts.length} écart{ecarts.length > 1 ? 's' : ''} critique{ecarts.length > 1 ? 's' : ''} détecté{ecarts.length > 1 ? 's' : ''} — différence réel/théorique supérieure à 10%
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ key: 'all', label: `Tous (${wips.length})` }, { key: 'ecarts', label: `Écarts (${ecarts.length})` }].map(t => (
            <button key={t.key} className={`btn ${tab === t.key ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}>+ Nouveau WIP</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</div>
        ) : (
          <table>
            <thead>
              <tr><th>Ligne</th><th>Zone</th><th>Désignation</th><th>Qté réelle</th><th>Qté théorique</th><th>Écart</th><th>Statut</th><th>Mise à jour</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data.map(w => {
                const ecart = w.quantite_reelle - w.quantite_theorique;
                const ecartPct = w.quantite_theorique > 0 ? ((ecart / w.quantite_theorique) * 100).toFixed(1) : 0;
                return (
                  <tr key={w.id}>
                    <td><strong>{w.ligne}</strong></td>
                    <td>{w.zone}</td>
                    <td>{w.designation}</td>
                    <td style={{ fontWeight: 600 }}>{w.quantite_reelle}</td>
                    <td>{w.quantite_theorique}</td>
                    <td style={{ color: ecart !== 0 ? (ecart > 0 ? 'var(--warning)' : 'var(--danger)') : 'var(--success)', fontWeight: 600 }}>
                      {ecart > 0 ? '+' : ''}{ecart} ({ecartPct}%)
                    </td>
                    <td><span className={`badge ${statut_badge[w.statut] || 'badge-gray'}`}>{w.statut}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {new Date(w.date_maj).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <button className="btn btn-outline btn-sm" onClick={() => setModal(w)}>Modifier</button>
                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 30 }}>Aucune donnée</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <WipModal
          wip={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}
