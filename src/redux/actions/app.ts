import { createAction } from ".";
import { IAPIError } from "../../schema";

export const appConst = {
  GET_APPS: "GET_APPS",
  CREATE_APP: "CREATE_APP",
};

export interface IApp extends IAPIError {
  customerid: string;
  appID: string;
  appName: string;
  Customeremailid: string;

  Created_date: string;
  updated_date: string;
}

export const getAppsAction = createAction<IApp[]>(appConst.GET_APPS);

export interface IAddAppArgs {
  customerId: string;
}
export const addAppAction = createAction<IApp, IAddAppArgs>(
  appConst.CREATE_APP
);
