import './App.css';

import Quiz from './quiz/Quiz'
import { questions } from './quiz/exemploQuestions'

function App() {
  return (
    <Quiz questions={questions} />
  );
}

export default App;

