import { getQuestionInstance } from "@packages/services/questions";
import { makeRequestHandler } from "@packages/utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

const questionDao = getQuestionInstance();

const httpVerbHandlers = {
	GET: async (req: NextApiRequest, res: NextApiResponse) => {
		const resp = await questionDao.list();
		return res.status(200).json(resp);
	},
	POST: async (req: NextApiRequest, res: NextApiResponse) => {
		const resp = await questionDao.add(req.body);
		return res.status(200).json(resp);
	},
	PUT: async (req: NextApiRequest, res: NextApiResponse) => {
		const { id, ...body } = req.body;
		const resp = await questionDao.update(id, body);
		return res.status(200).json(resp);
	},
};

export default makeRequestHandler(httpVerbHandlers);
