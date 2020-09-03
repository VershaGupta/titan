import cloneDeep from "lodash/cloneDeep";
import { combineReducers } from "redux";
import { IAction } from "../../schema";
import { IApp, appConst } from "../actions/app";



const addAppReducer = (
  state = {},
  action: IAction<IApp>
) => {
  const { type, payload } = action;
  if (type === appConst.CREATE_APP) {
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
export const rootAppReducer = combineReducers({
  added: addAppReducer,
});

export interface IRApps {
  added: IApp;
}
