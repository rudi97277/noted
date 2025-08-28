export interface IVacancyResponse {
  id: number;
  name: string;
  company: string;
  location: string;
  salary?: number;
  type: TVacancyType;
  arrangement: TVacancyArrangement;
  status: TVacancyStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type TJob = {
  id: number;
  name: string;
  company: string;
};

export type TVacancyBoardResponse = Record<TVacancyStatus, TJob[]>;

export interface IVacancyListRequest {
  keyword?: string;
  page?: number;
  page_size?: number;
}

export type TVacancyArrangement = "Onsite" | "Hybrid" | "Remote/WFH";

export type TVacancyType =
  | "Fulltime"
  | "Contract"
  | "Internship"
  | "Freelance"
  | "Parttime";

export type TVacancyStatus =
  | "Applied"
  | "Test"
  | "Interview"
  | "Accepted"
  | "Rejected";
