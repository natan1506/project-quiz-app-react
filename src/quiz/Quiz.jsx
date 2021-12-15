import { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import './quiz.css'

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
  	<Box sx={{m: 2}}>
      <Typography variant="h6" component="div">
        {question.question}
      </Typography>
      <Box sx={{mt: 2}}>
        {question.answers.map((answer, index) => {
        	return <div key={index} className={`answer ${getClasses(index)}`} onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}>{answer}</div>
      	})}
      </Box>
    </Box>
 )
}

function ProgressBar({ currentQuestionIndex, totalQuestionsCount }) {
	const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100
  
	return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progressPercentage} />
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
      <Card sx={{ minWidth: 345, maxWidth: 400}}>
        <CardContent>
          <Typography variant="h3" component="div">
            Questionario
          </Typography>
          <p>This is a simple React quiz.</p><p>Check out the accompanying article over at <a href="#">justacodingblog</a> for a detailed breakdown of how the quiz works!</p>
          <Button variant="outlined" size="small" onClick={onNextClick}>Começar</Button>
        </CardContent>
      </Card>
    )
  }
	
	return (
    <Card sx={{ minWidth: 345, maxWidth: 400}}>
      <CardContent>
        {quizComplete ? (
          <Fragment>
            <Typography variant="h3" component="div">
              Questionario completo
            </Typography>
            <p>You answered {correctAnswerCount} questions correctly (out of a total {questions.length} questions)</p>
          </Fragment>
        ) : (
        <Fragment>
          <ProgressBar currentQuestionIndex={questionIndex} totalQuestionsCount={questions.length} />
          <Question 
            question={questions[questionIndex]} 
            setAnswerStatus={setAnswerStatus}
          />
          {answerStatus != null && (
            <div>
              <div className="answerStatus">{!!answerStatus ? "Correto" : "Resposta errada"}</div>
              <Button variant="outlined" size="small" onClick={onNextClick}>
                {questionIndex === questions.length - 1 ? "Ver resultado" : "Próxima"}
              </Button>
            </div>
          )}
        </Fragment>
        )}
        
        {questionIndex != null && <Button variant="outlined" size="small" onClick={onRestartClick}>
          recomeçar</Button>}
      
      </CardContent>
    </Card>
  )
}

export default Quiz