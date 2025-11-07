import { useState, useEffect } from 'react';
import { Tile, Button, Breadcrumb, BreadcrumbItem, Select, SelectItem, TextInput, ProgressIndicator, ProgressStep, InlineLoading, Toggle, Checkbox, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, NotificationActionButton } from '@carbon/react';
import { Play, ArrowRight, ArrowLeft, CheckmarkFilled, ErrorFilled, CheckmarkOutline } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

// Demo data
const DEMO_SCHEMAS = {
  default: {
    tables: [
      { name: 'customers', rows: 125000, columns: 12 },
      { name: 'orders', rows: 450000, columns: 8 },
      { name: 'products', rows: 8500, columns: 15 }
    ]
  },
  sales: {
    tables: [
      { name: 'sales_transactions', rows: 1250000, columns: 10 },
      { name: 'sales_reps', rows: 150, columns: 6 }
    ]
  },
  analytics: {
    tables: [
      { name: 'user_events', rows: 5000000, columns: 14 },
      { name: 'analytics_summary', rows: 25000, columns: 20 }
    ]
  }
};

const DEMO_HIVE_DDL = `CREATE TABLE customers (
  customer_id BIGINT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  address STRING,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  registration_date TIMESTAMP,
  last_login TIMESTAMP,
  status VARCHAR(20)
)
PARTITIONED BY (registration_year INT, registration_month INT)
STORED AS PARQUET
LOCATION 's3://hive-data/customers/';`;

const DEMO_CONVERTED_DDL = `CREATE TABLE customers (
  customer_id BIGINT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  address STRING,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  registration_date TIMESTAMP,
  last_login TIMESTAMP,
  status VARCHAR(20),
  registration_year INT,
  registration_month INT
)
USING ICEBERG
PARTITIONED BY (registration_year, registration_month)
LOCATION 's3://lakehouse-data/customers/'
TBLPROPERTIES (
  'write.format.default' = 'parquet',
  'write.parquet.compression-codec' = 'snappy'
);`;

const DEMO_DCL_HIVE = `GRANT SELECT ON TABLE customers TO ROLE analyst;
GRANT INSERT, UPDATE ON TABLE customers TO ROLE admin;
GRANT ALL ON DATABASE default TO USER 'data_engineer';
REVOKE SELECT ON TABLE orders FROM ROLE guest;`;

const DEMO_DCL_ICEBERG = `-- Grant table permissions
GRANT SELECT ON TABLE customers TO ROLE analyst;
GRANT INSERT, UPDATE ON TABLE customers TO ROLE admin;

-- Grant database/catalog permissions  
GRANT ALL PRIVILEGES ON CATALOG iceberg_data TO USER 'data_engineer';

-- Revoke permissions
REVOKE SELECT ON TABLE orders FROM ROLE guest;`;

const DataMigrationNew = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [srcUploadName, setSrcUploadName] = useState('');
  const [tgtUploadName, setTgtUploadName] = useState('');
  const [operation, setOperation] = useState<'ddl' | 'validation' | ''>('');
  const [applyDcl, setApplyDcl] = useState(true);
  const [schemaUploadName, setSchemaUploadName] = useState('');
  const [continueWithoutSrc, setContinueWithoutSrc] = useState(false);
  const [continueWithoutTgt, setContinueWithoutTgt] = useState(false);
  const [srcHost, setSrcHost] = useState('demo-hive-server.ibm.com');
  const [srcPort, setSrcPort] = useState('10000');
  const [srcDb, setSrcDb] = useState('default');
  const [srcUser, setSrcUser] = useState('hive');
  const [tgtHost, setTgtHost] = useState('demo-watsonx.ibm.com');
  const [tgtPort, setTgtPort] = useState('443');
  const [tgtDb, setTgtDb] = useState('iceberg_data');
  const [tgtUser, setTgtUser] = useState('admin');
  const [srcConnected, setSrcConnected] = useState(false);
  const [tgtConnected, setTgtConnected] = useState(false);
  const [srcConnecting, setSrcConnecting] = useState(false);
  const [tgtConnecting, setTgtConnecting] = useState(false);
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
  const [loadedSchemas, setLoadedSchemas] = useState<{schema: string, tables: any[]}[]>([]);
  const [loadingSchemas, setLoadingSchemas] = useState(false);
  const [ddlPartition, setDdlPartition] = useState<'retain' | 'primary_key' | 'first_integer'>('retain');
  const [ddlFileName, setDdlFileName] = useState('');
  const [ddlConverted, setDdlConverted] = useState(false);
  const [ddlReviewed, setDdlReviewed] = useState(false);
  const [ddlConverting, setDdlConverting] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [beforeDdl, setBeforeDdl] = useState('');
  const [conversionSubtype, setConversionSubtype] = useState<'table_schema' | 'stored_procedure' | 'dcl'>('table_schema');
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [validationRunning, setValidationRunning] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState<{step: string, status: 'pending' | 'running' | 'success' | 'error'}[]>([]);
  const [migrationLogs, setMigrationLogs] = useState<string[]>([]);

  return (
    <div style={{ padding: '0', minHeight: '100vh' }}>
      {/* Header Banner - light theme */}
      <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Button kind="ghost" renderIcon={ArrowLeft} onClick={() => navigate('/migration')} style={{ marginBottom: '0.5rem' }}>
            Back to entry page
          </Button>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 300, marginBottom: '0.5rem' }}>Data modernization process</h1>
        <p style={{ fontSize: '1rem', color: '#525252', maxWidth: '900px' }}>
          Connect to your Hive source and watsonx.data target, load schemas, convert DDL/DCL, run validation, and execute the end-to-end migration.
        </p>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <ProgressIndicator currentIndex={step}>
            <ProgressStep label="Source connection" description="Hive" />
            <ProgressStep label="Target connection" description="watsonx.data" />
            <ProgressStep label="Select schemas" />
            <ProgressStep label="Select operation" />
            <ProgressStep label="Run end-to-end" />
          </ProgressIndicator>
        </div>

        {step === 0 && (
          <Tile style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Source connection (Hive)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <TextInput id="src-host" labelText="Host" placeholder="hive-host" value={srcHost} onChange={(e) => setSrcHost((e.target as HTMLInputElement).value)} />
              <TextInput id="src-port" labelText="Port" placeholder="10000" value={srcPort} onChange={(e) => setSrcPort((e.target as HTMLInputElement).value)} />
              <TextInput id="src-db" labelText="Database" placeholder="default" value={srcDb} onChange={(e) => setSrcDb((e.target as HTMLInputElement).value)} />
              <TextInput id="src-user" labelText="User" placeholder="hive" value={srcUser} onChange={(e) => setSrcUser((e.target as HTMLInputElement).value)} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button kind="secondary" onClick={() => setSrcUploadName('source-connection.json')}>Upload connection</Button>
              {srcUploadName && <span style={{ alignSelf: 'center', color: '#525252' }}>Uploaded: {srcUploadName}</span>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
                <Checkbox id="continue-without-src" labelText="Continue without source connectivity" checked={continueWithoutSrc} onChange={(_, checked) => setContinueWithoutSrc(checked)} />
              </div>
            </div>
            <div style={{ marginTop: '1rem', background: '#f4f4f4', padding: '1rem', borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Generated connection JSON (sample)</div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify({ host: srcHost, port: Number(srcPort), database: srcDb, user: srcUser }, null, 2)}</pre>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button kind="primary" renderIcon={ArrowRight} onClick={() => setStep(1)} disabled={!continueWithoutSrc && !srcConnected}>
                Continue
              </Button>
              <Button 
                kind="secondary" 
                onClick={async () => {
                  setSrcConnecting(true);
                  // Simulate connection test
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  setSrcConnected(true);
                  setSrcConnecting(false);
                }}
                disabled={srcConnecting || srcConnected}
              >
                {srcConnecting ? 'Testing...' : srcConnected ? 'Connected ✓' : 'Test connection'}
              </Button>
              {srcConnected && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#24a148' }}>
                  <CheckmarkFilled size={16} />
                  <span>Connection successful! Found 3 schemas, 8 tables</span>
                </div>
              )}
              {!continueWithoutSrc && !srcConnected && !srcConnecting && (
                <span style={{ alignSelf: 'center', color: '#8d8d8d' }}>Tip: Click "Test connection" for demo, or check the box to proceed without testing</span>
              )}
              {srcConnecting && (
                <InlineLoading description="Connecting to Hive..." />
              )}
            </div>
          </Tile>
        )}

        {step === 1 && (
          <Tile style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <Button kind="ghost" onClick={() => setStep(0)}>Back</Button>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Target connection (watsonx.data)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <TextInput id="tgt-host" labelText="Host" placeholder="lakehouse-host" value={tgtHost} onChange={(e) => setTgtHost((e.target as HTMLInputElement).value)} />
              <TextInput id="tgt-port" labelText="Port" placeholder="443" value={tgtPort} onChange={(e) => setTgtPort((e.target as HTMLInputElement).value)} />
              <TextInput id="tgt-db" labelText="Catalog" placeholder="iceberg_data" value={tgtDb} onChange={(e) => setTgtDb((e.target as HTMLInputElement).value)} />
              <TextInput id="tgt-user" labelText="User" placeholder="admin" value={tgtUser} onChange={(e) => setTgtUser((e.target as HTMLInputElement).value)} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button kind="secondary" onClick={() => setTgtUploadName('target-connection.json')}>Upload connection</Button>
              {tgtUploadName && <span style={{ alignSelf: 'center', color: '#525252' }}>Uploaded: {tgtUploadName}</span>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
                <Checkbox id="continue-without-tgt" labelText="Continue without target connectivity" checked={continueWithoutTgt} onChange={(_, checked) => setContinueWithoutTgt(checked)} />
              </div>
            </div>
            <div style={{ marginTop: '1rem', background: '#f4f4f4', padding: '1rem', borderRadius: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Generated connection JSON (sample)</div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify({ host: tgtHost, port: Number(tgtPort), database: tgtDb, user: tgtUser }, null, 2)}</pre>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button kind="primary" renderIcon={ArrowRight} onClick={() => setStep(2)} disabled={!continueWithoutTgt && !tgtConnected}>Continue</Button>
              <Button 
                kind="secondary" 
                onClick={async () => {
                  setTgtConnecting(true);
                  // Simulate connection test
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  setTgtConnected(true);
                  setTgtConnecting(false);
                }}
                disabled={tgtConnecting || tgtConnected}
              >
                {tgtConnecting ? 'Testing...' : tgtConnected ? 'Connected ✓' : 'Test connection'}
              </Button>
              {tgtConnected && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#24a148' }}>
                  <CheckmarkFilled size={16} />
                  <span>Connection successful! Connected to watsonx.data catalog: {tgtDb}</span>
                </div>
              )}
              {tgtConnecting && (
                <InlineLoading description="Connecting to watsonx.data..." />
              )}
            </div>
          </Tile>
        )}

        {step === 2 && (
          <Tile style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <Button kind="ghost" onClick={() => setStep(1)}>Back</Button>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Select schemas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 600 }}>Select source schemas (multiple)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f4f4f4' }}>
                  {['default', 'sales', 'analytics'].map((schema) => (
                    <Checkbox
                      key={schema}
                      id={`schema-${schema}`}
                      labelText={schema}
                      checked={selectedSchemas.includes(schema)}
                      onChange={(_, checked) => {
                        if (checked) {
                          setSelectedSchemas([...selectedSchemas, schema]);
                        } else {
                          setSelectedSchemas(selectedSchemas.filter((s) => s !== schema));
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Or upload schema list</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input id="schema-file" type="file" accept=".txt,.csv,.json" style={{ display: 'none' }} onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) setSchemaUploadName(file.name);
                  }} />
                  <Button kind="secondary" onClick={() => document.getElementById('schema-file')?.click()}>Upload schemas</Button>
                  <span style={{ alignSelf: 'center', color: '#525252' }}>{schemaUploadName ? `Uploaded: ${schemaUploadName}` : 'No file selected'}</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Button 
                kind="secondary" 
                onClick={async () => {
                  if (selectedSchemas.length === 0) {
                    alert('Please select at least one schema first');
                    return;
                  }
                  setLoadingSchemas(true);
                  // Simulate loading schemas
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  const loaded = selectedSchemas.map(schema => ({
                    schema,
                    tables: DEMO_SCHEMAS[schema as keyof typeof DEMO_SCHEMAS]?.tables || []
                  }));
                  setLoadedSchemas(loaded);
                  setLoadingSchemas(false);
                }}
                disabled={selectedSchemas.length === 0 || loadingSchemas}
              >
                {loadingSchemas ? 'Loading...' : 'Load schemas from source'}
              </Button>
            </div>

            {loadingSchemas && (
              <div style={{ marginTop: '1rem' }}>
                <InlineLoading description="Loading schema metadata from Hive..." />
              </div>
            )}

            {loadedSchemas.length > 0 && (
              <div style={{ marginTop: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '1rem', backgroundColor: '#f4f4f4' }}>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>Loaded Schema Information</h4>
                {loadedSchemas.map((schemaData) => (
                  <div key={schemaData.schema} style={{ marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#0f62fe' }}>
                      Schema: {schemaData.schema} ({schemaData.tables.length} tables)
                    </div>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader>Table Name</TableHeader>
                            <TableHeader>Row Count</TableHeader>
                            <TableHeader>Columns</TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {schemaData.tables.map((table) => (
                            <TableRow key={table.name}>
                              <TableCell>{table.name}</TableCell>
                              <TableCell>{table.rows.toLocaleString()}</TableCell>
                              <TableCell>{table.columns}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#2e7d32' }}>
                  <strong>✓ Schema metadata loaded successfully!</strong> Ready for DDL conversion and migration.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Button 
                kind="primary" 
                renderIcon={ArrowRight} 
                onClick={() => {
                  // Auto-load demo schemas if not already loaded
                  if (selectedSchemas.length > 0 && loadedSchemas.length === 0) {
                    const loaded = selectedSchemas.map(schema => ({
                      schema,
                      tables: DEMO_SCHEMAS[schema as keyof typeof DEMO_SCHEMAS]?.tables || []
                    }));
                    setLoadedSchemas(loaded);
                  }
                  setStep(3);
                }}
                disabled={selectedSchemas.length === 0}
              >
                Continue to operations
              </Button>
            </div>
          </Tile>
        )}

        {step === 3 && (
          <Tile style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <Button kind="ghost" onClick={() => setStep(2)}>Back</Button>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Select operation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Choose operation</label>
                <Select id="op-select" labelText="" value={operation} onChange={(e) => setOperation((e.target as HTMLSelectElement).value as any)}>
                  <SelectItem value="" text="Select" />
                  <SelectItem value="ddl" text="DDL conversion" />
                  <SelectItem value="validation" text="Data validation" />
                </Select>
              </div>
              {operation === 'ddl' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Conversion type</label>
                  <Select id="ddl-subtype" labelText="" value={conversionSubtype} onChange={(e) => setConversionSubtype((e.target as HTMLSelectElement).value as any)}>
                    <SelectItem value="table_schema" text="Table schema" />
                    <SelectItem value="stored_procedure" text="Stored procedure (DDL)" />
                    <SelectItem value="dcl" text="DCL" />
                  </Select>
                </div>
              )}
            </div>

            {operation === 'ddl' && (
              <div style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: 4, marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.75rem' }}>DDL conversion - {conversionSubtype.replace('_', ' ').toUpperCase()}</h4>
                
                {conversionSubtype === 'table_schema' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                      <TextInput id="ddl-out" labelText="Output folder" placeholder="/ddl-output" defaultValue="/ddl-output" />
                      <Select id="ddl-partition" labelText="Partitioning strategy" value={ddlPartition} onChange={(e) => setDdlPartition((e.target as HTMLSelectElement).value as any)}>
                        <SelectItem value="retain" text="Retain" />
                        <SelectItem value="primary_key" text="Primary key" />
                        <SelectItem value="first_integer" text="First integer column" />
                      </Select>
                      <Button 
                        kind="tertiary" 
                        onClick={() => {
                          setBeforeDdl(DEMO_HIVE_DDL);
                          setReviewText(DEMO_CONVERTED_DDL);
                          setDdlFileName('customers_table.sql');
                        }}
                        style={{ alignSelf: 'end' }}
                      >
                        Load demo DDL
                      </Button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <input id="ddl-file" type="file" accept=".sql,.ddl,.txt" style={{ display: 'none' }} onChange={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          setDdlFileName(file.name);
                          file.text().then(text => setBeforeDdl(text));
                        }
                      }} />
                      <Button kind="secondary" onClick={() => document.getElementById('ddl-file')?.click()}>Upload DDL file</Button>
                      <span style={{ color: '#525252' }}>{ddlFileName ? `Ready: ${ddlFileName}` : 'No file selected - Click "Load demo DDL" to try it'}</span>
                    </div>
                  </>
                )}

                {conversionSubtype === 'dcl' && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
                    <p style={{ margin: 0, color: '#525252', fontSize: '0.875rem' }}>
                      DCL conversion automatically converts Hive GRANT/REVOKE statements to watsonx.data/Iceberg format.
                      Click "Convert DDL" to see the conversion.
                    </p>
                    <Button 
                      kind="tertiary" 
                      onClick={() => {
                        setBeforeDdl(DEMO_DCL_HIVE);
                        setReviewText(DEMO_DCL_ICEBERG);
                        setDdlFileName('dcl_permissions.sql');
                      }}
                      style={{ marginTop: '0.5rem' }}
                    >
                      Load demo DCL
                    </Button>
                  </div>
                )}

                {beforeDdl && (
                  <div style={{ marginBottom: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '0.75rem', backgroundColor: '#fff3cd' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Original Hive DDL:</div>
                    <pre style={{ margin: 0, fontSize: '0.8rem', whiteSpace: 'pre-wrap', maxHeight: '150px', overflow: 'auto' }}>{beforeDdl}</pre>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  <Button 
                    kind="primary" 
                    onClick={async () => { 
                      if (!beforeDdl && conversionSubtype === 'table_schema') {
                        setBeforeDdl(DEMO_HIVE_DDL);
                        setReviewText(DEMO_CONVERTED_DDL);
                      } else if (!beforeDdl && conversionSubtype === 'dcl') {
                        setBeforeDdl(DEMO_DCL_HIVE);
                        setReviewText(DEMO_DCL_ICEBERG);
                      }
                      setDdlConverting(true);
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      setDdlConverted(true);
                      setDdlReviewed(false);
                      setDdlConverting(false);
                    }}
                    disabled={ddlConverting}
                  >
                    {ddlConverting ? 'Converting...' : 'Convert DDL'}
                  </Button>
                  <Button 
                    kind="secondary" 
                    onClick={() => { 
                      if (!reviewText) {
                        setReviewText(conversionSubtype === 'dcl' ? DEMO_DCL_ICEBERG : DEMO_CONVERTED_DDL);
                      }
                      setShowReview(true); 
                    }}
                    disabled={!ddlConverted}
                  >
                    Review converted DDL
                  </Button>
                  <Button 
                    kind="secondary" 
                    onClick={() => {
                      const content = reviewText || (conversionSubtype === 'dcl' ? DEMO_DCL_ICEBERG : DEMO_CONVERTED_DDL);
                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = conversionSubtype === 'dcl' ? 'converted_dcl.sql' : 'converted_ddl.sql';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    disabled={!ddlConverted}
                  >
                    Download
                  </Button>
                  <Button 
                    kind="tertiary" 
                    disabled={!(ddlConverted && ddlReviewed)} 
                    onClick={async () => {
                      alert('Deploying converted DDL to watsonx.data...');
                      await new Promise(resolve => setTimeout(resolve, 1000));
                      alert('✓ DDL deployed successfully to watsonx.data catalog!');
                    }}
                  >
                    Deploy to watsonx.data
                  </Button>
                </div>
                {ddlConverting && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <InlineLoading description="Converting DDL from Hive to Iceberg format..." />
                  </div>
                )}
                {ddlConverted && !ddlReviewed && (
                  <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#2e7d32' }}>
                    <strong>✓ DDL converted successfully!</strong> Click "Review converted DDL" to see the results.
                  </div>
                )}
                <p style={{ color: '#8d8d8d', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  {conversionSubtype === 'table_schema' 
                    ? 'Converts Hive DDL to Iceberg format. Review changes, download the file, and deploy to target.'
                    : 'Converts Hive DCL permissions to watsonx.data format. Review and deploy when ready.'}
                </p>
              </div>
            )}

            {/* DCL handled as a subtype inside DDL now; no separate panel here */}

            {operation === 'validation' && (
              <div style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: 4, marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.75rem' }}>Data validation</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Select id="val-type" labelText="Validation type" defaultValue="rowcount" onChange={(e) => {
                    const valType = (e.target as HTMLSelectElement).value;
                    // Reset results when type changes
                    setValidationResults([]);
                  }}>
                    <SelectItem value="rowcount" text="Row count" />
                    <SelectItem value="schema" text="Schema diff" />
                    <SelectItem value="checksum" text="Checksum" />
                  </Select>
                  <TextInput id="val-sample" labelText="Sample percent (optional)" placeholder="100" defaultValue="100" />
                  <TextInput id="val-out" labelText="Report folder" placeholder="/validation" defaultValue="/validation" />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  <Button 
                    kind="primary"
                    onClick={async () => {
                      if (selectedSchemas.length === 0 || loadedSchemas.length === 0) {
                        alert('Please load schemas first in step 2');
                        return;
                      }
                      setValidationRunning(true);
                      await new Promise(resolve => setTimeout(resolve, 3000));
                      
                      // Generate demo validation results
                      const results: any[] = [];
                      loadedSchemas.forEach(schemaData => {
                        schemaData.tables.forEach(table => {
                          results.push({
                            schema: schemaData.schema,
                            table: table.name,
                            sourceRows: table.rows,
                            targetRows: table.rows, // Match for demo
                            status: 'match',
                            schemaMatch: true,
                            checksum: 'a3f5d8e2c1b9'
                          });
                        });
                      });
                      setValidationResults(results);
                      setValidationRunning(false);
                    }}
                    disabled={validationRunning || selectedSchemas.length === 0}
                  >
                    {validationRunning ? 'Running validation...' : 'Run validation'}
                  </Button>
                  <Button 
                    kind="secondary" 
                    onClick={() => {
                      const plan = {
                        type: 'rowcount',
                        schemas: selectedSchemas,
                        samplePercent: 100
                      };
                      const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'validation_plan.json';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Download plan
                  </Button>
                </div>

                {validationRunning && (
                  <div style={{ marginTop: '1rem' }}>
                    <InlineLoading description="Validating data between Hive and watsonx.data..." />
                    <p style={{ fontSize: '0.875rem', color: '#525252', marginTop: '0.5rem' }}>
                      Comparing row counts, schemas, and checksums...
                    </p>
                  </div>
                )}

                {validationResults.length > 0 && (
                  <div style={{ marginTop: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '1rem', backgroundColor: '#f4f4f4' }}>
                    <h5 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>Validation Results</h5>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader>Schema</TableHeader>
                            <TableHeader>Table</TableHeader>
                            <TableHeader>Source Rows</TableHeader>
                            <TableHeader>Target Rows</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Schema Match</TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {validationResults.map((result, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{result.schema}</TableCell>
                              <TableCell>{result.table}</TableCell>
                              <TableCell>{result.sourceRows.toLocaleString()}</TableCell>
                              <TableCell>{result.targetRows.toLocaleString()}</TableCell>
                              <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: result.status === 'match' ? '#24a148' : '#da1e28' }}>
                                  {result.status === 'match' ? <CheckmarkFilled size={16} /> : <ErrorFilled size={16} />}
                                  {result.status === 'match' ? 'Match' : 'Mismatch'}
                                </div>
                              </TableCell>
                              <TableCell>
                                {result.schemaMatch ? (
                                  <span style={{ color: '#24a148' }}>✓ Match</span>
                                ) : (
                                  <span style={{ color: '#da1e28' }}>✗ Diff</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#2e7d32' }}>
                      <strong>✓ Validation completed!</strong> All {validationResults.length} tables validated successfully. 
                      Source and target data match.
                    </div>
                    <div style={{ marginTop: '0.75rem' }}>
                      <Button 
                        kind="secondary"
                        onClick={() => {
                          const report = {
                            timestamp: new Date().toISOString(),
                            validationType: 'rowcount',
                            results: validationResults,
                            summary: {
                              total: validationResults.length,
                              passed: validationResults.filter(r => r.status === 'match').length,
                              failed: validationResults.filter(r => r.status !== 'match').length
                            }
                          };
                          const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'validation_report.json';
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        Download validation report
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button kind="primary" renderIcon={ArrowRight} onClick={() => setStep(4)}>Continue to run</Button>
            </div>
          </Tile>
        )}

        {step === 4 && (
          <Tile style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <Button kind="ghost" onClick={() => setStep(3)}>Back</Button>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Run end-to-end migration</h3>
            <p style={{ color: '#525252', marginBottom: '1.5rem' }}>
              Execute the complete migration workflow: Load Schemas → Convert DDL → Deploy DDL → Migrate Data → Run Validation
            </p>

            {/* Migration Progress */}
            {migrationProgress.length > 0 && (
              <div style={{ marginBottom: '2rem', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '1.5rem', backgroundColor: '#f4f4f4' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Migration Progress</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {migrationProgress.map((progress, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                      {progress.status === 'pending' && <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #8d8d8d' }} />}
                      {progress.status === 'running' && <InlineLoading description="" />}
                      {progress.status === 'success' && <CheckmarkFilled size={20} style={{ color: '#24a148' }} />}
                      {progress.status === 'error' && <ErrorFilled size={20} style={{ color: '#da1e28' }} />}
                      <span style={{ flex: 1, color: progress.status === 'success' ? '#24a148' : progress.status === 'error' ? '#da1e28' : '#525252' }}>
                        {progress.step}
                      </span>
                      {progress.status === 'running' && <span style={{ color: '#525252', fontSize: '0.875rem' }}>Running...</span>}
                      {progress.status === 'success' && <span style={{ color: '#24a148', fontSize: '0.875rem' }}>Completed</span>}
                      {progress.status === 'error' && <span style={{ color: '#da1e28', fontSize: '0.875rem' }}>Failed</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Migration Logs */}
            {migrationLogs.length > 0 && (
              <div style={{ marginBottom: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '1rem', backgroundColor: '#161616', color: '#f4f4f4', fontFamily: 'monospace', fontSize: '0.875rem', maxHeight: '200px', overflow: 'auto' }}>
                {migrationLogs.map((log, idx) => (
                  <div key={idx} style={{ marginBottom: '0.25rem' }}>{log}</div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {isRunning && (
                  <InlineLoading description="Running migration..." />
                )}
                <Button 
                  kind="primary" 
                  renderIcon={isRunning ? undefined : Play} 
                  disabled={isRunning || selectedSchemas.length === 0}
                  onClick={async () => {
                    setRunStatus('running');
                    setIsRunning(true);
                    setMigrationLogs([]);
                    
                    // Auto-load demo schemas if not already loaded
                    let schemasToUse = loadedSchemas;
                    if (selectedSchemas.length > 0 && loadedSchemas.length === 0) {
                      schemasToUse = selectedSchemas.map(schema => ({
                        schema,
                        tables: DEMO_SCHEMAS[schema as keyof typeof DEMO_SCHEMAS]?.tables || []
                      }));
                      setLoadedSchemas(schemasToUse);
                    }
                    
                    const steps = [
                      '1. Connecting to source (Hive)',
                      '2. Connecting to target (watsonx.data)',
                      '3. Loading schema metadata',
                      '4. Converting DDL to Iceberg format',
                      '5. Deploying DDL to target',
                      '6. Migrating data',
                      '7. Running data validation',
                      '8. Generating migration report'
                    ];

                    setMigrationProgress(steps.map(step => ({ step, status: 'pending' as const })));

                    // Step 1: Connect to source
                    setMigrationProgress(prev => prev.map((p, i) => i === 0 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Connecting to Hive at ${srcHost}:${srcPort}...`]);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setMigrationProgress(prev => prev.map((p, i) => i === 0 ? { ...p, status: 'success' } : p));
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Connected to Hive database: ${srcDb}`]);

                    // Step 2: Connect to target
                    setMigrationProgress(prev => prev.map((p, i) => i === 1 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Connecting to watsonx.data at ${tgtHost}:${tgtPort}...`]);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setMigrationProgress(prev => prev.map((p, i) => i === 1 ? { ...p, status: 'success' } : p));
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Connected to watsonx.data catalog: ${tgtDb}`]);

                    // Step 3: Load schemas
                    setMigrationProgress(prev => prev.map((p, i) => i === 2 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Loading schema metadata for: ${selectedSchemas.join(', ')}...`]);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const totalTables = schemasToUse.reduce((sum, s) => sum + s.tables.length, 0);
                    setMigrationProgress(prev => prev.map((p, i) => i === 2 ? { ...p, status: 'success' } : p));
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Loaded ${totalTables} tables from ${selectedSchemas.length} schemas`]);

                    // Step 4: Convert DDL
                    setMigrationProgress(prev => prev.map((p, i) => i === 3 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Converting DDL from Hive to Iceberg format...`]);
                    await new Promise(resolve => setTimeout(resolve, 2500));
                    setMigrationProgress(prev => prev.map((p, i) => i === 3 ? { ...p, status: 'success' } : p));
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Converted ${totalTables} table definitions`]);

                    // Step 5: Deploy DDL
                    setMigrationProgress(prev => prev.map((p, i) => i === 4 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Deploying DDL to watsonx.data...`]);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setMigrationProgress(prev => prev.map((p, i) => i === 4 ? { ...p, status: 'success' } : p));
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Deployed ${totalTables} tables to target catalog`]);

                    // Step 6: Migrate data
                    setMigrationProgress(prev => prev.map((p, i) => i === 5 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Starting data migration...`]);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    setMigrationProgress(prev => prev.map((p, i) => i === 5 ? { ...p, status: 'success' } : p));
                    const totalRows = schemasToUse.reduce((sum, s) => sum + s.tables.reduce((tSum, t) => tSum + t.rows, 0), 0);
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Migrated ${totalRows.toLocaleString()} rows across ${totalTables} tables`]);

                    // Step 7: Run validation
                    setMigrationProgress(prev => prev.map((p, i) => i === 6 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Running data validation checks...`]);
                    await new Promise(resolve => setTimeout(resolve, 2500));
                    setMigrationProgress(prev => prev.map((p, i) => i === 6 ? { ...p, status: 'success' } : p));
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Validation passed: All tables match source data`]);

                    // Step 8: Generate report
                    setMigrationProgress(prev => prev.map((p, i) => i === 7 ? { ...p, status: 'running' } : p));
                    setMigrationLogs(prev => [...prev, `[INFO] Generating migration report...`]);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setMigrationProgress(prev => prev.map((p, i) => i === 7 ? { ...p, status: 'success' } : p));
                    setMigrationLogs(prev => [...prev, `[SUCCESS] Migration report generated`]);
                    setMigrationLogs(prev => [...prev, ``]);
                    setMigrationLogs(prev => [...prev, `[INFO] ========================================`]);
                    setMigrationLogs(prev => [...prev, `[INFO] Migration completed successfully!`]);
                    setMigrationLogs(prev => [...prev, `[INFO] ========================================`]);

                    setRunStatus('success');
                    setIsRunning(false);
                  }}
                >
                  {isRunning ? 'Running migration...' : runStatus === 'success' ? 'Migration completed ✓' : runStatus === 'error' ? 'Migration failed' : 'Run end-to-end migration'}
                </Button>
              </div>
              {runStatus === 'success' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#24a148' }}>
                    <CheckmarkFilled size={16} />
                    <span>Migration completed successfully!</span>
                  </div>
                  <Button kind="secondary" onClick={() => {
                    const report = {
                      timestamp: new Date().toISOString(),
                      source: { host: srcHost, port: srcPort, database: srcDb },
                      target: { host: tgtHost, port: tgtPort, catalog: tgtDb },
                      schemas: selectedSchemas,
                      tablesMigrated: loadedSchemas.length > 0 ? loadedSchemas.reduce((sum, s) => sum + s.tables.length, 0) : 0,
                      status: 'success',
                      steps: migrationProgress
                    };
                    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'migration_report.json';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}>
                    Download migration report
                  </Button>
                </>
              )}
              {runStatus === 'error' && (
                <span style={{ color: '#da1e28', marginLeft: '0.5rem' }}>✗ Migration failed - check logs</span>
              )}
              <Button kind="ghost" onClick={() => {
                setStep(0);
                setRunStatus('idle');
                setMigrationProgress([]);
                setMigrationLogs([]);
                setSrcConnected(false);
                setTgtConnected(false);
                setSelectedSchemas([]);
                setLoadedSchemas([]);
                setDdlConverted(false);
                setValidationResults([]);
              }}>
                Start over
              </Button>
            </div>
          </Tile>
        )}
        {showReview && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div style={{ background: '#fff', width: '100%', maxWidth: '1400px', maxHeight: '90vh', padding: '1.5rem', borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0 }}>Review DDL Conversion</h4>
                <Button kind="ghost" onClick={() => setShowReview(false)}>Close</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: beforeDdl ? '1fr 1fr' : '1fr', gap: '1rem', flex: 1, minHeight: 0 }}>
                {beforeDdl && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#da1e28' }}>Original Hive DDL</div>
                    <textarea 
                      value={beforeDdl} 
                      readOnly
                      style={{ 
                        width: '100%', 
                        flex: 1, 
                        minHeight: '400px',
                        fontFamily: 'monospace', 
                        fontSize: '0.85rem',
                        padding: '0.75rem',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        backgroundColor: '#fff3cd',
                        resize: 'none'
                      }} 
                    />
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#24a148' }}>Converted Iceberg DDL</div>
                  <textarea 
                    value={reviewText || (conversionSubtype === 'dcl' ? DEMO_DCL_ICEBERG : DEMO_CONVERTED_DDL)} 
                    onChange={(e) => setReviewText((e.target as HTMLTextAreaElement).value)} 
                    style={{ 
                      width: '100%', 
                      flex: 1, 
                      minHeight: '400px',
                      fontFamily: 'monospace', 
                      fontSize: '0.85rem',
                      padding: '0.75rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      backgroundColor: '#e8f5e9',
                      resize: 'none'
                    }} 
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Button 
                    kind="secondary" 
                    onClick={() => { 
                      const content = reviewText || (conversionSubtype === 'dcl' ? DEMO_DCL_ICEBERG : DEMO_CONVERTED_DDL);
                      const blob = new Blob([content], { type: 'text/plain' }); 
                      const url = URL.createObjectURL(blob); 
                      const a = document.createElement('a'); 
                      a.href = url; 
                      a.download = conversionSubtype === 'dcl' ? 'converted_dcl.sql' : 'converted_ddl.sql'; 
                      a.click(); 
                      URL.revokeObjectURL(url); 
                    }}
                  >
                    Download converted DDL
                  </Button>
                  <Button 
                    kind="primary" 
                    onClick={() => { 
                      setShowReview(false); 
                      setDdlReviewed(true); 
                    }}
                  >
                    Save & close
                  </Button>
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Key Changes:</div>
                  <ul style={{ color: '#525252', lineHeight: 1.6, fontSize: '0.875rem', margin: 0, paddingLeft: '1.25rem' }}>
                    <li>STored AS PARQUET → USING ICEBERG</li>
                    <li>Partition columns moved to table schema</li>
                    <li>Added Iceberg table properties</li>
                    <li>Location updated to target S3 bucket</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataMigrationNew;
