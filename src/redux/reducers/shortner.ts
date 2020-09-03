import { IAction } from "../../schema";
import {
  IGetShortenedUrls,
  IShortenUrl,
  shortnerConst
} from "../actions/shortner";
import { combineReducers } from "redux";
import cloneDeep from "lodash/cloneDeep";

const getShortenedUrlsReducer = (
  state: IGetShortenedUrls = {},
  action: IAction<IShortenUrl>
): IGetShortenedUrls => {
  const { type, payload } = action;

  if (type === shortnerConst.FETCH_SHORTENED_URL) {
    switch (payload.state) {
      case "loading":
        return { ...state, state: "loading" };
      case "error":
        return { ...state, state: "error", error: payload.error };
      case "success":
        return {
          ...state,
          state: "success",
          data: (payload as IGetShortenedUrls).data,
        };
      default:
        return state;
    }
  }
  else if (type === shortnerConst.SHORTEN_URL && payload.state === "success") {
    return {
      ...state,
      state: "success",
      data: [payload].concat(cloneDeep(state.data) || [])
    };
  }
  return state;
};

const shortenUrlReducer = (
  state: IShortenUrl = {},
  action: IAction<IShortenUrl>
): IShortenUrl => {
  const { type, payload } = action;

 if (type === shortnerConst.SHORTEN_URL) {
    const response = payload as IShortenUrl;
    switch (payload.state) {
      case "loading":
        return { ...state, state: "loading" };
      case "error":
        return { ...state, state: "error", error: response.error };
      case "success":
        return response;
      default:
        return state;
    }
  }

  return state;
};


export const rootShortnerReducer = combineReducers({
  shortenedUrls: getShortenedUrlsReducer,
  shortenUrl: shortenUrlReducer
});

export interface IRShortner {
  shortenedUrls: IGetShortenedUrls;
  shortenUrl: IShortenUrl;
}