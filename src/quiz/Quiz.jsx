import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './quiz.css'

const Question = ({ question, setAnswerStatus }) => {
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
    <Grid>
      <Box>{question.question}</Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {question.answers.map((answer, index) => {
          return (
            <Button key={index} onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}>{answer}</Button>
          )
        })}
      </Box>
    </Grid>
  )
}

const ProgressBar = ({ currentQuestionIndex, totalQuestionsCount }) => {
  const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100

  return <div>
    <div >{currentQuestionIndex} answered ({totalQuestionsCount - currentQuestionIndex} remaining)</div>
    <div style={{ width: `${progressPercentage}%` }} />
  </div>
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
      <Grid contaier>
        <Typography>Start Quiz</Typography>
        <Typography>This is a simple React quiz.</Typography>
        <Button variant="outlined" onClick={onNextClick}>Start</Button>
      </Grid>
    )
  }

  return (
    <Grid container justifyContent='center'>
      {quizComplete ? (
        <Grid >
          <Typography>Quiz complete!</Typography>
          <Typography>You answered {correctAnswerCount} questions correctly (out of a total {questions.length} questions)</Typography>
        </Grid>
      ) : (
        <Grid item sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <ProgressBar currentQuestionIndex={questionIndex} totalQuestionsCount={questions.length} />
          <Question
            question={questions[questionIndex]}
            setAnswerStatus={setAnswerStatus}
          />
          {answerStatus != null && (
            <Grid item>
              <Box className="answerStatus">{!!answerStatus ? "Correct! :)" : "Your answer was incorrect :("}</Box>
              <Button variant="outlined" onClick={onNextClick}>
                {questionIndex === questions.length - 1 ? "See results of this quiz" : "Next Question ->"}
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      <Grid>
        {questionIndex != null && <Button variant="outlined" onClick={onRestartClick}>Restart quiz</Button>}
      </Grid>
    </Grid>
  )
}

export default Quiz