import type { TAllRoutes } from "@/types/global.type";
import type {
  HttpMethod,
  IRequestPayloads,
  IResponsePayloads,
} from "@/utilities/request.util";
import request from "@/utilities/request.util";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { useCallback } from "react";

export type TQueryKey = [`${HttpMethod}:${TAllRoutes}`, ...unknown[]];

export function useRequestMutate<Res extends object = {}, Req = unknown>(
  props: Omit<IRequestPayloads<Req>, "method"> & {
    method: Exclude<HttpMethod, "GET">;
  },
  invalidateRoute?: TAllRoutes
) {
  const key = createKey(props.method, props.url);
  const getKey = createKey("GET", removeLastPart(props.url), invalidateRoute);
  const queryClient = useQueryClient();

  const mutation = useMutation<IResponsePayloads<Res>, Error, Req>({
    mutationFn: (data) => request<Res>({ ...props, data }),
    mutationKey: key,
  });

  const mutate = useCallback(
    (data: Req, options?: Parameters<typeof mutation.mutate>[1]) => {
      mutation.mutate(data, {
        ...options,
        onSuccess: (res, variables, context) => {
          queryClient.invalidateQueries({ queryKey: getKey });
          options?.onSuccess?.(res, variables, context);
        },
        onError: (error, variables, context) => {
          queryClient.invalidateQueries({ queryKey: getKey });
          options?.onError?.(error, variables, context);
        },
        onSettled: (data, error, variables, context) => {
          options?.onSettled?.(data, error, variables, context);
        },
      });
    },
    []
  );

  return {
    ...mutation,
    mutate,
    mutateAsync: (
      data: Req,
      options?: Parameters<typeof mutation.mutateAsync>[1]
    ) => mutation.mutateAsync(data, options),
  };
}

export function useRequestQuery<Res extends object = {}, Req = unknown>(
  props: Exclude<IRequestPayloads<Req>, "method"> & { method: "GET" },
  options?: Omit<
    UseQueryOptions<IResponsePayloads<Res>, Error>,
    "queryFn" | "queryKey"
  >
) {
  const key = [
    `${props.method}:${props.url}`,
    JSON.stringify(props?.data ?? {}),
  ];
  return useQuery({
    queryFn: () => request<Res>(props),
    queryKey: key,
    placeholderData: keepPreviousData,
    ...options,
  });
}

function createKey(
  method: HttpMethod,
  url: TAllRoutes,
  defaultKey?: TAllRoutes
) {
  return [`${method}:${defaultKey || url}`];
}

function removeLastPart(url: TAllRoutes, divider: string = "/") {
  return url.split(divider).slice(0, -1).join(divider) as TAllRoutes;
}
