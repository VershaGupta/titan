/**
 * This file contains default App actions
 */

import { createAction } from ".";

export const defaultConst = {
  NETWORK_UPDATE: "NETWORK_UPDATE",
  APP_STATE: "APP_STATE",
};

export interface INetwork {
  connected?: boolean;
}
export const updateNetworkAction = createAction<INetwork, INetwork>(
  defaultConst.NETWORK_UPDATE
);

export interface IAppState {
  isCMSView?: boolean;
}
export const appStateAction = createAction<IAppState, IAppState>(
  defaultConst.APP_STATE
);
