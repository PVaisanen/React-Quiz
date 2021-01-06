import React from 'react'
import { Player } from '../api/VercelRestApi'
import { Difficulty, Categories } from '../api/API';

// Styles
import { Wrapper } from './ScoreBoard.styles';
// component
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component";

type Props = {
    player: string; 
    players: Player[];
    changeScoreboardCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    changedScoreboardDifficulty : (event: React.ChangeEvent<HTMLSelectElement>) => void;
    updatedResult: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: false   
  },
  {
    name: "Score",
    selector: "score",
    sortable: false,
  },
  {
    name: "Level",
    selector: "difficulty",
    sortable: false,
  },
  {
    name: "Date",
    selector: "displayDate",
    sortable: false,
    right: true,
  }
];

const ScoreBoard: React.FC<Props> = ({ 
    player, 
    players,
    changeScoreboardCategory,
    changedScoreboardDifficulty,
    updatedResult,

}) => (
    <Wrapper>   
        <div>
            <select className="input"  onChange={changedScoreboardDifficulty}>
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
              <select className="input" onChange={changedScoreboardDifficulty}>
                <option value={Difficulty[0].value}>{Difficulty[0].label}</option>
                <option value={Difficulty[1].value}>{Difficulty[1].label}</option>
                <option value={Difficulty[2].value}>{Difficulty[2].label}</option>
              </select>
            </div>
          <button className="start" onClick={updatedResult} >
            Update
          </button>

       <p></p>


       <p className="namelabel">
          <Table striped bordered hover size="sm">
            <DataTable
                title="All the time top 8"
                columns={columns}
                data={players}
                defaultSortField="title"
              />
            </Table>
            </p>      
    </Wrapper>      
);

export default ScoreBoard;
