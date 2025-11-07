import { useState } from 'react';
import {
  TextArea,
  Button,
  Tile,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  CodeSnippet,
  InlineLoading,
  Accordion,
  AccordionItem,
} from '@carbon/react';
import { ArrowRight, Download, Copy } from '@carbon/icons-react';

const SchemaConversion = () => {
  const [sourceSchema, setSourceSchema] = useState('');
  const [targetSchema, setTargetSchema] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = () => {
    setIsConverting(true);
    // Simulate conversion
    setTimeout(() => {
      const converted = `-- Converted from Hive to Watsonx.data\n-- Original schema preserved with compatible data types\n\nCREATE TABLE watsonx_schema.converted_table (\n  id BIGINT,\n  name VARCHAR(255),\n  created_date DATE,\n  amount DECIMAL(10,2)\n)\nSTORED AS PARQUET\nPARTITIONED BY (year INT, month INT);`;
      setTargetSchema(converted);
      setIsConverting(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/schema" isCurrentPage>Schema Conversion</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Schema Conversion Tool
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#525252', maxWidth: '800px' }}>
        Convert your Hive DDL schemas to Watsonx.data compatible format automatically.
      </p>

      <Grid>
        <Column lg={8} md={4} sm={4}>
          <Tile style={{ padding: '2rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Source Hive DDL</h3>
            <TextArea
              labelText=""
              placeholder="Paste your Hive CREATE TABLE statements here..."
              rows={12}
              value={sourceSchema}
              onChange={(e) => setSourceSchema(e.target.value)}
              style={{ marginBottom: '1rem', fontFamily: 'IBM Plex Mono, monospace' }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button 
                kind="primary" 
                onClick={handleConvert}
                disabled={!sourceSchema || isConverting}
              >
                {isConverting ? (
                  <InlineLoading description="Converting..." />
                ) : (
                  <>
                    Convert to Watsonx.data
                    <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                  </>
                )}
              </Button>
              <Button kind="secondary" onClick={() => setSourceSchema('')}>
                Clear
              </Button>
            </div>
          </Tile>

          {targetSchema && (
            <Tile style={{ padding: '2rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Converted Watsonx.data DDL</h3>
              <CodeSnippet type="multi" feedback="Copied to clipboard">
                {targetSchema}
              </CodeSnippet>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button kind="primary" renderIcon={Download}>
                  Download Script
                </Button>
                <Button kind="secondary" renderIcon={Copy}>
                  Copy to Clipboard
                </Button>
              </div>
            </Tile>
          )}
        </Column>

        <Column lg={8} md={4} sm={4}>
          <Tile style={{ padding: '2rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Conversion Guide</h3>
            <Accordion>
              <AccordionItem title="Supported Data Types">
                <p style={{ marginBottom: '1rem', color: '#525252' }}>
                  The converter automatically maps Hive data types to Watsonx.data equivalents:
                </p>
                <ul style={{ lineHeight: 1.8, color: '#525252', paddingLeft: '1.5rem' }}>
                  <li>INT, BIGINT, SMALLINT → BIGINT</li>
                  <li>STRING → VARCHAR(255)</li>
                  <li>DECIMAL → DECIMAL</li>
                  <li>TIMESTAMP → TIMESTAMP</li>
                  <li>ARRAY, MAP, STRUCT → JSON</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Partitioning Strategy">
                <p style={{ color: '#525252', lineHeight: 1.6 }}>
                  Hive partitioning is preserved and converted to Watsonx.data partitioning syntax. 
                  The tool maintains partition columns and ordering for optimal query performance.
                </p>
              </AccordionItem>
              <AccordionItem title="Storage Formats">
                <p style={{ color: '#525252', lineHeight: 1.6 }}>
                  Common Hive storage formats (ORC, Parquet, Avro) are supported and converted to 
                  Watsonx.data compatible configurations with appropriate compression settings.
                </p>
              </AccordionItem>
              <AccordionItem title="Best Practices">
                <ul style={{ lineHeight: 1.8, color: '#525252', paddingLeft: '1.5rem' }}>
                  <li>Review converted DDL before execution</li>
                  <li>Test with a subset of tables first</li>
                  <li>Ensure proper permissions on target system</li>
                  <li>Document any manual adjustments needed</li>
                </ul>
              </AccordionItem>
            </Accordion>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
};

export default SchemaConversion;
