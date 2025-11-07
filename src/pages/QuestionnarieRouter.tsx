import { useParams } from 'react-router-dom';
import Questionnaire from './Questionnaire';
import QuestionnaireEmpty from './QuestionnaireEmpty';

const QuestionnaireRouter = () => {
  const { id } = useParams();

  if (id === 'interactive') {
    return <Questionnaire />;
  }

  if (id === 'word') {
    return <QuestionnaireEmpty />;
  }

  return <QuestionnaireEmpty />;
};

export default QuestionnaireRouter;


