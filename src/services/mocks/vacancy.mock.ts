import type {
  IVacancyResponse,
  TVacancyBoardResponse,
} from "@/types/vacancy.type";
import type { IResponsePayloads } from "@/utilities/request.util";

export const vacancyBoard: IResponsePayloads<TVacancyBoardResponse> = {
  status: 200,
  message: "Request ok",
  data: {
    Applied: [
      { id: 2, name: "Junior Back-end Developer", company: "ShieldTag" },
    ],
    Interview: [],
    Test: [
      { id: 4, name: "React .js Developer", company: "Krenovator" },
      { id: 3, name: "Fullstack Developer", company: "Deptech" },
    ],
    Accepted: [],
    Rejected: [{ id: 1, name: "Back-end Developer", company: "liniMasa" }],
  },
};

export const vacancyList: IResponsePayloads<IVacancyResponse[]> = {
  status: 200,
  message: "Request ok",
  data: [
    {
      id: 1,
      name: "Back-end Developer",
      company: "liniMuda",
      location: "Jakarta Selatan",
      type: "Fulltime",
      arrangement: "Remote/WFH",
      description: "Min 1 year experience in Node.js API development",
      status: "Rejected",
      createdAt: "2025-07-26 22:47:00",
      updatedAt: "2025-07-26 22:47:00",
    },
    {
      id: 2,
      name: "Junior Back-end Developer",
      company: "Shieldtag",
      location: "Jakarta Raya",
      type: "Fulltime",
      arrangement: "Remote/WFH",
      description:
        "Build and maintain backend services using Node.js and Express",
      status: "Applied",
      createdAt: "2025-07-26 22:47:00",
      updatedAt: "2025-07-26 22:47:00",
    },
  ],
  pagination: { last_page: 1, page_size: 10, total: 5000 },
};
