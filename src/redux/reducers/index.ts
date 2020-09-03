import { combineReducers } from "redux";
import { IDefault, rootDefaultReducer } from "./default";
import { IUser, rootUserReducer } from "./user";
import { IRSites, rootSiteReducer } from "./sites";
import { IRShortner, rootShortnerReducer } from "./shortner";
import { rootInsightsReducer, IRInsights } from "./insights";
import { ISites } from "../actions/sites";
import { IApp } from "../actions/app";
import { rootAppReducer, IRApps } from "./app";
import { IRProviders, rootProviderReducer } from "./providers";

// Combine all reducers
const rootReducer = combineReducers({
  default: rootDefaultReducer,
  sites: rootSiteReducer,
  user: rootUserReducer,
  shortner: rootShortnerReducer,
  insights: rootInsightsReducer,
  app: rootAppReducer,
  provider: rootProviderReducer
});

// Combine all schemas
export interface RootSchema {
  default: IDefault;
  sites: IRSites;
  user: IUser;
  shortner: IRShortner;
  insights: IRInsights;
  app: IRApps,
  provider: IRProviders
}

export default rootReducer;
