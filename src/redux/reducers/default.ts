import { INetwork, defaultConst, IAppState } from "../actions/default";
import { IAction } from "../../schema";
import { combineReducers } from "redux";

export const networkReducer = (
  state: INetwork = { connected: navigator.onLine },
  action: IAction<INetwork>
) => {
  if (action.type === defaultConst.NETWORK_UPDATE) {
    return { ...state, ...action.payload };
  }
  return state;
};

export const appStateReducer = (
  state: IAppState = {},
  action: IAction<IAppState>
) => {
  if (action.type === defaultConst.APP_STATE) {
    return { ...state, ...action.payload };
  }
  return state;
};

export const rootDefaultReducer = combineReducers({
  network: networkReducer,
  appState: appStateReducer,
});

export interface IDefault {
  network: INetwork;
  appState: IAppState;
}
