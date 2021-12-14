import { getMemberInstance } from '@packages/services/members';
import { makeRequestHandler } from '@packages/utils/api';

import type { NextApiRequest, NextApiResponse } from 'next';

const membersDao = getMemberInstance();

const httpVerbHandlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const resp = await membersDao.list();
    return res.status(200).json(resp);
  },
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const resp = await membersDao.add(req.body);
    return res.status(200).json(resp);
  },
  PUT: async (req: NextApiRequest, res: NextApiResponse) => {
    const resp = await membersDao.update(req.body.id, req.body);
    return res.status(200).json(resp);
  },
};

export default makeRequestHandler(httpVerbHandlers);
