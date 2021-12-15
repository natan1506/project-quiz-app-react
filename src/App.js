import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Quiz from './quiz/Quiz'
import { questions } from './quiz/exemploQuestions'

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}>
      <Quiz questions={questions} />
    </Container>
  );
}

export default App;

