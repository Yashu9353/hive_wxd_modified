import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuestionnaireHub from "./pages/QuestionnarieHub";
import QuestionnaireRouter from "./pages/QuestionnarieRouter";
import Demo from "./pages/Demo";
import DataMigrationNew from "./pages/DataMigrationNew";
import DataValidationNew from "./pages/DataValidationNew";
import NotFound from "./pages/NotFound";
import Integration from "./pages/Integration";
import MDM from "./pages/MDM";
import DataModernizationEntry from "./pages/DataModernizationEntry";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DataModernizationEntry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/questionnaire" element={<QuestionnaireHub />} />
          <Route path="/questionnaire/:id" element={<QuestionnaireRouter />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/migration/flow" element={<DataMigrationNew />} />
          <Route path="/validation" element={<DataValidationNew />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/mdm" element={<MDM />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
