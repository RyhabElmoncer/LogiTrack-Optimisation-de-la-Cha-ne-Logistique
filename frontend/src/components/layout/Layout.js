import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { path: '/dashboard',    label: 'Tableau de bord',  icon: '▦' },
  { path: '/stocks',       label: 'Gestion des stocks', icon: '▤' },
  { path: '/wip',          label: 'Suivi WIP',          icon: '↻' },
  { path: '/commandes',    label: 'Commandes',           icon: '✦' },
  { path: '/utilisateurs', label: 'Utilisateurs',        icon: '◉' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 60 : 230, background: 'var(--sidebar-bg)',
        display: 'flex', flexDirection: 'column', transition: 'width .2s',
        flexShrink: 0, position: 'sticky', top: 0, height: '100vh'
      }}>
        {/* Logo */}
        <div style={{ padding: '18px 16px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22, color: 'var(--sidebar-active)' }}>⬡</span>
          {!collapsed && <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14 }}>LogiTrack</span>}
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--sidebar-text)', fontSize: 16, cursor: 'pointer' }}>
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 6, marginBottom: 2,
                color: isActive ? '#fff' : 'var(--sidebar-text)',
                background: isActive ? 'var(--sidebar-active)' : 'transparent',
                fontSize: 13, fontWeight: isActive ? 500 : 400,
                transition: 'all .15s', overflow: 'hidden', whiteSpace: 'nowrap'
              })}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div style={{ padding: '14px 12px', borderTop: '1px solid #334155' }}>
          {!collapsed && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 500 }}>{user?.nom}</div>
              <div style={{ color: 'var(--sidebar-text)', fontSize: 11 }}>{user?.role?.replace('_', ' ')}</div>
            </div>
          )}
          <button onClick={handleLogout}
            style={{ width: '100%', padding: '7px', background: '#334155', border: 'none',
              borderRadius: 6, color: '#94a3b8', fontSize: 12, cursor: 'pointer', textAlign: 'center' }}>
            {collapsed ? '⏻' : 'Déconnexion'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
