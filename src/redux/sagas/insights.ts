import { call, put, take } from "redux-saga/effects";
import { IAction } from "../../schema";
import { __Http as http } from "../../services/http";
import {
  getEngagementAction,
  IGetEngagement,
  IGetEngagementArgs,
  insightsConst,
} from "../actions/insights";

function* getEngagementHandler(args: IGetEngagementArgs) {
  try {
    yield put(getEngagementAction.loading());

    const resp: IGetEngagement = yield http.get("/insights/engagement", args);

    if (resp.type) {
      throw new Error(resp.error);
    }

    yield put(getEngagementAction.success(resp));
  } catch (e) {
    yield put(getEngagementAction.error(e.message));
  }
}

export function* watchGetEngagement() {
  while (true) {
    const { payload }: IAction<IGetEngagementArgs> = yield take(
      insightsConst.GET_ENGAGEMENT
    );
    yield call(getEngagementHandler, payload);
  }
}
