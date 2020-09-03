import { ISideEffects } from "../../schema";

export interface IForm<T = any> {
  value: T;
  err?: string;
}
interface IDispatchPayload<T = any> {
  type: string;
  payload: ISideEffects & T;
}

export function createAction<Data = any, Args = any>(type: string) {
  return {
    dispatch: (args: Args) => ({
      type,
      payload: args,
    }),

    loading: (args?: any): IDispatchPayload => ({
      type,
      payload: { state: "loading", ...(args || {}) },
    }),

    success: (data: Data): IDispatchPayload<Data> => ({
      type,
      payload: { ...data, state: "success" },
    }),

    error: (message: string): IDispatchPayload => ({
      type,
      payload: { state: "error", error: message },
    }),
  };
}
