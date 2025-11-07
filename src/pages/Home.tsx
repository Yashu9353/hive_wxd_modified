import { Tile, Grid, Column, Button } from '@carbon/react';
import { DataBase, DocumentView, Migrate, CheckmarkOutline, ArrowRight } from '@carbon/icons-react';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: '#ffffff', padding: '4rem 2rem', color: '#161616', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Grid>
            <Column lg={8} md={8} sm={4}>
              <h1 style={{ fontSize: '3rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Modernize your data, wherever it lives
              </h1>
              <p style={{ fontSize: '1.1875rem', maxWidth: '720px', lineHeight: 1.7, color: '#525252', marginBottom: '1.75rem' }}>
                Migrate from Hive to IBM watsonx.data while reducing risk, saving time and simplifying compliance.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button kind="primary" renderIcon={ArrowRight} href="/migration/flow">Go to Data modernization</Button>
                <Button kind="tertiary" renderIcon={ArrowRight} href="/demo">Explore documentation</Button>
              </div>
            </Column>
            <Column lg={8} md={8} sm={4}>
              <div style={{ height: '320px', border: '1px solid #e0e0e0', borderRadius: '4px', background: '#f4f8ff' }}>
                <svg width="100%" height="100%" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IBM style abstract illustration">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a6c8ff" />
                      <stop offset="100%" stopColor="#d0e2ff" />
                    </linearGradient>
                  </defs>
                  <rect x="20" y="30" width="170" height="110" rx="8" fill="url(#g1)" />
                  <circle cx="360" cy="90" r="50" fill="#78a9ff" opacity="0.7" />
                  <rect x="240" y="180" width="160" height="100" rx="8" fill="#edf5ff" stroke="#c6c6c6" />
                  <circle cx="130" cy="220" r="36" fill="#cfe5ff" />
                  <circle cx="470" cy="230" r="28" fill="#a6c8ff" />
                  <rect x="430" y="40" width="120" height="70" rx="8" fill="#edf5ff" stroke="#c6c6c6" />
                </svg>
              </div>
            </Column>
          </Grid>
        </div>
      </div>

      {/* What is this tool section */}
      <div style={{ padding: '4rem 2rem', background: '#f4f4f4', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 400, marginBottom: '1rem' }}>
            What is this tool?
          </h2>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: '#525252', marginBottom: '1rem' }}>
            The Migration Suite streamlines the end-to-end journey from Hive to watsonx.data. It automates
            environment assessment, connection setup, schema conversion, data loading, and post-migration validation.
          </p>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: '#525252' }}>
            Built on the IBM Carbon Design System, it ensures consistency, accessibility, and enterprise-grade UX across light and dark themes.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div style={{ padding: '3rem 2rem', flex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 400, marginBottom: '1.5rem' }}>
            Key features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <Tile style={{ height: '100%', minHeight: '300px', padding: '2rem', border: '1px solid #e0e0e0', cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                <Migrate size={48} style={{ marginBottom: '1rem', color: '#0f62fe' }} />
                <h3 style={{ fontSize: '1.375rem', fontWeight: 400, marginBottom: '0.5rem' }}>Data Migration</h3>
                <p style={{ lineHeight: 1.7, color: '#525252', marginBottom: '0.5rem' }}>
                  Orchestrate a full migration workflow:
                </p>
                <ul style={{ lineHeight: 1.7, color: '#525252', paddingLeft: '1.25rem' }}>
                  <li>Source and target connections</li>
                  <li>Load tables from Hive to watsonx.data</li>
                  <li>DDL conversion and DCL automation</li>
                  <li>Invoke data validation checks</li>
                  <li>Run all steps in batch</li>
                </ul>
            </Tile>
            <Tile style={{ height: '100%', minHeight: '300px', padding: '2rem', border: '1px solid #e0e0e0', cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                <CheckmarkOutline size={48} style={{ marginBottom: '1rem', color: '#0f62fe' }} />
                <h3 style={{ fontSize: '1.375rem', fontWeight: 400, marginBottom: '0.5rem' }}>Data Validation</h3>
                <p style={{ lineHeight: 1.7, color: '#525252' }}>
                  Validate row counts, schemas, and checksums to ensure fidelity between Hive and watsonx.data.
                </p>
            </Tile>
            <Tile style={{ height: '100%', minHeight: '300px', padding: '2rem', border: '1px solid #e0e0e0', cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                <DataBase size={48} style={{ marginBottom: '1rem', color: '#0f62fe' }} />
                <h3 style={{ fontSize: '1.375rem', fontWeight: 400, marginBottom: '0.5rem' }}>Demo & Documentation</h3>
                <p style={{ lineHeight: 1.7, color: '#525252' }}>
                  Pick source=Hive and target=watsonx.data to see focused videos, links, and documentation.
                </p>
            </Tile>
            <Tile style={{ height: '100%', minHeight: '300px', padding: '2rem', border: '1px solid #e0e0e0', cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                <DocumentView size={48} style={{ marginBottom: '1rem', color: '#0f62fe' }} />
                <h3 style={{ fontSize: '1.375rem', fontWeight: 400, marginBottom: '0.5rem' }}>Questionnaire</h3>
                <p style={{ lineHeight: 1.7, color: '#525252' }}>
                  Assess readiness and prerequisites before you run a migration.
                </p>
            </Tile>
          </div>
        </div>
      </div>

      {/* Footer moved to Layout (global) */}
    </div>
  );
};

export default Home;
