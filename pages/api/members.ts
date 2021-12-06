import type { NextApiRequest, NextApiResponse } from 'next';

export default function members(req: NextApiRequest, res: NextApiResponse) {
  const response: TeamResponse = {
    members: [
      {
        name: 'Filipe',
        email: 'barbosasfilipe@gmail.com',
        role: 'engineer',
        techs: ['react', 'chakra-ui', 'nextjs', 'git'],
      },
      {
        name: 'Marco',
        email: 'ma.souza.junior@gmail.com',
        role: 'engineer',
        techs: ['react', 'chakra-ui', 'nextjs', 'git'],
      },
    ],
  };

  res.status(200).json(response);
}

export interface TeamResponse {
  members: Member[];
}

export interface Member {
  name: string;
  email: string;
  role: Role;
  techs: Techs[];
}

type Techs =
  | 'git'
  | 'html'
  | 'css'
  | 'bootstrap'
  | 'javascript'
  | 'nodejs'
  | 'express'
  | 'typescript'
  | 'react'
  | 'chakra-ui'
  | 'nextjs'
  | 'firebase'
  | 'mysql'
  | 'python'
  | 'linux';

type Role = 'engineer' | 'mentor' | 'mentored';
