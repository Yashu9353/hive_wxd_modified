import { useState } from 'react';
import { Home, Document, PlayOutline, Migrate, CheckmarkOutline, ChevronRight, ChevronLeft } from '@carbon/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Migrate, label: 'Data modernization', path: '/migration/flow' },
    { icon: Document, label: 'Questionnaire', path: '/questionnaire' },
    { icon: PlayOutline, label: 'Demo', path: '/demo' },
    { icon: CheckmarkOutline, label: 'Data Validation', path: '/validation' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      style={{
        width: isOpen ? '256px' : '64px',
        backgroundColor: '#ffffff',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: '48px',
        transition: 'width 0.2s ease',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
      }}
      onMouseEnter={() => { if (!isPinned) setIsOpen(true); }}
      onMouseLeave={() => { if (!isPinned) setIsOpen(false); }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => {
          const nextPinned = !isPinned;
          setIsPinned(nextPinned);
          setIsOpen(nextPinned ? true : false);
        }}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#161616',
          padding: '1.25rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'flex-end' : 'center',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {isPinned ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
      </button>

      {/* Menu Items */}
      <nav style={{ flex: 1, paddingTop: '1rem' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                backgroundColor: active ? '#edf5ff' : 'transparent',
                border: 'none',
                borderLeft: active ? '3px solid #0f62fe' : '3px solid transparent',
                color: '#161616',
                padding: '1.25rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.1s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = '#f4f4f4';
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon size={28} />
              {isOpen && (
                <span style={{ fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;
