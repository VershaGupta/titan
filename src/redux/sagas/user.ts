import { take, put, call } from "redux-saga/effects";

import { IAction } from "../../schema";
import {
  IGetProfileArgs,
  userConst,
  getProfileAction,
  IGetProfile,
} from "../actions/user";
import Http from "../../services/http";
import config from "../../config";

// Workers
function* handleGetProfile(args: IGetProfileArgs) {
  try {
    yield put(getProfileAction.loading());

    const resp: IGetProfile = yield new Http({
      endpoint: config.idp_endpoint,
    }).get("/identity/v2/auth/account", {
      apiKey: config.idp_apikey,
      access_token: args.token,
    });

    if (resp.ErrorCode) {
      throw new Error(resp.Message);
    }

    yield put(getProfileAction.success(resp));
  } catch (e) {
    yield put(getProfileAction.error(e.message));
  }
}

// Watchers
export function* watchGetProfile() {
  while (true) {
    const { payload }: IAction<IGetProfileArgs> = yield take(
      userConst.FETCH_PROFILE
    );
    if (!(payload as any).state) {
      yield call(handleGetProfile, payload);
    }
  }
}
