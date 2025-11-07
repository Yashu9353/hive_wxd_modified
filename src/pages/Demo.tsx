import { useState } from 'react';
import { Tile, Select, SelectItem, Breadcrumb, BreadcrumbItem, Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import { PlayFilledAlt, Document } from '@carbon/icons-react';

const Demo = () => {
  const [sourceDb, setSourceDb] = useState('');
  const [targetDb, setTargetDb] = useState('');

  const shouldShowContent = sourceDb === 'hive' && targetDb === 'watsonx';

  return (
    <div style={{ padding: '2rem' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Demo & Documentation</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Demo & Documentation
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#525252', maxWidth: '800px' }}>
        Watch demo videos and explore documentation for your specific migration path.
      </p>

      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Select Migration Path</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px' }}>
          <div>
            <Select
              id="source-db-select"
              labelText="Source Database"
              value={sourceDb}
              onChange={(e) => setSourceDb(e.target.value)}
            >
              <SelectItem value="" text="Select" />
              <SelectItem value="hive" text="Hive" />
              <SelectItem value="teradata" text="Teradata" />
              <SelectItem value="oracle" text="Oracle" />
              <SelectItem value="sqlserver" text="SQL Server" />
            </Select>
          </div>
          <div>
            <Select
              id="target-db-select"
              labelText="Target Database"
              value={targetDb}
              onChange={(e) => setTargetDb(e.target.value)}
            >
              <SelectItem value="" text="Select" />
              <SelectItem value="watsonx" text="IBM Watsonx.data" />
              <SelectItem value="db2" text="IBM DB2" />
              <SelectItem value="postgres" text="PostgreSQL" />
            </Select>
          </div>
        </div>
      </Tile>

      {shouldShowContent ? (
        <Tabs>
          <TabList aria-label="Demo tabs">
            <Tab>Demo Videos</Tab>
            <Tab>Documentation</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div style={{ padding: '2rem 0' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 400 }}>
                  Hive to Watsonx.data Migration Demos
                </h3>
                
                <div style={{ display: 'grid', gap: '2rem' }}>
                  <Tile style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                      <PlayFilledAlt size={32} style={{ flexShrink: 0, color: '#0f62fe' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                          Complete Migration Workflow
                        </h4>
                        <p style={{ color: '#525252', marginBottom: '1rem', lineHeight: 1.6 }}>
                          End-to-end demonstration covering all migration steps including DDL conversion, 
                          data loading, and validation.
                        </p>
              <div style={{ aspectRatio: '16/9', backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8d8d8d' }}>
                          Video: Complete Migration Demo (15:30)
                        </div>
                      </div>
                    </div>
                  </Tile>

                  <Tile style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                      <PlayFilledAlt size={32} style={{ flexShrink: 0, color: '#0f62fe' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                          DDL Conversion Process
                        </h4>
                        <p style={{ color: '#525252', marginBottom: '1rem', lineHeight: 1.6 }}>
                          Learn how to convert Hive DDL statements to Watsonx.data compatible format.
                        </p>
                        <div style={{ aspectRatio: '16/9', backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8d8d8d' }}>
                          Video: DDL Conversion (8:45)
                        </div>
                      </div>
                    </div>
                  </Tile>

                  <Tile style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                      <PlayFilledAlt size={32} style={{ flexShrink: 0, color: '#0f62fe' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                          Data Validation Techniques
                        </h4>
                        <p style={{ color: '#525252', marginBottom: '1rem', lineHeight: 1.6 }}>
                          Comprehensive guide to validating migrated data for accuracy and completeness.
                        </p>
                        <div style={{ aspectRatio: '16/9', backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8d8d8d' }}>
                          Video: Data Validation (10:20)
                        </div>
                      </div>
                    </div>
                  </Tile>
                </div>
              </div>
            </TabPanel>
            
            <TabPanel>
              <div style={{ padding: '2rem 0' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 400 }}>
                  Documentation
                </h3>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <Tile style={{ padding: '1.5rem', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Document size={24} style={{ color: '#0f62fe' }} />
                      <div>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                          Migration Planning Guide
                        </h4>
                        <p style={{ color: '#525252', fontSize: '0.875rem' }}>
                          Best practices and planning strategies for Hive to Watsonx.data migration
                        </p>
                      </div>
                    </div>
                  </Tile>

                  <Tile style={{ padding: '1.5rem', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Document size={24} style={{ color: '#0f62fe' }} />
                      <div>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                          Schema Conversion Reference
                        </h4>
                        <p style={{ color: '#525252', fontSize: '0.875rem' }}>
                          Detailed mapping of Hive data types and structures to Watsonx.data equivalents
                        </p>
                      </div>
                    </div>
                  </Tile>

                  <Tile style={{ padding: '1.5rem', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Document size={24} style={{ color: '#0f62fe' }} />
                      <div>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                          Troubleshooting Guide
                        </h4>
                        <p style={{ color: '#525252', fontSize: '0.875rem' }}>
                          Common issues and solutions during migration process
                        </p>
                      </div>
                    </div>
                  </Tile>

                  <Tile style={{ padding: '1.5rem', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Document size={24} />
                      <div>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                          API Documentation
                        </h4>
                        <p style={{ color: '#c6c6c6', fontSize: '0.875rem' }}>
                          Technical reference for programmatic migration control
                        </p>
                      </div>
                    </div>
                  </Tile>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Tile style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', color: '#525252' }}>
            Please select <strong>Apache Hive</strong> as source and <strong>IBM Watsonx.data</strong> as target 
            to view demo videos and documentation.
          </p>
        </Tile>
      )}
    </div>
  );
};

export default Demo;
