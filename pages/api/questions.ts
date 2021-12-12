import { getQuestionInstance } from '@packages/services/questions';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function questions(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const questionDao = getQuestionInstance();

  try {
    if (req.method === 'POST') {
      const resp = await questionDao.add(req.body);
      res.status(200).json(resp);
    } else {
      const resp = await questionDao.list();
      res.status(200).json(resp);
    }
  } catch (error) {
    res.status(403).json(error);
  }
}
