import { useState, useEffect, Fragment } from 'react';
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
  	<div className="question">
      <div className="questionText">{question.question}</div>
      <div className="answers">
        {question.answers.map((answer, index) => {
        	return <div key={index} className={`answer ${getClasses(index)}`} onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}>{answer}</div>
      	})}
      </div>
    </div>
 )
}

const ProgressBar = ({ currentQuestionIndex, totalQuestionsCount }) => {
	const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100
  
	return <div className="progressBar">
    <div className="text">{currentQuestionIndex} answered ({totalQuestionsCount - currentQuestionIndex} remaining)</div>
    <div className="inner" style={{ width: `${progressPercentage}%` }} />
	</div>
}

function Quiz({ questions })  {
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
      <div className="quiz">
        <h1>Start Quiz</h1>
        <p>This is a simple React quiz.</p><p>Check out the accompanying article over at <a href="#">justacodingblog</a> for a detailed breakdown of how the quiz works!</p>
        <button className="start" onClick={onNextClick}>Start</button>
      </div>
    )
  }
	
	return (
    <div className="quiz">
      {quizComplete ? (
      	<Fragment>
      	  <h1>Quiz complete!</h1>
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
            <div className="answerStatus">{!!answerStatus ? "Correct! :)" : "Your answer was incorrect :("}</div>
            <button className="next" onClick={onNextClick}>
            {questionIndex === questions.length - 1 ? "See results of this quiz" : "Next Question ->"}
            </button>
          </div>
        )}
      </Fragment>
      )}
      
      {questionIndex != null && <button className="restart" onClick={onRestartClick}>Restart quiz</button>}
    </div>
  )
}

export default Quiz