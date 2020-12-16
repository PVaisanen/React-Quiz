import React from 'react'
// Styles
import { Wrapper, ButtonWrapper } from './ScoreCard.styles';

type Props = {
    player: string;
    score: number;
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    
}

const Level = [
    { value: 0, label: "You didn't even have luck" },
    { value: 2, label: "You definitely need more exercise." },
    { value: 4, label: "You are still a beginner." },
    { value: 6, label: "You are clearly a generalist." },
    { value: 8, label: "You are a genius." },
    { value: 10, label: "You are walking on Wikipedia" },
  ];

  function SkillLevel(score: number) { 
    let str: String;
    str = "hmm?";

    if (score === 0){
        str = Level[0].label;
    }else if (score <= 2){
        str =Level[1].label;
    }else if (score <= 4){
        str = Level[2].label;
    }else if (score <= 6){
        str = Level[3].label;
    }else if (score <= 8){
        str = Level[4].label;
    }else{
        str = "auts";
    }

    return str;
 }

const ScoreCard: React.FC<Props> = ({ 
    player, 
    score,
    callback,
}) => (
    <Wrapper>   
        <p className="namelabel">
            Player: {player} 
        </p>
       
       <p className="namelabel">
            Your score: {score} 
        </p>

        <p className="namelabel">
            {SkillLevel(score)} 
        </p>
       
       <div>   
            <ButtonWrapper
             userClicked={true}>
                <button className="button" onClick={callback}>
                    Try again
                </button>
            </ButtonWrapper>
       </div>

    </Wrapper>
);

export default ScoreCard;
