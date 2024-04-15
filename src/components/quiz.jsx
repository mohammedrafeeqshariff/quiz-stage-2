import { useState } from 'react';
import questions from './quizQuestion.json';

const QuizComponent = () => {
  const [state, setState] = useState({
    questions: questions,
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    numberofAnsweredQuestions: 0
  });

  const currentQuestion = state.questions[state.currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (option === currentQuestion.answer) {
      setState(prevState => ({
        ...prevState,
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1
      }));
      alert("Correct answer");
    } else {
      setState(prevState => ({
        ...prevState,
        wrongAnswers: prevState.wrongAnswers + 1
      }));
      alert("Wrong answer");
    }
    setState(prevState => ({
      ...prevState,
      numberofAnsweredQuestions: prevState.numberofAnsweredQuestions + 1
    }));
  };

  const handleQuitButtonClick = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      window.location.reload(false);
    }
  };

  const handleNextButtonClick = () => {
    setState(prevState => ({
      ...prevState,
      currentQuestionIndex: prevState.currentQuestionIndex + 1
    }));
  };

  const handlePrevButtonClick = () => {
    setState(prevState => ({
      ...prevState,
      currentQuestionIndex: prevState.currentQuestionIndex - 1
    }));
  };

  return (
    <div className="question-container">
      <h1>Question</h1>
      <div>
        <span className='ques_no'>{state.currentQuestionIndex + 1} of {state.questions.length}</span>
        <h2>{currentQuestion.question}</h2>
      </div>
      <div className="options-container">
        {['optionB', 'optionA', 'optionC', 'optionD'].map((optionKey, index) => (
          <p key={index} onClick={() => handleOptionClick(currentQuestion[optionKey])} className="option">{currentQuestion[optionKey]}</p>
        ))}
      </div>
      <div className="button-container">
        <button className="button_prev" onClick={handlePrevButtonClick} disabled={state.currentQuestionIndex === 0}>Previous</button>
        <button className="button_quit" onClick={handleQuitButtonClick}>Quit</button>
        <button className="button_next" onClick={handleNextButtonClick} disabled={state.currentQuestionIndex === state.questions.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default QuizComponent;
