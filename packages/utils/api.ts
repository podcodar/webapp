import type { NextApiRequest, NextApiResponse } from "next";

export type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export type RequestHandlerMap = Record<string, RequestHandler>;

export function makeRequestHandler(httpVerbHandlers: RequestHandlerMap) {
	const defaultHandler = (req: NextApiRequest, res: NextApiResponse) => {
		res.setHeader("Allow", Object.keys(httpVerbHandlers));
		res.status(405).end(`Method ${req.method} Not Allowed`);
	};

	return async (req: NextApiRequest, res: NextApiResponse) => {
		const httpMethod = req.method ?? "";
		try {
			const requestHandler = httpVerbHandlers[httpMethod] ?? defaultHandler;
			return await requestHandler(req, res);
		} catch (error) {
			return res.status(403).json(JSON.stringify(error));
		}
	};
}
