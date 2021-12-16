import { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const primary = '#565AE6';
const secondary = '#FFD964';
const subtitle = '#777';

function Question({ question, setAnswerStatus }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

  useEffect(() => {
    if (selectedAnswerIndex != null) {
      setAnswerStatus(selectedAnswerIndex === question.correctAnswerIndex)
    }
  }, [selectedAnswerIndex])

  useEffect(() => {
    setSelectedAnswerIndex(null)
  }, [question])

  const getClasses = (index) => {
    let classes = []
    if (selectedAnswerIndex != null) {
      if (selectedAnswerIndex === index) {
        classes.push("selected")
      }
      if (index === question.correctAnswerIndex) {
        if (selectedAnswerIndex === index) {
          classes.push("correct")
        } else {
          classes.push("incorrect")
        }
      }
    }

    return classes.join(" ")
  }

  return (
    <Box sx={{ height: '300px', p: 5, display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
      <Typography variant="h6" component="div" sx={{ pb: 3 }}>
        {question.question}
      </Typography>
      <Box>
        <RadioGroup
          name="radio-buttons-group"
        >
          {question.answers.map((answer, index) => (
            <FormControlLabel key={index} value={answer} control={<Radio />} label={answer}
              className={`answer ${getClasses(index)}`}
              onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}
            />
          ))}
        </RadioGroup>
        {/* {question.answers.map((answer, index) => {
        	return <div key={index} className={`answer ${getClasses(index)}`} onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}>{answer}</div>
      	})} */}
      </Box>
    </Box>
  )
}

function ProgressBar({ currentQuestionIndex, totalQuestionsCount }) {
  const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" color='secondary' value={progressPercentage} sx={{ height: 10, bgcolor: secondary }} />
    </Box>
    // <div className="progressBar">
    //   <div className="text">{currentQuestionIndex} answered ({totalQuestionsCount - currentQuestionIndex} remaining)</div>
    //   <div className="inner" style={{ width: `${progressPercentage}%` }} />
    // </div>
  )
}

function Quiz({ questions }) {
  const [questionIndex, setQuestionIndex] = useState(null)
  const [answerStatus, setAnswerStatus] = useState(null)
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  useEffect(() => {
    setAnswerStatus(null)
  }, [questionIndex])

  useEffect(() => {
    if (answerStatus) {
      setCorrectAnswerCount(count => count + 1)
    }
  }, [answerStatus])

  const onNextClick = () => {
    if (questionIndex === questions.length - 1) {
      setQuizComplete(true)
    } else {
      setQuestionIndex(questionIndex == null ? 0 : questionIndex + 1)
    }
  }

  const onRestartClick = () => {
    setQuizComplete(false)
    setQuestionIndex(null)
    setCorrectAnswerCount(0)
  }

  if (questionIndex == null) {
    return (
      <Card sx={{
        width: { xs: '300px', md: '450px', lg: '750px' },
        p: { xs: 1, lg: 10 },
        bgcolor: primary,
        color: '#fff',
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <CardContent>
          <Typography variant="h3" component="div" sx={{ mb: 5 }}>
            Questionário
          </Typography>
          <Typography sx={{ font}}>
            <p>This is a simple React quiz.</p><p>Check out the accompanying article over at for a detailed breakdown of how the quiz works!</p>
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center', pt: 7 }}>
          <Button variant="outlined" size="large" onClick={onNextClick} sx={{
            height: '50px', bgcolor: '#fff', color: primary, fontWeight: 'bold',
            ':hover': { bgcolor: primary, color: '#fff', border: '2px solid #fff' }
          }}>
            Começar
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card sx={{ width: { xs: '300px', md: '450px', lg: '1200px' }, borderRadius: '4px', border: '1px solid #565AE6' }}>
      <CardContent>
        {quizComplete ? (
          <Box sx={{
            bgcolor: '#fff',
            height: '270px',
            color: '#fff',
            // display: 'flex',
            // justifyContent: 'center',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            bgcolor: primary,
            p: 5,
          }}>
            <Typography sx={{ mb: 2 }} variant="h4" component="div">
              Questionario completo
            </Typography>
            <Typography variant="p" component="div">Você acertou {correctAnswerCount} questões de um total de {questions.length}</Typography>
          </Box>
        ) : (
          <Box sx={{}}>
            <ProgressBar currentQuestionIndex={questionIndex} totalQuestionsCount={questions.length} />
            <Question
              question={questions[questionIndex]}
              setAnswerStatus={setAnswerStatus}
            />

          </Box>
        )}

      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 5, py: 3 }}>
        {questionIndex != null &&
          <Button
            variant="outlined"
            size="small"
            onClick={onRestartClick}
            sx={{
              width: '140px',
              height: '50px',
              bgcolor: '#fff',
              color: primary,
              fontSize: 15,
              border: '1px solid #565AE6',
              fontWeight: 'bold',
              ':hover': { bgcolor: secondary, color: primary, border: '2px solid #565AE6' }
            }}
          >
            Recomeçar
          </Button>}

        {answerStatus != null && (
          // <div>
          //   <div className="answerStatus">{!!answerStatus ? "Correto" : "Resposta errada"}</div>
          <Button
            variant="outlined"
            size="small"
            onClick={onNextClick}
            sx={{
              width: '210px',
              height: '50px',
              bgcolor: '#fff',
              border: '1px solid #565AE6',
              color: primary,
              fontSize: 15,
              fontWeight: 'bold',
              ':hover': { bgcolor: primary, color: '#fff', border: '2px solid #565AE6' }

            }}>
            {questionIndex === questions.length - 1 ? "Ver resultado" : "Próxima"}
          </Button>
          // </div>
        )}
      </CardActions>
    </Card>
  )
}

export default Quiz