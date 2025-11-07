import { useState } from 'react';
import { Select, SelectItem, TextInput, Tile, Grid, Column, Breadcrumb, BreadcrumbItem } from '@carbon/react';

const Questionnaire = () => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [custom, setCustom] = useState<Record<string, string>>({});

  const update = (id: string, val: string) => {
    setResponses({ ...responses, [id]: val });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Questionnaire</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Hadoop Modernization Pre-Workshop Questionnaire
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: '#525252', maxWidth: '900px' }}>
        General Questions
      </p>

      <Grid>
        <Column lg={12} md={8} sm={4}>
          <Tile style={{ padding: '1.5rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {/* Current Hadoop Environment */}
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Current Hadoop Environment: What version and distribution are you currently using?</div>
                <Select id="q-env" labelText="Select Response" value={responses['q-env'] || ''} onChange={(e) => update('q-env', (e.target as HTMLSelectElement).value)}>
                  <SelectItem value="" text="Choose an option" />
                  <SelectItem value="active" text="Active Hadoop cluster" />
                  <SelectItem value="legacy" text="Legacy Hadoop setup" />
                  <SelectItem value="none" text="No Hadoop environment" />
                  <SelectItem value="custom" text="Enter custom response" />
                </Select>
                {responses['q-env'] === 'custom' && (
                  <TextInput id="q-env-custom" labelText="Enter your custom response" placeholder="Type your response here..." value={custom['q-env'] || ''} onChange={(e) => setCustom({ ...custom, ['q-env']: (e.target as HTMLInputElement).value })} />
                )}
              </div>

              {/* Cluster Configuration */}
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Cluster Configuration: How is your cluster currently configured?</div>
                <Select id="q-cluster" labelText="Select Response" value={responses['q-cluster'] || ''} onChange={(e) => update('q-cluster', (e.target as HTMLSelectElement).value)}>
                  <SelectItem value="" text="Choose an option" />
                  <SelectItem value="yes" text="Yes" />
                  <SelectItem value="no" text="No" />
                  <SelectItem value="maybe" text="Maybe" />
                  <SelectItem value="custom" text="Enter custom response" />
                </Select>
                {responses['q-cluster'] === 'custom' && (
                  <TextInput id="q-cluster-custom" labelText="Enter your custom response" placeholder="Type your response here..." value={custom['q-cluster'] || ''} onChange={(e) => setCustom({ ...custom, ['q-cluster']: (e.target as HTMLInputElement).value })} />
                )}
              </div>

              {/* Data Volume and Growth */}
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Data Volume and Growth: What is your current data volume and expected growth?</div>
                <Select id="q-data" labelText="Select Response" value={responses['q-data'] || ''} onChange={(e) => update('q-data', (e.target as HTMLSelectElement).value)}>
                  <SelectItem value="" text="Choose an option" />
                  <SelectItem value="lt100" text="< 100 GB" />
                  <SelectItem value="100-1000" text="100 GB - 1 TB" />
                  <SelectItem value="1-10" text="1 TB - 10 TB" />
                  <SelectItem value=">10" text="> 10 TB" />
                  <SelectItem value="custom" text="Enter custom response" />
                </Select>
                {responses['q-data'] === 'custom' && (
                  <TextInput id="q-data-custom" labelText="Enter your custom response" placeholder="Type your response here..." value={custom['q-data'] || ''} onChange={(e) => setCustom({ ...custom, ['q-data']: (e.target as HTMLInputElement).value })} />
                )}
              </div>

              {/* Processing Frameworks */}
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Processing Frameworks: What processing frameworks are you currently using?</div>
                <Select id="q-fw" labelText="Select Response" value={responses['q-fw'] || ''} onChange={(e) => update('q-fw', (e.target as HTMLSelectElement).value)}>
                  <SelectItem value="" text="Choose an option" />
                  <SelectItem value="spark" text="Apache Spark" />
                  <SelectItem value="flink" text="Apache Flink" />
                  <SelectItem value="mr" text="MapReduce" />
                  <SelectItem value="custom" text="Enter custom response" />
                </Select>
                {responses['q-fw'] === 'custom' && (
                  <TextInput id="q-fw-custom" labelText="Enter your custom response" placeholder="Type your response here..." value={custom['q-fw'] || ''} onChange={(e) => setCustom({ ...custom, ['q-fw']: (e.target as HTMLInputElement).value })} />
                )}
              </div>

              {/* Workload Patterns */}
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Workload Patterns: What are your typical workload patterns?</div>
                <Select id="q-workload" labelText="Select Response" value={responses['q-workload'] || ''} onChange={(e) => update('q-workload', (e.target as HTMLSelectElement).value)}>
                  <SelectItem value="" text="Choose an option" />
                  <SelectItem value="batch" text="Batch" />
                  <SelectItem value="streaming" text="Streaming" />
                  <SelectItem value="mixed" text="Mixed" />
                  <SelectItem value="custom" text="Enter custom response" />
                </Select>
                {responses['q-workload'] === 'custom' && (
                  <TextInput id="q-workload-custom" labelText="Enter your custom response" placeholder="Type your response here..." value={custom['q-workload'] || ''} onChange={(e) => setCustom({ ...custom, ['q-workload']: (e.target as HTMLInputElement).value })} />
                )}
              </div>

              {/* Performance Metrics */}
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Performance Metrics: What are your current performance metrics?</div>
                <Select id="q-perf" labelText="Select Response" value={responses['q-perf'] || ''} onChange={(e) => update('q-perf', (e.target as HTMLSelectElement).value)}>
                  <SelectItem value="" text="Choose an option" />
                  <SelectItem value="latency" text="Latency-focused" />
                  <SelectItem value="throughput" text="Throughput-focused" />
                  <SelectItem value="mixed" text="Mixed" />
                  <SelectItem value="custom" text="Enter custom response" />
                </Select>
                {responses['q-perf'] === 'custom' && (
                  <TextInput id="q-perf-custom" labelText="Enter your custom response" placeholder="Type your response here..." value={custom['q-perf'] || ''} onChange={(e) => setCustom({ ...custom, ['q-perf']: (e.target as HTMLInputElement).value })} />
                )}
              </div>
            </div>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
};

export default Questionnaire;
