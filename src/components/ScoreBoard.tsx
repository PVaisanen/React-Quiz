import React from 'react'
import { Player } from '../api/VercelRestApi'
import { Categories } from '../api/API';


// Styles
import { Wrapper } from './ScoreBoard.styles';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component";

type Props = {
    player: string; 
    players: Player[];
    changeScoreboardCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

}) => (
    <Wrapper>   
        <div>
            <select className="input"  onChange={changeScoreboardCategory}>
              <option value={Categories[0].value}>{Categories[0].label}</option>
              <option value={Categories[1].value}>{Categories[1].label}</option>
              <option value={Categories[2].value}>{Categories[2].label}</option>
              <option value={Categories[3].value}>{Categories[3].label}</option>
              <option value={Categories[4].value}>{Categories[4].label}</option>
              <option value={Categories[5].value}>{Categories[5].label}</option>
              <option value={Categories[6].value}>{Categories[6].label}</option>
            </select>
          </div>
       <p></p>

       <p className="namelabel">
          <Table striped bordered hover size="sm">
            <DataTable
                title="Best players"
                columns={columns}
                data={players}
                defaultSortField="title"
              />
            </Table>
            </p>      
    </Wrapper>      
);

export default ScoreBoard;
