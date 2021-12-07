import { getFirebaseApiServices } from '@packages/features/services/firebase';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = getFirebaseApiServices();

  const handleResponse = (resp: unknown, error: Error | null) => {
    error !== null ? res.status(403).json(error) : res.status(200).json(resp);
  };

  if (req.method === 'POST') {
    const [resp, error] = await db.addMembers(req.body);
    handleResponse(resp, error);
  } else {
    const [resp, error] = await db.getMembers();
    handleResponse(resp, error);
  }
}
