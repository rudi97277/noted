import { vacancyBoard } from "@/services/mocks/vacancy.mock";
import type {
  IVacancyListRequest,
  IVacancyResponse,
  TVacancyBoardResponse,
} from "@/types/vacancy.type";
import { useRequestQuery } from "@/utilities/query.util";
import { rest } from "@/utilities/rest.util";

export const getVacancyQuery = (data: IVacancyListRequest) =>
  useRequestQuery<IVacancyResponse[]>({
    url: rest.v1.vacancy.list,
    method: "GET",
    data,
  });

export const getVacancyBoardQuery = () =>
  useRequestQuery<TVacancyBoardResponse>({
    url: rest.v1.vacancy.board,
    method: "GET",
    mock: vacancyBoard,
  });
