import { userProfile } from "@/services/mocks/user.mock";
import type { IUserResponse } from "@/types/user.type";
import { useRequestQuery } from "@/utilities/query.util";
import { rest } from "@/utilities/rest.util";

export const getUserProfileQuery = () =>
  useRequestQuery<IUserResponse>({
    url: rest.v1.user.profile,
    method: "GET",
    mock: userProfile,
  });
