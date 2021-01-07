import { ConvertDate } from './utils';

export type Player = {
    name: string;
    category: string;
    score: string;
    playDate: Date;
    displayDate: string;
    difficulty: string;
  };

  export type Visitor = {
    page: string;
    counter: number;
  };


export const getResultFromRestApi = async (category: string, difficulty: string) => {
    const restapi_url = "https://vercel-node-app.pvaisanen.vercel.app/scoreboard/";
    //const restapi_url = "http://localhost:3005/scoreboard/";

    let endpoint: string;
    if (difficulty != null) {
      endpoint = restapi_url + category + "/" + difficulty; 
    } else {
      endpoint = restapi_url + category + "/" + difficulty; 
    }
    console.log(endpoint)

    const data = await (await fetch(endpoint)).json() as Player[];
     ConvertDate(data);
    return data
  };

  export const postResultToRestApi = async (Name: string, Category: string, Difficulty: string, Score: number) => {
    const restapi_url = "https://vercel-node-app.pvaisanen.vercel.app/scoreboard"; //process.env.REST_API_URL ;
  //  const restapi_url = "http://localhost:3005/scoreboard";
 
    const endpoint = restapi_url; 
  
    const newplayer = {
      name: Name,
      category: Category,
      score: Score,
      difficulty: Difficulty,
    }
    
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newplayer)
    }

    try {
      const response = await (await fetch(endpoint,requestOptions)).json();
      return response.ok;
    }catch (ex) {
      return false;
    }
  
  };


  export const updateVisitorCounterRestApi = async (counter: number) => {
    const restapi_url = "https://vercel-node-app.pvaisanen.vercel.app/visitors/5ff6ed75faf24b548881f55d"; //process.env.REST_API_URL ;
   // const restapi_url = "http://localhost:3005/visitors/5ff6ed75faf24b548881f55d";

    const newvisitor = {
      page: "Quiz",
      counter: counter,
    }
    
      const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newvisitor)
    }

    try {
      const response = await (await fetch(restapi_url,requestOptions)).json() as Visitor;
      console.log(response.counter)
      return response.counter;
    }catch (ex) {
      return 0;
    }
  };


  export default getResultFromRestApi;


