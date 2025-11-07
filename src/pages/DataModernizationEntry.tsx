import { Tile, Grid, Column, Button } from '@carbon/react';
import { Migrate, Document, DataBase, ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const DataModernizationEntry = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>
          IBM GDC data modernization asset
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#525252', marginBottom: '3rem', maxWidth: '800px' }}>
          Choose a modernization path to get started.
        </p>

        <Grid>
          <Column lg={4} md={4} sm={4}>
            <Tile 
              style={{ 
                padding: '2rem', 
                height: '100%', 
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => navigate('/home')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0f62fe';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 98, 254, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Migrate size={48} style={{ marginBottom: '1rem', color: '#0f62fe' }} />
              <h3 style={{ fontSize: '1.375rem', fontWeight: 400, marginBottom: '0.5rem' }}>
                Data modernization
              </h3>
              <p style={{ lineHeight: 1.7, color: '#525252', marginBottom: '1rem', flex: 1 }}>
                Connect to your Hive source and watsonx.data target, load schemas, convert DDL/DCL, run validation, and execute the end-to-end migration.
              </p>
              <Button kind="primary" renderIcon={ArrowRight}>
                Get started
              </Button>
            </Tile>
          </Column>

          <Column lg={4} md={4} sm={4}>
            <Tile 
              style={{ 
                padding: '2rem', 
                height: '100%', 
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => navigate('/mdm')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0f62fe';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 98, 254, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <DataBase size={48} style={{ marginBottom: '1rem', color: '#0f62fe' }} />
              <h3 style={{ fontSize: '1.375rem', fontWeight: 400, marginBottom: '0.5rem' }}>
                MDM
              </h3>
              <p style={{ lineHeight: 1.7, color: '#525252', marginBottom: '1rem', flex: 1 }}>
                Master Data Management tools and workflows.
              </p>
              <Button kind="primary" renderIcon={ArrowRight}>
                Get started
              </Button>
            </Tile>
          </Column>

          <Column lg={4} md={4} sm={4}>
            <Tile 
              style={{ 
                padding: '2rem', 
                height: '100%', 
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => navigate('/integration')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0f62fe';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 98, 254, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Document size={48} style={{ marginBottom: '1rem', color: '#0f62fe' }} />
              <h3 style={{ fontSize: '1.375rem', fontWeight: 400, marginBottom: '0.5rem' }}>
                Data integration
              </h3>
              <p style={{ lineHeight: 1.7, color: '#525252', marginBottom: '1rem', flex: 1 }}>
                Integrate data from multiple sources and manage data pipelines.
              </p>
              <Button kind="primary" renderIcon={ArrowRight}>
                Get started
              </Button>
            </Tile>
          </Column>
        </Grid>
      </div>
    </div>
  );
};

export default DataModernizationEntry;

