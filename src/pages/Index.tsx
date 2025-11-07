import { Tile, Button } from '@carbon/react';

const Index = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <Tile style={{ padding: '3rem', maxWidth: '720px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>Welcome</h1>
        <p style={{ color: '#525252', marginBottom: '1.5rem' }}>
          Start building your IBM Carbon-compliant application here.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button href="/" kind="primary">Go to Home</Button>
          <Button href="/documentation" kind="secondary">Documentation</Button>
        </div>
      </Tile>
    </div>
  );
};

export default Index;
