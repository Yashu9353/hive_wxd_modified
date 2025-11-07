import { Tile, Grid, Column, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { DataBase, Migrate, CheckmarkOutline, DocumentView } from '@carbon/icons-react';

const Overview = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/" isCurrentPage>Overview</BreadcrumbItem>
      </Breadcrumb>
      
      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Hive to Watsonx.data Migration Tool
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#525252', maxWidth: '800px' }}>
        A comprehensive solution for migrating your Apache Hive data to IBM Watsonx.data with automated schema conversion, 
        data migration, and validation capabilities.
      </p>

      <Grid>
        <Column lg={8} md={4} sm={4}>
          <Tile style={{ marginBottom: '1rem', minHeight: '200px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 400 }}>
              <DataBase size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              What is this tool?
            </h3>
            <p style={{ lineHeight: 1.6, color: '#525252' }}>
              This migration suite provides end-to-end support for transitioning from Apache Hive to IBM Watsonx.data. 
              It includes automated DDL conversion, data transfer orchestration, and comprehensive validation to ensure 
              data integrity throughout the migration process.
            </p>
          </Tile>
        </Column>

        <Column lg={8} md={4} sm={4}>
          <Tile style={{ marginBottom: '1rem', minHeight: '200px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 400 }}>
              <Migrate size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Migration Process
            </h3>
            <ol style={{ lineHeight: 1.8, color: '#525252', paddingLeft: '1.5rem' }}>
              <li>Complete the initial questionnaire to assess your environment</li>
              <li>Review documentation and demo videos</li>
              <li>Convert Hive schemas to Watsonx.data format</li>
              <li>Execute data migration with monitoring</li>
              <li>Validate migrated data for accuracy and completeness</li>
            </ol>
          </Tile>
        </Column>
      </Grid>

      <Grid style={{ marginTop: '2rem' }}>
        <Column lg={5} md={4} sm={4}>
          <Tile style={{ marginBottom: '1rem', padding: '2rem', cursor: 'pointer' }} onClick={() => window.location.href = '/questionnaire'}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📋 Questionnaire</h4>
            <p style={{ color: '#525252' }}>Assess your migration readiness</p>
          </Tile>
        </Column>

        <Column lg={5} md={4} sm={4}>
          <Tile style={{ marginBottom: '1rem', padding: '2rem', cursor: 'pointer' }} onClick={() => window.location.href = '/documentation'}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              <DocumentView size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              Documentation & Demos
            </h4>
            <p style={{ color: '#525252' }}>Watch tutorials and read guides</p>
          </Tile>
        </Column>

        <Column lg={5} md={4} sm={4}>
          <Tile style={{ marginBottom: '1rem', padding: '2rem', cursor: 'pointer' }} onClick={() => window.location.href = '/schema'}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🔄 Schema Conversion</h4>
            <p style={{ color: '#525252' }}>Convert Hive DDL to Watsonx.data</p>
          </Tile>
        </Column>

        <Column lg={5} md={4} sm={4}>
          <Tile style={{ marginBottom: '1rem', padding: '2rem', cursor: 'pointer' }} onClick={() => window.location.href = '/migration'}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📦 Data Migration</h4>
            <p style={{ color: '#525252' }}>Transfer data securely</p>
          </Tile>
        </Column>

        <Column lg={5} md={4} sm={4}>
          <Tile style={{ marginBottom: '1rem', padding: '2rem', cursor: 'pointer' }} onClick={() => window.location.href = '/validation'}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              <CheckmarkOutline size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              Data Validation
            </h4>
            <p style={{ color: '#525252' }}>Verify migration accuracy</p>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
};

export default Overview;
