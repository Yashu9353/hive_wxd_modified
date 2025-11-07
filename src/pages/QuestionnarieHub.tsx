import { Tile, Breadcrumb, BreadcrumbItem, Button, Grid, Column } from '@carbon/react';

const QuestionnaireHub = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Questionnaire</BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 400 }}>
        Questionnaire options
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: '#525252', maxWidth: '800px' }}>
        Choose how you want to provide your assessment details.
      </p>

      <Grid>
        <Column lg={8} md={8} sm={4}>
          <Tile style={{ padding: '2rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Interactive questionnaire</h3>
            <p style={{ color: '#525252', marginBottom: '0.75rem' }}>
              Guided form with steps for environment, data profile, and requirements.
            </p>
            <Button kind="primary" href="/questionnaire/interactive">Open</Button>
          </Tile>
        </Column>
        <Column lg={8} md={8} sm={4}>
          <Tile style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Word document</h3>
            <p style={{ color: '#525252', marginBottom: '0.75rem' }}>
              View or share questions in a Word document (supports public .docx URLs).
            </p>
            <Button kind="secondary" href="/questionnaire/word">Open</Button>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
};

export default QuestionnaireHub;


