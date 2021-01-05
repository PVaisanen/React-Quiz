import { Player } from '../api/VercelRestApi'

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

  export const ConvertDate = (array: Player[]) => 
  [...array].map(e => e.displayDate = (e.playDate.toString().substring(0,10)));
  
  