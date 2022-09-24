import { ErrorResponse, Hero, SuccessResponse } from "../types";
import axios from "./axios";

type SeachResponse = SuccessResponse<Hero[]> | ErrorResponse<string>;

export const getSeach = (query: string, controller?: AbortController) => {
  return axios.get<SeachResponse>(`/search/${query}`, {
    signal: controller?.signal,
  });
};
