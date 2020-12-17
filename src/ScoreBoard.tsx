import React from 'react'
import { Wrapper } from './App.Styles';


type Props = {
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

  
const ScoreBoard: React.FC<Props> = ({
    callback,
}
) => (
    <Wrapper>
        <p>
            All the time best!
        </p>

        <button onClick={callback} >
          Back
        </button>
    </Wrapper>
);

export default ScoreBoard;
