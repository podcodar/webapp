export interface Member {
  id?: string;
  name: string;
  bio: string;
  communityRole: Role;
  images: {
    cover: string;
    profile: string;
  };
  social: {
    github: string; // github user
    linkedin: string; // linkedin user
  };
}

export interface MemberReq {
  github: string;
  linkedin: string;
  role: Role;
}

export type Role = 'engineer' | 'mentor' | 'mentored';
