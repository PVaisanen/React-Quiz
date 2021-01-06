import { ConvertDate } from './utils';

export type Player = {
    name: string;
    category: string;
    score: string;
    playDate: Date;
    displayDate: string;
    difficulty: string;
  };


export const getResultFromRestApi = async (category: string, difficulty: string) => {
    const restapi_url = "https://vercel-node-app.pvaisanen.vercel.app/scoreboard/"; //process.env.REST_API_URL ;

    let endpoint: string;
    if (difficulty != null) {
      endpoint = restapi_url + category + "/" + difficulty; 
    } else {
      endpoint = restapi_url + category + "/" + difficulty; 
    }
    const data = await (await fetch(endpoint)).json() as Player[];
     ConvertDate(data);
    return data
  };

  export const postResultToRestApi = async (Name: string, Category: string, Difficulty: string, Score: number) => {
    const restapi_url = "https://vercel-node-app.pvaisanen.vercel.app/scoreboard"; //process.env.REST_API_URL ;
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

  export default getResultFromRestApi;


