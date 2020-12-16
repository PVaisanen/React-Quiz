import React from 'react'
import Select from 'react-select'
// Styles
import { Wrapper } from './ScoreCard.styles';
import { Difficulty, Categories } from '../API';


type Props = {
    player: string;
    nameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startTrivia: (e: React.MouseEvent<HTMLButtonElement>) => void;
    changedCategory: (e:React.MouseEvent<HTMLSelectElement>) => void;
}

  
const GameStart: React.FC<Props> = ({ 
    player,
    nameChange,
    startTrivia,
    changedCategory,
}) => (
    <Wrapper>   
        <div>
            <label className="namelabel">Please enter the name: </label>
        </div>   
        <input className="input" onChange={nameChange} name="player" id="player" ></input>
        <p></p>
        <Select 
          id="category" classNamePrefix="select" defaultValue={Categories[0]}
          name="category" options={Categories} onchange={changedCategory} 
        />

        <Select 
          id="difficulty" classNamePrefix="select" defaultValue={Difficulty[0]}
          name="difficulty" options={Difficulty} 
        />

        <button className="start" onClick={startTrivia} disabled={player.length === 0 ? true : false} >
          Start
        </button>

    </Wrapper>
);

export default GameStart;
