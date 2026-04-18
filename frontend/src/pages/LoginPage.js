import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, mot_de_passe);
      navigate('/dashboard');
    } catch {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--sidebar-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ width: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, color: '#3b82f6', marginBottom: 8 }}>⬡</div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 700 }}>LogiTrack</h1>
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Optimisation de la chaîne logistique</p>
        </div>

        <div className="card" style={{ background: '#1e293b', border: '1px solid #334155' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Connexion</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ color: '#94a3b8' }}>Email</label>
              <input type="email" className="form-control" value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ background: '#0f172a', border: '1px solid #334155', color: '#f1f5f9' }}
                placeholder="exemple@logistique.com" required />
            </div>
            <div className="form-group">
              <label style={{ color: '#94a3b8' }}>Mot de passe</label>
              <input type="password" className="form-control" value={mot_de_passe}
                onChange={e => setMotDePasse(e.target.value)}
                style={{ background: '#0f172a', border: '1px solid #334155', color: '#f1f5f9' }}
                placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 10, marginTop: 8 }} disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div style={{ marginTop: 16, padding: 12, background: '#0f172a', borderRadius: 6, fontSize: 12, color: '#64748b' }}>
            <strong style={{ color: '#475569' }}>Compte test :</strong><br />
            admin@logistique.com / Admin123!
          </div>
        </div>
      </div>
    </div>
  );
}
