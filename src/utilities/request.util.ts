import { sleep } from "@/lib/utils";
import type { TAllRoutes } from "@/types/global.type";
import { baseUrl } from "@/utilities/rest.util";
import axios, {
  AxiosError,
  type RawAxiosRequestHeaders,
  type ResponseType,
} from "axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IRequestPayloads<T> {
  url: TAllRoutes;
  method: HttpMethod;
  headers?: RawAxiosRequestHeaders;
  data?: T;
  bodyType?: "raw" | "formData";
  responseType?: ResponseType;
  mock?: IResponsePayloads;
}

export interface IPagination {
  last_page: number;
  page_size: number;
  total: number;
}

export interface IResponsePayloads<T = unknown> {
  status: number;
  message: string;
  data: T;
  pagination?: IPagination;
}

export default async function request<Res extends object = {}, Req = unknown>({
  url,
  method = "GET",
  headers = {},
  bodyType = "raw",
  data,
  mock,
}: IRequestPayloads<Req>): Promise<IResponsePayloads<Res>> {
  if (mock) {
    console.info(`${method}:${url}`, JSON.stringify(data || {}));
    await sleep(300);
    return mock as IResponsePayloads<Res>;
  }

  try {
    const response = await axios.request<IResponsePayloads<Res>>({
      url: `${baseUrl}/${url}`,
      method,
      headers: {
        "Content-Type":
          bodyType === "formData" ? "multipart/form-data" : "application/json",
        ...headers,
      },
      ...(method === "GET" ? { params: data } : { data }),
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IResponsePayloads>;
    throw axiosError.response?.data ?? error;
  }
}
