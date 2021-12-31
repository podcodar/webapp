import sample from 'lodash/sample';

import { GithubResponse } from '@packages/entities/github';
import { Member, MemberReq } from '@packages/entities/members';
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
    const member = await makeMemberFromRequest(req);
    const savedMember = await membersDao.findByGithubUser(member.social.github);

    // [upsert] if user exists, update it
    const resp = await (savedMember != null
      ? membersDao.update(savedMember.id!, member)
      : membersDao.add(member));

    return res.status(200).json(resp);
  },
  PUT: async (req: NextApiRequest, res: NextApiResponse) => {
    const resp = await membersDao.update(req.body.id, req.body);
    return res.status(200).json(resp);
  },
};

export default makeRequestHandler(httpVerbHandlers);

const GITHUB_API = 'https://api.github.com/users';
const LINKEDIN_BASE_URL = 'https://www.linkedin.com/in';

export async function makeMemberFromRequest(
  req: NextApiRequest,
): Promise<Member> {
  const memberReq = req.body as MemberReq;
  const githubResp: GithubResponse = await fetch(
    `${GITHUB_API}/${memberReq.github}`,
  ).then((r) => r.json());

  return {
    communityRole: memberReq.role,
    images: {
      profile: githubResp.avatar_url,
      cover: getRandomCover(),
    },
    name: githubResp.name,
    social: {
      github: githubResp.html_url,
      linkedin: `${LINKEDIN_BASE_URL}/${memberReq.linkedin}`,
    },
  };
}

const PODCODAR_COVERS = [
  '/images/covers/main.png',
  '/images/covers/party.png',
  '/images/covers/lines.png',
];

const getRandomCover = () => sample(PODCODAR_COVERS)!;
