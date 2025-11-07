import { useState } from 'react';
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
  ProgressBar,
  Tag,
  Modal,
  TextInput,
  NumberInput,
} from '@carbon/react';
import { Play, Pause, Renew } from '@carbon/icons-react';

const DataMigration = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const headers = [
    { key: 'table', header: 'Table Name' },
    { key: 'rows', header: 'Row Count' },
    { key: 'size', header: 'Size' },
    { key: 'status', header: 'Status' },
    { key: 'progress', header: 'Progress' },
    { key: 'actions', header: 'Actions' },
  ];

  const rows = [
    {
      id: '1',
      table: 'customers',
      rows: '1,245,830',
      size: '2.3 GB',
      status: 'completed',
      progress: 100,
    },
    {
      id: '2',
      table: 'orders',
      rows: '5,892,104',
      size: '8.7 GB',
      status: 'in_progress',
      progress: 67,
    },
    {
      id: '3',
      table: 'products',
      rows: '45,230',
      size: '156 MB',
      status: 'pending',
      progress: 0,
    },
    {
      id: '4',
      table: 'transactions',
      rows: '12,450,992',
      size: '15.2 GB',
      status: 'pending',
      progress: 0,
    },
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'completed':
        return <Tag type="green">Completed</Tag>;
      case 'in_progress':
        return <Tag type="blue">In Progress</Tag>;
      case 'pending':
        return <Tag type="gray">Pending</Tag>;
      case 'failed':
        return <Tag type="red">Failed</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/migration" isCurrentPage>Data Migration</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Data Migration
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#525252', maxWidth: '800px' }}>
        Monitor and control the migration of tables from Hive to Watsonx.data.
      </p>

      <Grid style={{ marginBottom: '2rem' }}>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>Total Tables</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300 }}>4</p>
          </Tile>
        </Column>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>Completed</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: '#24a148' }}>1</p>
          </Tile>
        </Column>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>In Progress</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: '#0f62fe' }}>1</p>
          </Tile>
        </Column>
        <Column lg={4} md={4} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>Total Data Size</h4>
            <p style={{ fontSize: '2rem', fontWeight: 300 }}>26.4 GB</p>
          </Tile>
        </Column>
      </Grid>

      <Tile style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Migration Queue</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button kind="tertiary" renderIcon={Renew}>
              Refresh
            </Button>
            <Button kind="primary" onClick={() => setShowConfig(true)}>
              Configure Migration
            </Button>
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
                      if (cell.info.header === 'progress') {
                        return (
                          <TableCell key={cell.id}>
                            <ProgressBar 
                              value={cell.value} 
                              max={100}
                              label=""
                              hideLabel
                            />
                          </TableCell>
                        );
                      }
                      if (cell.info.header === 'actions') {
                        const status = row.cells.find(c => c.info.header === 'status')?.value;
                        return (
                          <TableCell key={cell.id}>
                            {status === 'pending' && (
                              <Button 
                                size="sm" 
                                kind="ghost" 
                                renderIcon={Play}
                                onClick={() => setSelectedTable(row.cells[0].value)}
                              >
                                Start
                              </Button>
                            )}
                            {status === 'in_progress' && (
                              <Button size="sm" kind="ghost" renderIcon={Pause}>
                                Pause
                              </Button>
                            )}
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

      <Modal
        open={showConfig}
        onRequestClose={() => setShowConfig(false)}
        modalHeading="Migration Configuration"
        primaryButtonText="Start Migration"
        secondaryButtonText="Cancel"
        size="sm"
      >
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="source-connection"
            labelText="Source Hive Connection String"
            placeholder="jdbc:hive2://hostname:10000/database"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="target-connection"
            labelText="Target Watsonx.data Connection"
            placeholder="Enter connection details"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <NumberInput
            id="batch-size"
            label="Batch Size (rows)"
            min={1000}
            max={100000}
            value={10000}
            step={1000}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <NumberInput
            id="parallel-threads"
            label="Parallel Threads"
            min={1}
            max={16}
            value={4}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DataMigration;
