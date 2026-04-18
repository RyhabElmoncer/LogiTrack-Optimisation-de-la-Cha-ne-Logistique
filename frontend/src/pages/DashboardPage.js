import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

function KpiCard({ label, value, sub, color }) {
  return (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color }}>{value ?? '—'}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const [kpis, setKpis] = useState(null);
  const [rotation, setRotation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/dashboard/kpis'), api.get('/dashboard/rotation')])
      .then(([k, r]) => { setKpis(k.data); setRotation(r.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'var(--text-muted)', padding: 40, textAlign: 'center' }}>Chargement...</div>;

  return (
    <div>
      <h1 className="page-title">Tableau de bord</h1>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <KpiCard label="Total articles" value={kpis?.totalArticles} color="#1a56db" />
        <KpiCard label="Valeur stock" value={`${(kpis?.valeurTotale || 0).toLocaleString()} DT`} color="#38a169" />
        <KpiCard label="Articles en alerte" value={kpis?.articlesEnAlerte} sub="stock < seuil min" color="#e53e3e" />
        <KpiCard label="Articles en surstock" value={kpis?.nombreSurstock} sub={`${(kpis?.valeurSurstock || 0).toLocaleString()} DT immobilisés`} color="#d69e2e" />
        <KpiCard label="Écarts WIP critiques" value={kpis?.ecartsCritiques} color="#805ad5" />
        <KpiCard label="Commandes en attente" value={kpis?.commandesEnAttente} color="#0891b2" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Taux de rotation par article</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={rotation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="article" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="tauxRotation" fill="#1a56db" radius={[4,4,0,0]} name="Taux rotation" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Répartition des alertes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            {[
              { label: 'Articles normaux', count: (kpis?.totalArticles || 0) - (kpis?.articlesEnAlerte || 0) - (kpis?.nombreSurstock || 0), color: '#38a169' },
              { label: 'En alerte (sous seuil)', count: kpis?.articlesEnAlerte, color: '#e53e3e' },
              { label: 'En surstock', count: kpis?.nombreSurstock, color: '#d69e2e' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>{item.label}</span>
                  <strong>{item.count}</strong>
                </div>
                <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: item.color, borderRadius: 4,
                    width: `${Math.round((item.count / (kpis?.totalArticles || 1)) * 100)}%`
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
