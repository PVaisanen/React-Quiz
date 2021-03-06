import React, { useState } from 'react';
import * as dotenv from 'dotenv'
import {
  BrowserRouter as Router,
  Switch, Route,} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalStyle, Wrapper } from './App.Styles';
// Types
import { fetchQuizQuestions, QuestionState, Difficulty } from './api/API';
// components
import QuestionCard from './components/QuestionCard';
import ScoreCard from './components/ScoreCard'
import GameStart from './components/GameStart'
import ScoreBoard from './components/ScoreBoard'
import { getResultFromRestApi, postResultToRestApi, 
  updateVisitorCounterRestApi, Player } from './api/VercelRestApi'


export type AnswerObject  = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTION = 10;

const App: React.FC = () => {
  dotenv.config();

  const [loading,setloading] = useState(false);
  const [questions,setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  
  const [scoreCard, setScoreCard] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [player, setPlayer] = React.useState("");
  const [category,setCategory] = useState("0");
  const [difficulty,setDifficulty] = useState(Difficulty[0].value);
  const [players,setPlayers] = useState<Player[]>([]);
  const [counter, setCounter] = useState(0);


  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();  
    setPlayer(event.target.value);
  };

  const changeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const {value} = event.target;
    setCategory(value)
  };

  const changedDifficulty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const {value} = event.target;
    console.log(event.target);
    setDifficulty(value)
  };

  const startTrivia = async () => {
    let xTopic: string;
    let xLevel: string;
    xTopic = category;
    xLevel = difficulty;

    setloading(true);
    setGameOver(false);
    setScoreCard(false);
    setGameOn(true);

    const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTION,
        xLevel,
        xTopic
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
      saveResultScoreboard();
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

  const saveResultScoreboard = async () => {
    if (score > 0){
      console.log(score);
      let res = await postResultToRestApi(player,category,difficulty,score);
      console.log(res);
    }
  }

const getScoreboardData = async (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();  
 
  let tmpPlayers: Player[];
  tmpPlayers = await getResultFromRestApi(category, difficulty);
  setPlayers(tmpPlayers);
}

const getVisitorCounter = async () => {
    //Init scoreboard
    let tmpPlayers: Player[];
    tmpPlayers = await getResultFromRestApi("0","easy");
    setPlayers(tmpPlayers);
    // add counter and get result
    let count: number = await updateVisitorCounterRestApi(counter);
    setCounter(count);
}

document.addEventListener("DOMContentLoaded", function(){
  getVisitorCounter();
  // Set visitors counter +1 and get result
  console.log("loaded");
});
  return (
    <>    
    <GlobalStyle />
    <Router>
      <Wrapper>
        <Nav defaultActiveKey="/" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/">Play</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/Scoreboard">Scoreboard</Nav.Link>
          </Nav.Item>
        </Nav>
      </Wrapper>
      
      <Wrapper>
          <h1>QUIZ</h1>
      </Wrapper>
          <Switch>
            <Route path="/ScoreBoard">
            <Wrapper>
              <ScoreBoard player={player} players={players} changedScoreboardCategory={changeCategory} 
              changedScoreboardDifficulty={changedDifficulty} updatedResult={getScoreboardData}  />
              </Wrapper>
            </Route>
            <Route path="/">
              
              <Wrapper>
                  {gameOn && scoreCard && gameOver ?( <ScoreCard player={player} score={score} 
                  callback={StartAgain}> </ScoreCard> 
                  ): null}
                  {!gameOn && gameOver ?(
                  <GameStart player={player} nameChange={nameChange} 
                  changedCategory={changeCategory} changedDifficulty={changedDifficulty}
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
                    callback={checkAnswer}/>
                  )}
              
                  {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION -1 ? (
                  <button className="next" onClick={nextQuestion}>
                  Next Question
                  </button>
                  ) : null}
              </Wrapper>

            </Route>
          </Switch>
    </Router>
    <p></p> 
      <Wrapper>
         {!gameOn && gameOver ? <label className="counterlabel">Visits on this page: {counter} </label> : null}
      </Wrapper>
    </>
  );

};

export default App;
