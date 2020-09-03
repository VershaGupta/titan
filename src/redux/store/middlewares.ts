import { Middleware } from "redux";

export const noNetworkMiddleware: (actionType: string) => Middleware = (
  type
) => (store) => (next) => (action) => {
  try {
    if (store.getState().default.network.connected || action.type === type) {
      next(action);
    }
  } catch (e) {
    console.error("NoNetworkMiddleware - Action dispatch failed!", e.message);
  }
};
