import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Home from "./home/Home";
import Quiz from './quiz/Quiz'
import CreateQuiz from './quiz/CreateQuiz'
import { questions } from './quiz/exemploQuestions'

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}>
      <Router>
        <Route path="/create">
          <CreateQuiz />
        </Route>
        <Route path="/quiz/:idquiz">
            <Quiz questions={questions} />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Router>
    </Container>
  );
}

export default App;

