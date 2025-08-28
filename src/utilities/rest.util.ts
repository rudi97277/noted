export const baseUrl = "http://localhost:8000/api";

export const rest = {
  v1: {
    vacancy: {
      list: "v1/vacancies",
      store: "v1/vacancies",
      update: "v1/vacancies/:vacancyID",
      board: "v1/vacancies/board",
    },
    user: {
      profile: "v1/user/profile",
    },
  },
} as const;

export type TRest = typeof rest;
