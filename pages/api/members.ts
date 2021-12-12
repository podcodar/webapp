import { getMemberInstance } from '@packages/services/members';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function members(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const membersDao = getMemberInstance();

  try {
    if (req.method === 'POST') {
      const resp = await membersDao.add(req.body);
      res.status(200).json(resp);
    } else {
      const resp = await membersDao.list();
      res.status(200).json(resp);
    }
  } catch (error) {
    res.status(403).json(error);
  }
}
