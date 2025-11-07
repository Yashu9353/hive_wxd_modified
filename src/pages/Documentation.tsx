import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tile,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  AspectRatio,
} from '@carbon/react';
import { Video, DocumentView } from '@carbon/icons-react';

const Documentation = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/documentation" isCurrentPage>Documentation</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Documentation & Demo Videos
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#525252', maxWidth: '800px' }}>
        Learn how to use the migration suite through comprehensive documentation and video demonstrations.
      </p>

      <Tabs>
        <TabList aria-label="Documentation sections">
          <Tab>Overview Video</Tab>
          <Tab>Schema Conversion</Tab>
          <Tab>Data Migration</Tab>
          <Tab>Data Validation</Tab>
          <Tab>Documentation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid style={{ marginTop: '2rem' }}>
              <Column lg={12} md={8} sm={4}>
                <Tile style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    <Video size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    Complete Migration Walkthrough
                  </h3>
                  <p style={{ marginBottom: '2rem', color: '#525252' }}>
                    This comprehensive video covers the entire migration process from Hive to Watsonx.data, including
                    schema conversion, data transfer, and validation procedures.
                  </p>
                  <AspectRatio ratio="16x9">
                    <div style={{ 
                      background: '#161616', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#f4f4f4',
                      height: '100%'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <Video size={64} style={{ marginBottom: '1rem' }} />
                        <p>Video Player: Complete Migration Process</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#c6c6c6' }}>
                          Duration: 25:30
                        </p>
                      </div>
                    </div>
                  </AspectRatio>
                </Tile>
              </Column>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid style={{ marginTop: '2rem' }}>
              <Column lg={12} md={8} sm={4}>
                <Tile style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Schema Conversion Demo
                  </h3>
                  <p style={{ marginBottom: '2rem', color: '#525252' }}>
                    Learn how to convert Hive DDL schemas to Watsonx.data compatible format with automated tools.
                  </p>
                  <AspectRatio ratio="16x9">
                    <div style={{ 
                      background: '#161616', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#f4f4f4',
                      height: '100%'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <Video size={64} style={{ marginBottom: '1rem' }} />
                        <p>Video Player: DDL Conversion Process</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#c6c6c6' }}>
                          Duration: 8:45
                        </p>
                      </div>
                    </div>
                  </AspectRatio>
                </Tile>
              </Column>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid style={{ marginTop: '2rem' }}>
              <Column lg={12} md={8} sm={4}>
                <Tile style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Data Migration Demo
                  </h3>
                  <p style={{ marginBottom: '2rem', color: '#525252' }}>
                    Watch a step-by-step demonstration of loading tables from Hive to Watsonx.data with monitoring.
                  </p>
                  <AspectRatio ratio="16x9">
                    <div style={{ 
                      background: '#161616', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#f4f4f4',
                      height: '100%'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <Video size={64} style={{ marginBottom: '1rem' }} />
                        <p>Video Player: Table Loading Process</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#c6c6c6' }}>
                          Duration: 12:20
                        </p>
                      </div>
                    </div>
                  </AspectRatio>
                </Tile>
              </Column>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid style={{ marginTop: '2rem' }}>
              <Column lg={12} md={8} sm={4}>
                <Tile style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Data Validation Demo
                  </h3>
                  <p style={{ marginBottom: '2rem', color: '#525252' }}>
                    See how to validate migrated data for completeness, accuracy, and consistency between source and target.
                  </p>
                  <AspectRatio ratio="16x9">
                    <div style={{ 
                      background: '#161616', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#f4f4f4',
                      height: '100%'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <Video size={64} style={{ marginBottom: '1rem' }} />
                        <p>Video Player: Data Validation Process</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#c6c6c6' }}>
                          Duration: 10:15
                        </p>
                      </div>
                    </div>
                  </AspectRatio>
                </Tile>
              </Column>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid style={{ marginTop: '2rem' }}>
              <Column lg={12} md={8} sm={4}>
                <Tile style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    <DocumentView size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    Written Documentation
                  </h3>
                  
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>User Interface Guide</h4>
                    <p style={{ lineHeight: 1.6, color: '#525252', marginBottom: '1.5rem' }}>
                      The migration suite provides an intuitive interface with five main sections accessible from the top navigation:
                    </p>
                    <ul style={{ lineHeight: 1.8, color: '#525252', marginBottom: '2rem', paddingLeft: '2rem' }}>
                      <li><strong>Overview:</strong> Dashboard showing migration progress and quick access to all tools</li>
                      <li><strong>Questionnaire:</strong> Assessment form to gather environment and requirements information</li>
                      <li><strong>Documentation:</strong> Video tutorials and written guides for all features</li>
                      <li><strong>Schema Conversion:</strong> Tool for converting Hive DDL to Watsonx.data format</li>
                      <li><strong>Data Migration:</strong> Interface for orchestrating table data transfer</li>
                      <li><strong>Data Validation:</strong> Tools for verifying migration accuracy</li>
                    </ul>

                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>Schema Conversion Process</h4>
                    <p style={{ lineHeight: 1.6, color: '#525252', marginBottom: '1rem' }}>
                      The schema conversion tool automatically translates Hive DDL statements to Watsonx.data compatible syntax:
                    </p>
                    <ol style={{ lineHeight: 1.8, color: '#525252', marginBottom: '2rem', paddingLeft: '2rem' }}>
                      <li>Upload or paste your Hive DDL scripts</li>
                      <li>Review detected schemas and tables</li>
                      <li>Configure conversion options (data types, partitioning strategy)</li>
                      <li>Generate Watsonx.data compatible DDL</li>
                      <li>Download converted scripts or execute directly</li>
                    </ol>

                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>Data Migration Workflow</h4>
                    <p style={{ lineHeight: 1.6, color: '#525252', marginBottom: '1rem' }}>
                      The data migration module handles the actual data transfer:
                    </p>
                    <ol style={{ lineHeight: 1.8, color: '#525252', marginBottom: '2rem', paddingLeft: '2rem' }}>
                      <li>Select tables to migrate from source Hive cluster</li>
                      <li>Configure batch size and parallelism</li>
                      <li>Set up incremental or full migration mode</li>
                      <li>Monitor progress with real-time status updates</li>
                      <li>Review migration logs and error reports</li>
                    </ol>

                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>Data Validation Features</h4>
                    <p style={{ lineHeight: 1.6, color: '#525252', marginBottom: '1rem' }}>
                      Post-migration validation ensures data integrity:
                    </p>
                    <ul style={{ lineHeight: 1.8, color: '#525252', paddingLeft: '2rem' }}>
                      <li>Row count comparison between source and target</li>
                      <li>Column data type verification</li>
                      <li>Sample data comparison</li>
                      <li>Checksum validation for critical tables</li>
                      <li>Automated reporting of discrepancies</li>
                    </ul>
                  </div>
                </Tile>
              </Column>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Documentation;
