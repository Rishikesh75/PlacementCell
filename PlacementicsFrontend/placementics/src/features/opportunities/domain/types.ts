export type OpportunityKind = "job" | "research";
export type PosterRole = "alumni" | "faculty";

export interface OpportunityPoster {
  initials: string;
  name: string;
  caption: string;
  role: PosterRole;
}

export interface Opportunity {
  id: number;
  kind: OpportunityKind;
  title: string;
  meta: string;
  description: string;
  poster: OpportunityPoster;
  postedAgo: string;
}
