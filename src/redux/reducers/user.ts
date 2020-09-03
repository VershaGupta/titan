import { IAction } from "../../schema";
import { IGetProfile, userConst } from "../actions/user";
import { combineReducers } from "redux";

const getProfileReducer = (
  state: IGetProfile | any = {},
  action: IAction<IGetProfile>
): IGetProfile => {
  const { type, payload } = action;

  if (type === userConst.FETCH_PROFILE) {
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

export const rootUserReducer = combineReducers({
  profile: getProfileReducer,
});
export interface IUser {
  profile: IGetProfile;
}
