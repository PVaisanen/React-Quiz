import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './Images/backgroud_Mtb.jpg';

export const GlobalStyle = createGlobalStyle`
html {
    height: 100%;
  }
  body {
    background-image: url(${BGImage});
    background-attachment: fixed;
    background-position: center;
    margin: 0;
    padding: 0 10px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
    style="font-size:1vw
  }
  `;

  export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
  
    > p {
        color: #fff;
    }
    .score {
        color: #fff;
        font-size: 2rem;
        margin: 0;
    }
    .sm_score {
      color: #fff;
      font-size: 1.5rem;
      margin: 0;
      text-shadow: 2px 2px #0085a3;
  }
    .input {
      color: #000000;
      font-size: 1.25rem;
      margin: 0;
      border-radius: 5px;
      height: 40px;
    }
    .namelabel {
      color: #000;
      font-size: 1.5rem;
      margin: 0;
    }
    .counterlabel {
      color: #FFF;
      font-size: 1rem;
      margin: 0;
      text-shadow: 1.5px 1.5px #0085a3;
    }
  }

  h1 {
        font-family: Catamaran;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        font-weight: 300;
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 60px;
        text-align: center;
        margin: 2px;
    }
      .start, .next {
        cursor: pointer;
        background: linear-gradient(180deg, #ffffff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40px;
        margin: 10px 0;
        padding: 0 40px;
        font-size: 1.2rem;
    }
    .start {
        max-width: 200px;
    }
   
`;




