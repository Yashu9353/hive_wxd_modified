import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Tile, Button } from '@carbon/react';
import { WarningAlt } from '@carbon/icons-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <Tile style={{ padding: '3rem', maxWidth: '560px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <WarningAlt size={48} style={{ color: '#0f62fe' }} />
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '0.5rem' }}>404</h1>
        <p style={{ fontSize: '1.125rem', color: '#525252', marginBottom: '1.5rem' }}>
          Oops! Page not found
        </p>
        <Button href="/" kind="primary">Return to Home</Button>
      </Tile>
    </div>
  );
};

export default NotFound;
