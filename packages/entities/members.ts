export interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  techs: Techs[];
}

export type Techs =
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

export type Role = 'engineer' | 'mentor' | 'mentored';
