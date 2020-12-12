import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty } from './API';
//import { setSourceMapRange } from 'typescript';
// styles
import { GlobalStyle, Wrapper } from './App.Styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTION = 10;

const App = () => {
  const [loading,setloading] = useState(false);
  const [questions,setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, SetGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setloading(true);
    SetGameOver(false);
    //TODO try catch
    const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTION,
        Difficulty.EASY
    );
    
    setQuestion(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setloading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answers
      const answer = e.currentTarget.value;
      // check answer
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      // save answer in array from user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move on to the next 
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTION){
      SetGameOver(true);
    }else{
      setNumber(nextQuestion);
    }

  };
  
  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Question ...</p>}
      {!loading && !gameOver && (
        <QuestionCard 
          questionNr={number+1}
          totalQuestion={TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION -1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
    ) : null}
    </Wrapper>
    </>
  );
};

export default App;
