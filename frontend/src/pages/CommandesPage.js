import React, { useEffect, useState } from 'react';
import api from '../services/api';

function CommandeModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    numero_commande: '', fournisseur: '', code_article: '',
    quantite: '', montant_total: '', date_livraison_prevue: ''
  });
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try { await api.post('/commandes', form); onSaved(); }
    finally { setLoading(false); }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Nouvelle commande</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { name: 'numero_commande', label: 'N° commande' },
              { name: 'fournisseur', label: 'Fournisseur' },
              { name: 'code_article', label: 'Code article' },
              { name: 'quantite', label: 'Quantité', type: 'number' },
              { name: 'montant_total', label: 'Montant total (DT)', type: 'number' },
              { name: 'date_livraison_prevue', label: 'Date livraison prévue', type: 'date' },
            ].map(f => (
              <div className="form-group" key={f.name}>
                <label>{f.label}</label>
                <input className="form-control" name={f.name} type={f.type || 'text'}
                  value={form[f.name]} onChange={handleChange} required />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Création...' : 'Créer la commande'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const STATUT_BADGE = {
  en_attente: 'badge-warning',
  validee: 'badge-success',
  bloquee: 'badge-danger',
};
const STATUT_LABEL = { en_attente: 'En attente', validee: 'Validée', bloquee: 'Bloquée' };

export default function CommandesPage() {
  const [commandes, setCommandes] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/commandes');
    setCommandes(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (id, action) => {
    await api.put(`/commandes/${id}/${action}`);
    load();
  };

  return (
    <div>
      <h1 className="page-title">Commandes fournisseurs</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={() => setModal(true)}>+ Nouvelle commande</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</div>
        ) : (
          <table>
            <thead>
              <tr><th>N° Commande</th><th>Fournisseur</th><th>Article</th><th>Quantité</th><th>Montant</th><th>Livraison prévue</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {commandes.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.numero_commande}</strong></td>
                  <td>{c.fournisseur}</td>
                  <td>{c.code_article}</td>
                  <td>{c.quantite}</td>
                  <td>{Number(c.montant_total).toLocaleString()} DT</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                    {c.date_livraison_prevue ? new Date(c.date_livraison_prevue).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td><span className={`badge ${STATUT_BADGE[c.statut] || 'badge-gray'}`}>{STATUT_LABEL[c.statut] || c.statut}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {c.statut === 'en_attente' && (
                        <>
                          <button className="btn btn-success btn-sm" onClick={() => handleAction(c.id, 'valider')}>Valider</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleAction(c.id, 'bloquer')}>Bloquer</button>
                        </>
                      )}
                      {c.statut !== 'en_attente' && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>}
                    </div>
                  </td>
                </tr>
              ))}
              {commandes.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 30 }}>Aucune commande</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modal && <CommandeModal onClose={() => setModal(false)} onSaved={() => { setModal(false); load(); }} />}
    </div>
  );
}
