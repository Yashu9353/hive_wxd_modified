import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Tile,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Toggle,
  Accordion,
  AccordionItem,
  InlineLoading,
} from '@carbon/react';
import { CheckmarkFilled, WarningFilled, Play } from '@carbon/icons-react';

const DataValidation = () => {
  const navigate = useNavigate();
  const [autoValidate, setAutoValidate] = useState(true);
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const headers = [
    { key: 'table', header: 'Table Name' },
    { key: 'validation', header: 'Validation Type' },
    { key: 'sourceRows', header: 'Source Rows' },
    { key: 'targetRows', header: 'Target Rows' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Actions' },
  ];

  const rows = [
    {
      id: '1',
      table: 'customers',
      validation: 'Row Count',
      sourceRows: '1,245,830',
      targetRows: '1,245,830',
      status: 'passed',
    },
    {
      id: '2',
      table: 'customers',
      validation: 'Checksum',
      sourceRows: '-',
      targetRows: '-',
      status: 'passed',
    },
    {
      id: '3',
      table: 'orders',
      validation: 'Row Count',
      sourceRows: '5,892,104',
      targetRows: '5,892,098',
      status: 'warning',
    },
    {
      id: '4',
      table: 'products',
      validation: 'Schema',
      sourceRows: '-',
      targetRows: '-',
      status: 'passed',
    },
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'passed':
        return (
          <Tag type="green" renderIcon={CheckmarkFilled}>
            Passed
          </Tag>
        );
      case 'warning':
        return (
          <Tag type="warm-gray" renderIcon={WarningFilled}>
            Warning
          </Tag>
        );
      case 'failed':
        return (
          <Tag type="red" renderIcon={WarningFilled}>
            Failed
          </Tag>
        );
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Breadcrumb>
        <BreadcrumbItem onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Data Validation</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Data Validation
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#525252', maxWidth: '800px' }}>
        Verify the accuracy and completeness of migrated data between Hive and Watsonx.data.
      </p>

      {/* Connections */}
      <Tile style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <Button kind="primary">Connect to source</Button>
        <Button kind="primary">Connect to target</Button>
      </Tile>

      <Grid style={{ marginBottom: '2rem' }}>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>Total Validations</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300 }}>4</p>
          </Tile>
        </Column>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>Passed</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: '#24a148' }}>3</p>
          </Tile>
        </Column>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>Warnings</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: '#f1c21b' }}>1</p>
          </Tile>
        </Column>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>Failed</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: '#da1e28' }}>0</p>
          </Tile>
        </Column>
      </Grid>

      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Validation Results</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Toggle
              id="auto-validate"
              labelText="Auto-validate after migration"
              toggled={autoValidate}
              onToggle={(checked) => setAutoValidate(checked)}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {runStatus === 'running' && (
                <InlineLoading description="Processing..." />
              )}
              <Button 
                kind="primary" 
                renderIcon={runStatus === 'running' ? undefined : Play} 
                disabled={runStatus === 'running'}
                onClick={() => {
                  if (runStatus === 'success') {
                    setRunStatus('idle');
                    return;
                  }
                  setRunStatus('running');
                  setTimeout(() => {
                    setRunStatus('success');
                  }, 1500);
                }}
              >
                {runStatus === 'running' ? 'Processing...' : runStatus === 'success' ? 'Run completed successfully' : 'Run validation'}
              </Button>
            </div>
          </div>
        </div>

        <DataTable rows={rows} headers={headers}>
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => {
                      if (cell.info.header === 'status') {
                        return (
                          <TableCell key={cell.id}>
                            {getStatusTag(cell.value)}
                          </TableCell>
                        );
                      }
                      if (cell.info.header === 'actions') {
                        return (
                          <TableCell key={cell.id}>
                            <Button size="sm" kind="ghost">
                              View Details
                            </Button>
                          </TableCell>
                        );
                      }
                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      </Tile>

      {runStatus === 'success' && (
        <Tile style={{ padding: '2rem', marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Validation Summary</h3>
          <p style={{ color: '#525252', marginBottom: '1rem' }}>All configured validations completed. 3 passed, 1 warning, 0 failed.</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button kind="secondary" onClick={() => {
              const report = {
                passed: 3,
                warning: 1,
                failed: 0,
                generatedAt: new Date().toISOString(),
              };
              const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'validation_summary.json';
              a.click();
              URL.revokeObjectURL(url);
            }}>Download summary</Button>
          </div>
        </Tile>
      )}

      <Tile style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Validation Methods</h3>
        <Accordion>
          <AccordionItem title="Row Count Validation">
            <p style={{ color: '#525252', lineHeight: 1.6 }}>
              Compares the total number of rows between source and target tables. This is the fastest 
              validation method and should always pass for a successful migration.
            </p>
          </AccordionItem>
          <AccordionItem title="Checksum Validation">
            <p style={{ color: '#525252', lineHeight: 1.6 }}>
              Calculates and compares checksums for data integrity. This method detects any data corruption 
              or modification during transfer but requires more computational resources.
            </p>
          </AccordionItem>
          <AccordionItem title="Schema Validation">
            <p style={{ color: '#525252', lineHeight: 1.6 }}>
              Verifies that table schemas match between source and target, including column names, 
              data types, and constraints. Essential for ensuring query compatibility.
            </p>
          </AccordionItem>
          <AccordionItem title="Sample Data Validation">
            <p style={{ color: '#525252', lineHeight: 1.6 }}>
              Compares random samples of actual data values to detect transformation errors. 
              Useful for catching subtle issues that other validation methods might miss.
            </p>
          </AccordionItem>
        </Accordion>
      </Tile>
    </div>
  );
};

export default DataValidation;
