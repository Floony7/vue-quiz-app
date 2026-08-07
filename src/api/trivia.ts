import type {
  QuizQuestion,
  TriviaApiResponse,
  TriviaQuestionResponse,
} from '@/types/trivia';

/** ALL PARAMS
 * https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple&encode=url3986
 */

const BASE_URL = import.meta.env.BASE_URL as string || 'https://opentdb.com/api.php';

const decode = (value: string): string => {
  return decodeURIComponent(value);
}

const shuffle = <T>(items: T[]): T[] => {
    return items.sort(() => Math.random() - 0.5);
}

// Probably could up this to the Fisher Yates shuffle algorithm for better randomness
const normaliseQuestion = (q: TriviaQuestionResponse): QuizQuestion => {
  const answer = decode(q.correct_answer);
    const { category, difficulty, question, incorrect_answers } = q;

  return {
      category,
      difficulty,
      question: decode(question),
      correct_answer: answer,
      answers: shuffle([
        answer,
        ...incorrect_answers.map(decode)
      ]),
  }
};

export const fetchQuestions = async (amount = 10): Promise<QuizQuestion[]> => {
  const params = new URLSearchParams({
    amount: String(amount),
    type: 'multiple',
    encode: 'url3986',
  });
  const url = `${BASE_URL}?${params}`
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

 const data: TriviaApiResponse = await res.json();

    if (data.response_code !== 0) {
    throw new Error(`Trivia API error: ${data.response_code}`);
  }

   return data.results.map(normaliseQuestion);

}