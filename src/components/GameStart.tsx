import React from 'react'
// Styles
import { Wrapper } from './GameStart.styles';
import { Difficulty, Categories } from '../API';


type Props = {
    player: string;
    nameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startTrivia: (e: React.MouseEvent<HTMLButtonElement>) => void;
    changedCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    changedDifficulty : (event: React.ChangeEvent<HTMLSelectElement>) => void;
} 

  
const GameStart: React.FC<Props> = ({ 
      player,
      nameChange,
      startTrivia,
      changedCategory,
      changedDifficulty,
}) => (
    <Wrapper>   
        <div>
            <label className="namelabel">Please enter the name: </label>
        </div>   
        <input className="input" onChange={nameChange} name="player" id="player" ></input>
        <p></p>
       
          <div>
            <select className="input"  onChange={changedCategory}>
              <option value={Categories[0].value}>{Categories[0].label}</option>
              <option value={Categories[1].value}>{Categories[1].label}</option>
              <option value={Categories[2].value}>{Categories[2].label}</option>
              <option value={Categories[3].value}>{Categories[3].label}</option>
              <option value={Categories[4].value}>{Categories[4].label}</option>
              <option value={Categories[5].value}>{Categories[5].label}</option>
              <option value={Categories[6].value}>{Categories[6].label}</option>
            </select>
          </div>
          <p/>
          <div>
            <select className="input" onChange={changedDifficulty}>
              <option value={Difficulty[0].value}>{Difficulty[0].label}</option>
              <option value={Difficulty[1].value}>{Difficulty[1].label}</option>
              <option value={Difficulty[2].value}>{Difficulty[2].label}</option>
            </select>
          </div>
 
        <button className="start" onClick={startTrivia} disabled={player.length === 0 ? true : false} >
          Start
        </button>

    </Wrapper>
);

export default GameStart;
