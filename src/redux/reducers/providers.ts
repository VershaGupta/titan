import { IAction } from "../../schema";
import { IGithubToken, ProviderConst, IDeployRepo } from "../actions/providers";
import { combineReducers } from "redux";

const getGithubTokenReducer = (
    state=  {},
    action: IAction<IGithubToken>
  ) => {
    const { type, payload } = action;
  
    // Sites fetched
    if (type === ProviderConst.GET_GITHUB_TOKEN) {
      switch (payload.state) {
        case "loading":
          return { ...state, state: "loading" };
        case "error":
          return { ...state, state: "error", error: payload.error };
        case "success":
          return {
            ...state,
            state: "success",
            ...payload,
          };
        default:
          return state;
      }
    }
    else return state;
  };
  

  const deploRepoReducer = (
    state=  {},
    action: IAction<IDeployRepo>
  ) => {
    const { type, payload } = action;
  
    // Sites fetched
    if (type === ProviderConst.DEPLOY_REPO) {
      switch (payload.state) {
        case "loading":
          return { ...state, state: "loading" };
        case "error":
          return { ...state, state: "error", error: payload.error };
        case "success":
          return {
            ...state,
            state: "success",
            ...payload,
          };
        default:
          return state;
      }
    }
    else return state;
  };
  /**
 * Root reducers and schema
 */
export const rootProviderReducer = combineReducers({
    githubToken: getGithubTokenReducer,
    deployRepo: deploRepoReducer
  });
  
  export interface IRProviders {
    githubToken: IGithubToken;
    deployRepo: IDeployRepo;
  }