import type { IUserResponse } from "@/types/user.type";
import type { IResponsePayloads } from "@/utilities/request.util";

export const userProfile: IResponsePayloads<IUserResponse> = {
  status: 200,
  message: "Request ok",
  data: {
    name: "Rudianto Sihombing",
    avatar: "https://picsum.photos/200/300",
    email: "rudi97278@gmail.com",
  },
};
