// Global Type Overrides
declare global {
  interface Window {
    LoginRadiusV2: any;
  }
}

/**
 * `IObject` represents a javascript object schema with generic value
 */
export interface IObject<Value = any> {
  [key: string]: Value;
}

/**
 * `IAction` {type: string, payload: Payload}
 */
export interface IAction<Payload = any> {
  type: string;
  payload: Payload;
}

/**
 * `ISideEffects` represents the side effect schema for an action
 * with `state`, and `error` parameters
 */
export interface ISideEffects {
  state?: "loading" | "success" | "error";
  error?: string;
}

/**
 * `IAPIError` is the error schema for backend APIS
 */
export interface IAPIError extends ISideEffects {
  type?: string;
  error?: string;
}

/**
 * `ILRError` is the error schema for backend APIS
 */
export interface ILRError extends ISideEffects {
  Description?: string;
  ErrorCode?: number;
  Message?: string;
  IsProviderError?: boolean;
  ProviderErrorResponse?: null;
}

/**
 * `IForm` represents the schema for a form
 */
export type IFormErr =
  | {
      header: string;
      msg: string;
    }
  | undefined;

  export interface IShortnerError extends ISideEffects {
    Description?: string;
    Message?: string;
  }