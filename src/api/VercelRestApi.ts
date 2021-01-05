import { ConvertDate } from './utils';

export type Player = {
    name: string;
    category: string;
    score: string;
    playDate: Date;
    displayDate: string;
    difficulty: string;
  };


export const getResultFromRestApi = async (category: string) => {
    const restapi_url = "https://vercel-node-app.pvaisanen.vercel.app/scoreboard/"; //process.env.REST_API_URL ;
   // const restapi_url = "http://localhost:3005/scoreboard/";

    const endpoint = restapi_url + category; 
    const data = await (await fetch(endpoint)).json() as Player[];
     ConvertDate(data);
    return data
  };

 

  export default getResultFromRestApi;


