import React from 'react'
// Styles
import { Wrapper } from './ScoreCard.styles';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    player: string; 
}



const ScoreBoard: React.FC<Props> = ({ 
    player, 
}) => (
    <Wrapper>   
        <p className="namelabel">
            Player: {player} 
        </p>
       
       <p className="namelabel">
         
       <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Player</th>
      <th>Score</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>5</td>
      <td>1.12.2020</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>4</td>
      <td>24.12.2020</td>
    </tr>
    <tr>
    <td>2</td>
      <td>Seppo</td>
      <td>2</td>
      <td>24.12.2020</td>
    </tr>
  </tbody>
</Table>

        </p>      
     

    </Wrapper>
);

export default ScoreBoard;
