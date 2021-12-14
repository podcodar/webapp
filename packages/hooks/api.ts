import { Question } from '@packages/entities/questions';
import { apiAuthToken } from '@packages/config/api';

// Define a service using a base URL and expected endpoints
const QUESTION_URL = '/api/questions';
export const questionsApi = {
  list: () => fetchWithToken(QUESTION_URL),
  create: (question: Question) =>
    fetchWithToken(QUESTION_URL, {
      body: JSON.stringify(question),
      method: 'POST',
    }),
  update: (question: Partial<Question>) =>
    fetchWithToken(QUESTION_URL, {
      body: JSON.stringify(question),
      method: 'PUT',
    }),
};

const fetchWithToken = async (
  input: RequestInfo,
  init?: RequestInit | undefined,
) => {
  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Basic ${apiAuthToken}`,
    },
  }).then((r) => r.json());
};
