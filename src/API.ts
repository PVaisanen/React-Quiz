import { shuffleArray } from './utils';

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  };

export type QuestionState = Question & { answers: string[] };

export const Difficulty = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
]

export const Categories = [
  { value: '0', label: 'Random categories' },
  { value: '9', label: 'General knowledge' },
  { value: '11', label: 'Movie' },
  { value: '21', label: 'Sport' },
  { value: '12', label: 'Music' },
  { value: '23', label: 'History' },
  { value: '27', label: 'Animals' },
];

export const fetchQuizQuestions = async (amount: number, difficulty: string, category: string) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
};
