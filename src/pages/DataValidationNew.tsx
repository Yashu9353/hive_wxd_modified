import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tile, 
  TextInput, 
  Select, 
  SelectItem, 
  Button, 
  Breadcrumb, 
  BreadcrumbItem,
  RadioButton,
  RadioButtonGroup,
  Toggle,
  Tag,
  InlineLoading
} from '@carbon/react';
import { ArrowLeft, Play } from '@carbon/icons-react';

const DataValidationNew = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [sourceConnected, setSourceConnected] = useState(false);
  const [targetConnected, setTargetConnected] = useState(false);
  const [comparisonType, setComparisonType] = useState('fullSchema');
  const [sourceSchema, setSourceSchema] = useState('');
  const [targetSchema, setTargetSchema] = useState('');
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const handleSourceConnect = () => {
    setSourceConnected(true);
    setTimeout(() => setCurrentStep(2), 500);
  };

  const handleTargetConnect = () => {
    setTargetConnected(true);
    setTimeout(() => setCurrentStep(3), 500);
  };

  const renderStepIndicator = () => (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
      <Tag type={currentStep >= 1 ? 'green' : 'gray'} style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
        1. Source Database
      </Tag>
      <Tag type={currentStep >= 2 ? 'green' : 'gray'} style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
        2. Target Database
      </Tag>
      <Tag type={currentStep >= 3 ? 'green' : 'gray'} style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
        3. Comparison Setup
      </Tag>
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <Breadcrumb>
        <BreadcrumbItem onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Data Validation</BreadcrumbItem>
      </Breadcrumb>

      {currentStep > 1 && (
        <Button
          kind="ghost"
          renderIcon={ArrowLeft}
          onClick={() => setCurrentStep(currentStep - 1)}
          style={{ marginTop: '1rem', marginBottom: '1rem' }}
        >
          Back to Dashboard
        </Button>
      )}

      <h1 style={{ fontSize: '2.5rem', marginTop: currentStep === 1 ? '2rem' : '1rem', marginBottom: '1rem', fontWeight: 300 }}>
        Data Validation Dashboard
      </h1>

      {renderStepIndicator()}

      {/* Step 1: Source Database */}
      {currentStep >= 1 && (
        <Tile style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 300 }}>Source Database Connection</h2>
            {sourceConnected && <Tag type="green">Connected</Tag>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Database Type
              </label>
              <Select
                id="source-db-type"
                labelText=""
                defaultValue="hive"
                disabled={sourceConnected}
              >
                <SelectItem value="" text="Select Option" />
                <SelectItem value="hive" text="Hive" />
                <SelectItem value="watsonx" text="Watsonx.data" />
                <SelectItem value="sqlserver" text="SQL Server" />
                <SelectItem value="mysql" text="MySQL" />
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Host/Server
              </label>
              <TextInput
                id="source-host"
                labelText=""
                placeholder=""
                disabled={sourceConnected}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Port
              </label>
              <TextInput
                id="source-port"
                labelText=""
                placeholder=""
                disabled={sourceConnected}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Database Name
              </label>
              <TextInput
                id="source-db-name"
                labelText=""
                placeholder=""
                disabled={sourceConnected}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Username
              </label>
              <TextInput
                id="source-username"
                labelText=""
                placeholder=""
                disabled={sourceConnected}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Password
              </label>
              <TextInput
                id="source-password"
                labelText=""
                type="password"
                placeholder=""
                disabled={sourceConnected}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button kind="tertiary">
              Hive Credentials
            </Button>
            <Button kind="tertiary">
              Watsonx.data Credentials
            </Button>
          </div>

          {!sourceConnected && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button
                style={{ backgroundColor: '#0f62fe', color: '#ffffff', minWidth: '200px' }}
                onClick={handleSourceConnect}
              >
                Connect to Source
              </Button>
            </div>
          )}
        </Tile>
      )}

      {/* Step 2: Target Database */}
      {currentStep >= 2 && (
        <Tile style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 300 }}>Target Database Connection</h2>
            {targetConnected && <Tag type="green">Connected</Tag>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Database Type
              </label>
              <Select
                id="target-db-type"
                labelText=""
                defaultValue="watsonx"
                disabled={targetConnected}
              >
                <SelectItem value="" text="Select Option" />
                <SelectItem value="hive" text="Hive" />
                <SelectItem value="watsonx" text="Watsonx.data" />
                <SelectItem value="sqlserver" text="SQL Server" />
                <SelectItem value="mysql" text="MySQL" />
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Host/Server
              </label>
              <TextInput
                id="target-host"
                labelText=""
                placeholder="tel-gdc-cdc-prakedia1.fyre.ibm.com"
                value="tel-gdc-cdc-prakedia1.fyre.ibm.com"
                disabled={targetConnected}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Port
              </label>
              <TextInput
                id="target-port"
                labelText=""
                placeholder="25010"
                value="25010"
                disabled={targetConnected}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Database Name
              </label>
              <TextInput
                id="target-db-name"
                labelText=""
                placeholder="SAMPLE"
                value="SAMPLE"
                disabled={targetConnected}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Username
              </label>
              <TextInput
                id="target-username"
                labelText=""
                placeholder="cdcadm"
                value="cdcadm"
                disabled={targetConnected}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                Password
              </label>
              <TextInput
                id="target-password"
                labelText=""
                type="password"
                placeholder="••••••••••••••••••"
                value="password"
                disabled={targetConnected}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button kind="tertiary">
              Hive Credentials
            </Button>
            <Button kind="tertiary">
              Watsonx.data Credentials
            </Button>
          </div>

          {!targetConnected && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button
                style={{ backgroundColor: '#0f62fe', color: '#ffffff', minWidth: '200px' }}
                onClick={handleTargetConnect}
              >
                Connect to Target
              </Button>
            </div>
          )}
        </Tile>
      )}

      {/* Step 3: Comparison Setup */}
      {currentStep >= 3 && (
        <>
          <Tile style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid #e0e0e0' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '2rem' }}>Comparison Type</h2>
            <p style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '1rem' }}>
              Select comparison type
            </p>
            <RadioButtonGroup
              name="comparison-type"
              valueSelected={comparisonType}
              onChange={(value) => setComparisonType(value as string)}
              orientation="horizontal"
            >
              <RadioButton labelText="Single Table" value="singleTable" id="single-table" />
              <RadioButton labelText="Full Schema" value="fullSchema" id="full-schema" />
            </RadioButtonGroup>
          </Tile>

          <Tile style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid #e0e0e0' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '2rem' }}>Select Schemas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                  Source Schema
                </label>
                <Select
                  id="source-schema"
                  labelText=""
                  value={sourceSchema}
                  onChange={(e) => setSourceSchema((e.target as HTMLSelectElement).value)}
                >
                  <SelectItem value="" text="Select Schema" />
                  <SelectItem value="DB2GSE" text="DB2GSE" />
                  <SelectItem value="DB2INST1" text="DB2INST1" />
                  <SelectItem value="DB2INST2" text="DB2INST2" />
                  <SelectItem value="DB2SRC01" text="DB2SRC01" />
                </Select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#525252' }}>
                  Target Schema
                </label>
                <Select
                  id="target-schema"
                  labelText=""
                  value={targetSchema}
                  onChange={(e) => setTargetSchema((e.target as HTMLSelectElement).value)}
                >
                  <SelectItem value="" text="Select Schema" />
                  <SelectItem value="DB2GSE" text="DB2GSE" />
                  <SelectItem value="DB2INST1" text="DB2INST1" />
                  <SelectItem value="DB2INST2" text="DB2INST2" />
                  <SelectItem value="DB2SRC01" text="DB2SRC01" />
                </Select>
              </div>
            </div>
          </Tile>

          <Tile style={{ padding: '2rem', marginBottom: '2rem', backgroundColor: '#f4f4f4' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '2rem' }}>Validation Options</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>
                  Enable Checksum Comparison
                </p>
                <Toggle
                  id="checksum-toggle"
                  labelText=""
                  labelA="Off"
                  labelB="On"
                  defaultToggled={false}
                />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>
                  Quick Row Count Check
                </p>
                <Toggle
                  id="rowcount-toggle"
                  labelText=""
                  labelA="Off"
                  labelB="On"
                  defaultToggled={true}
                />
              </div>
            </div>
          </Tile>

          <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              {runStatus === 'running' && (
                <InlineLoading description="Processing..." />
              )}
              <Button
                size="lg"
                renderIcon={runStatus === 'running' ? undefined : Play}
                disabled={runStatus === 'running'}
                style={{ backgroundColor: '#0f62fe', color: '#ffffff', minWidth: '250px' }}
                onClick={() => {
                  setRunStatus('running');
                  setTimeout(() => {
                    setRunStatus('success');
                  }, 2000);
                }}
              >
                {runStatus === 'running' ? 'Processing...' : runStatus === 'success' ? 'Run completed successfully' : 'Run validation'}
              </Button>
            </div>
          </div>

          {runStatus === 'success' && (
            <Tile style={{ padding: '2rem', marginTop: '2rem', backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 300 }}>Validation Summary</h3>
              <p style={{ color: '#525252', marginBottom: '1.5rem', fontSize: '1rem' }}>
                All configured validations completed successfully. 
                <br />
                <strong>Results:</strong> 3 passed, 1 warning, 0 failed.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <Button 
                  kind="secondary" 
                  onClick={() => {
                    const report = {
                      passed: 3,
                      warning: 1,
                      failed: 0,
                      sourceSchema: sourceSchema || 'N/A',
                      targetSchema: targetSchema || 'N/A',
                      comparisonType: comparisonType,
                      generatedAt: new Date().toISOString(),
                      tables: [
                        { table: 'customers', status: 'passed', sourceRows: 1245830, targetRows: 1245830 },
                        { table: 'orders', status: 'warning', sourceRows: 5892104, targetRows: 5892098 },
                        { table: 'products', status: 'passed', sourceRows: 45230, targetRows: 45230 },
                      ]
                    };
                    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'validation_summary.json';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download summary
                </Button>
                <Button 
                  kind="tertiary" 
                  onClick={() => {
                    setRunStatus('idle');
                  }}
                >
                  Run again
                </Button>
              </div>
            </Tile>
          )}
        </>
      )}
    </div>
  );
};

export default DataValidationNew;
