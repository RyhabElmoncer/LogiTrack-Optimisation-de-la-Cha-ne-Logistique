import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ROLES = [
  { value: 'admin', label: 'Administrateur' },
  { value: 'responsable_logistique', label: 'Responsable Logistique' },
  { value: 'approvisionneur', label: 'Approvisionneur' },
  { value: 'magasinier', label: 'Magasinier' },
  { value: 'direction', label: 'Direction' },
];

function UserModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState(user || { nom: '', email: '', mot_de_passe: '', role: 'magasinier', actif: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      if (user?.id) await api.put(`/utilisateurs/${user.id}`, form);
      else await api.post('/utilisateurs', form);
      onSaved();
    } catch { setError('Erreur lors de l\'enregistrement.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{user?.id ? 'Modifier utilisateur' : 'Nouvel utilisateur'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input className="form-control" name="nom" value={form.nom} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{user?.id ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe'}</label>
            <input className="form-control" name="mot_de_passe" type="password" value={form.mot_de_passe || ''} onChange={handleChange} required={!user?.id} />
          </div>
          <div className="form-group">
            <label>Rôle</label>
            <select className="form-control" name="role" value={form.role} onChange={handleChange}>
              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" name="actif" checked={form.actif} onChange={handleChange} id="actif" />
            <label htmlFor="actif" style={{ marginBottom: 0 }}>Compte actif</label>
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

const ROLE_BADGE = {
  admin: 'badge-danger',
  responsable_logistique: 'badge-info',
  approvisionneur: 'badge-warning',
  magasinier: 'badge-gray',
  direction: 'badge-success',
};

export default function UtilisateursPage() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/utilisateurs');
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async id => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    await api.delete(`/utilisateurs/${id}`);
    load();
  };

  const getRoleLabel = val => ROLES.find(r => r.value === val)?.label || val;

  return (
    <div>
      <h1 className="page-title">Gestion des utilisateurs</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={() => setModal('new')}>+ Nouvel utilisateur</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</div>
        ) : (
          <table>
            <thead>
              <tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Statut</th><th>Créé le</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.nom}</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                  <td><span className={`badge ${ROLE_BADGE[u.role] || 'badge-gray'}`}>{getRoleLabel(u.role)}</span></td>
                  <td>
                    <span className={`badge ${u.actif ? 'badge-success' : 'badge-gray'}`}>
                      {u.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                    {new Date(u.date_creation).toLocaleDateString('fr-FR')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => setModal(u)}>Modifier</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 30 }}>Aucun utilisateur</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <UserModal
          user={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}
