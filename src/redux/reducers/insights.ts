import { combineReducers } from "redux";
import { IAction } from "../../schema";
import {
  IEngagement,
  IGetEngagement,
  insightsConst,
} from "../actions/insights";

const engagementReducer = (
  state: IGetEngagement = {},
  action: IAction<IGetEngagement>
): IGetEngagement => {
  const { type, payload } = action;

  if (type === insightsConst.GET_ENGAGEMENT) {
    switch (payload.state) {
      case "loading":
        return { ...state, state: "loading" };
      case "error":
        return { ...state, state: "error", error: payload.error };
      case "success":
        return {
          ...state,
          state: "success",
          data: payload.data,
        };
      default:
        return state;
    }
  }

  return state;
};

export const rootInsightsReducer = combineReducers({
  engagement: engagementReducer,
});

export interface IRInsights {
  engagement: IEngagement;
}
