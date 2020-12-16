import React, { useState } from 'react';

import { fetchQuizQuestions } from './API';
// components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty, Categories } from './API';
//import { setSourceMapRange } from 'typescript';
// styles
import { GlobalStyle, Wrapper } from './App.Styles';

import ScoreCard from './components/ScoreCard'
import GameStart from './components/GameStart'


export type AnswerObject  = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTION = 10;

const App: React.FC = () => {
  const [loading,setloading] = useState(false);
  const [questions,setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  
  const [scoreCard, setScoreCard] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [player, setPlayer] = React.useState("");


  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPlayer(event.target.value);
  };

  const changeCategory = (event: React.MouseEvent<HTMLSelectElement>) => {
    //setPlayer(event.target.value);
    console.log(event.target)
    console.log("huhuu")

};



  const startTrivia = async () => {
    // let selectElementcategory = document.getElementById("category");
    // let temp = selectElementcategory?.innerText;
    // let indxcat = Categories.findIndex(e => e.label === temp);

    // let selectElementdifficulty = document.getElementById("difficulty");
    // temp = selectElementdifficulty?.innerText;
    // let indxdif = Difficulty.findIndex(e => e.label === temp);

    let indxdif: number; 
    indxdif = 0;

    let indxcat: number; 
    indxcat = 0;

    setloading(true);
    setGameOver(false);
    setScoreCard(false);
    setGameOn(true);

    const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTION,
        Difficulty[indxdif].value,
        Categories[indxcat].value
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

    if (!gameOver && ((TOTAL_QUESTION === number+1)))
    {
      setScoreCard(true);
      setGameOn(true);
      setGameOver(true);
      console.log("checkAnswer");
    }

  };
  
  const nextQuestion = () => {
    // move on to the next 
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTION){
      setScoreCard(true);
    }else{
      setNumber(nextQuestion);
    }
  };

  const StartAgain = (e: React.MouseEvent<HTMLButtonElement>) => {
    setScoreCard(false);
    setGameOn(false);
    setGameOver(true);
  };

  return (
    <>     
    <GlobalStyle />
    <Wrapper>
      <h1>QUIZ</h1>

      {gameOn && scoreCard && gameOver ?( <ScoreCard player={player} score={score} 
        callback={StartAgain}> </ScoreCard> 
      ): null}

      {!gameOn && gameOver ?(
        <GameStart player={player} nameChange={nameChange} changedCategory={changeCategory}
        startTrivia={startTrivia}> </GameStart> 
      ): null}  
    
      {gameOn && !gameOver ? <label className="sm_score">Player: {player}</label> : null}
      {gameOn && !gameOver ? <label className="sm_score">Score: {score}</label> : null}

      {loading && <p>Loading Question ...</p>}
      {gameOn && !gameOver && !loading && (
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


