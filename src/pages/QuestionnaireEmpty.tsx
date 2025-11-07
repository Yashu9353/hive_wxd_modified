import { useState } from 'react';
import { Tile, Breadcrumb, BreadcrumbItem, TextInput, Button } from '@carbon/react';

const QuestionnaireEmpty = () => {
  const [docUrl, setDocUrl] = useState('');
  const [localName, setLocalName] = useState('');
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);

  // Create sample questionnaire content
  const createSampleQuestionnaire = () => {
    const content = `
Hadoop Modernization Pre-Workshop Questionnaire

General Questions
==================

1. Current Hadoop Environment
   What version and distribution are you currently using?
   - Active Hadoop cluster
   - Legacy Hadoop setup
   - No Hadoop environment
   - Other: _________________

2. Cluster Configuration
   How is your cluster currently configured?
   - Yes
   - No
   - Maybe
   - Other: _________________

3. Data Volume and Growth
   What is your current data volume and expected growth?
   - < 100 GB
   - 100 GB - 1 TB
   - 1 TB - 10 TB
   - > 10 TB
   - Other: _________________

4. Processing Frameworks
   What processing frameworks are you currently using?
   - Apache Spark
   - Apache Flink
   - MapReduce
   - Other: _________________

5. Workload Patterns
   What are your typical workload patterns?
   - Batch
   - Streaming
   - Mixed
   - Other: _________________

6. Performance Metrics
   What are your current performance metrics?
   - Latency-focused
   - Throughput-focused
   - Mixed
   - Other: _________________

Environment Details
===================

7. Source System Details
   - Hive version: _________________
   - Number of databases: _________________
   - Total data size: _________________
   - Number of tables: _________________

8. Target System Requirements
   - Preferred target platform: _________________
   - Expected migration timeline: _________________
   - Budget considerations: _________________

Migration Readiness
===================

9. Data Dependencies
   - Are there cross-database dependencies? Yes / No
   - Are there external dependencies? Yes / No
   - Comments: _________________

10. Compliance and Security
    - Regulatory requirements: _________________
    - Security policies: _________________
    - Data retention policies: _________________

Notes
=====
Additional comments or requirements:
___________________________________
___________________________________
___________________________________

Date: _________________
Contact: _________________
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Hadoop_Modernization_Questionnaire.txt';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Questionnaire</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Migration Assessment Questionnaire
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#525252', maxWidth: '800px' }}>
        Evaluate your current environment and determine migration readiness.
      </p>

      <Tile style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Questionnaire (Word document)</h3>
        <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '900px' }}>
          <div>
            <p style={{ color: '#525252', marginBottom: '0.5rem' }}>Browse from your machine</p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                id="docx-file"
                type="file"
                accept=".doc,.docx,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    setLocalName(file.name);
                    const url = URL.createObjectURL(file);
                    setLocalBlobUrl((prev) => {
                      if (prev) URL.revokeObjectURL(prev);
                      return url;
                    });
                  }
                }}
              />
              <Button kind="secondary" onClick={() => document.getElementById('docx-file')?.click()}>Browse local file</Button>
              <Button kind="tertiary" onClick={createSampleQuestionnaire}>Download sample questionnaire</Button>
              <span style={{ color: '#525252' }}>{localName ? `Selected: ${localName}` : 'No file selected'}</span>
              {localBlobUrl && (
                <Button kind="ghost" onClick={() => window.open(localBlobUrl!, '_blank')}>Open locally</Button>
              )}
            </div>
            <p style={{ color: '#8d8d8d', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Browse a local questionnaire file or download a sample questionnaire to get started. Opens your local file in a new browser tab via a temporary link.
            </p>
          </div>

          <div>
            <p style={{ color: '#525252', marginBottom: '0.5rem' }}>Or open from a URL</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem' }}>
              <TextInput id="doc-url" labelText="Public .docx URL" placeholder="https://example.com/questionnaire.docx" value={docUrl} onChange={(e) => setDocUrl((e.target as HTMLInputElement).value)} />
              <Button
                kind="primary"
                disabled={!docUrl}
                onClick={() => {
                  const encoded = encodeURIComponent(docUrl);
                  window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encoded}`, '_blank');
                }}
              >
                Open in Word viewer
              </Button>
            </div>
            <p style={{ color: '#8d8d8d', fontSize: '0.875rem', marginTop: '0.25rem' }}>Paste a publicly accessible link. We do not upload or store your file.</p>
          </div>
        </div>
      </Tile>

      {/* Removed placeholder implementation tile as requested */}
    </div>
  );
};

export default QuestionnaireEmpty;
