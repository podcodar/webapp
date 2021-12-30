import { Question } from '@packages/entities/questions';
import { apiAuthToken } from '@packages/config/api';
import { MemberReq } from '@packages/entities/members';

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

const MEMBERS_URL = '/api/members';
export const membersApi = {
  create: (req: MemberReq): Promise<Response> =>
    fetchWithToken(MEMBERS_URL, {
      body: JSON.stringify(req),
      method: 'POST',
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
      'Content-type': 'application/json',
      Authorization: `Basic ${apiAuthToken}`,
    },
  }).then((r) => r.json());
};
