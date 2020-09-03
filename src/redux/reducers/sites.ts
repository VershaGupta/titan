import cloneDeep from "lodash/cloneDeep";
import { combineReducers } from "redux";
import { IAction } from "../../schema";
import { ISites, SitesConst, IAllSites } from "../actions/sites";

const sitesReducer = (
  state=  {},
  action: IAction<ISites>
) => {
  const { type, payload } = action;

  // Sites fetched
  if (type === SitesConst.GET_SITES) {
    switch (payload.state) {
      case "loading":
        return { ...state, state: "loading" };
      case "error":
        return { ...state, state: "error", error: payload.error };
      case "success":
        return {
          ...state,
          state: "success",
          data: payload,
        };
      default:
        return state;
    }
  }
  else return state;
};

const allSitesReducer = (
  state =  {},
  action: IAction<IAllSites>
) => {
  const { type, payload } = action;
   //console.log(payload)
  // Sites fetched
  if (type === SitesConst.GET_ALL_SITES) {
    
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

const allUploadSitesReducer = (
  state =  {},
  action: IAction<IAllSites>
) => {
  const { type, payload } = action;
   //console.log(payload)
  // Sites fetched
  if (type === SitesConst.GET_ALL_UPLOAD_SITES) {
    
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
const addSiteReducer = (
  state = {},
  action: IAction<ISites>
) => {
  const { type, payload } = action;
  if (type === SitesConst.ADD_SITES) {
    switch (payload.state) {
      case "loading":
        return { ...state, state: "loading" };
      case "error":
        return { ...state, state: "error", error: payload.error };
      case "success":
        return { ...state, state: "success", ...payload };
      default:
        return state;
    }
  } else return state;
};


const updateSiteReducer = (
  state = {},
  action: IAction<ISites>
) => {
  const { type, payload } = action;
  if (type === SitesConst.UPDATE_SITE) {
    switch (payload.state) {
      case "loading":
        return { ...state, state: "loading" };
      case "error":
        return { ...state, state: "error", error: payload.error };
      case "success":
        return { ...state, state: "success", ...payload };
      default:
        return state;
    }
  } else return state;
};
/**
 * Root reducers and schema
 */
export const rootSiteReducer = combineReducers({
  all: allSitesReducer,
  added: addSiteReducer,
  updated: updateSiteReducer,
  allUploaded:allUploadSitesReducer
});

export interface IRSites {
  all: IAllSites;
  added: ISites;
  updated: ISites;
  allUploaded: IAllSites
}
