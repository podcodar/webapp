import { apiAuthToken } from "@packages/config/api";

import type { Question } from "@packages/entities/questions";
import type { MemberCreatedResp, MemberReq } from "@packages/entities/members";

// Define a service using a base URL and expected endpoints
const QUESTION_URL = "/api/questions";
export const questionsApi = {
	list: () => fetchWithToken<Question[]>(QUESTION_URL),
	create: (question: Question) =>
		fetchWithToken(QUESTION_URL, {
			body: JSON.stringify(question),
			method: "POST",
		}),
	update: (question: Partial<Question>) =>
		fetchWithToken<Question>(QUESTION_URL, {
			body: JSON.stringify(question),
			method: "PUT",
		}),
};

const MEMBERS_URL = "/api/members";
export const membersApi = {
	create: (req: MemberReq) =>
		fetchWithToken<MemberCreatedResp>(MEMBERS_URL, {
			body: JSON.stringify(req),
			method: "POST",
		}),
};

async function fetchWithToken<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
	const res = await fetch(input, {
		...init,
		headers: {
			...(init?.headers ?? {}),
			"Content-type": "application/json",
			Authorization: `Basic ${apiAuthToken}`,
		},
	});

	// validate response
	if (!res.ok) throw Error(`${res.status}: ${res.statusText}`);

	return await res.json();
}
