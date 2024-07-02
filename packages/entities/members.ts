export interface Member {
  id?: string;
  name: string;
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
export interface MemberCreatedResp {
  id: string;
}

export type Role = "engineer" | "mentor" | "mentored";
