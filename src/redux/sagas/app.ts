import { take, put, call } from "redux-saga/effects";
import { IAction } from "../../schema";
import { __Http as http } from "../../services/http";
import { IApp, appConst, IAddAppArgs, addAppAction } from "../actions/app";

// Workers
const getSiteRandomName = () => {
  return (
    "titan-dev-" +
    Math.random()
      .toString(36)
      .slice(2)
  );
};

function* handleAddSite(payload: IAddAppArgs) {
  try {
    yield put(addAppAction.loading());

    let resp: IApp;

      resp = yield http.post(
        `/customer/${payload.customerId}/app`,
        {},
        JSON.stringify({
          "appName": getSiteRandomName()
        })
      );
    

    if (resp.error) {
      throw new Error(resp.error);
    }

    yield put(
      addAppAction.success(resp)
    );
  } catch (e) {
    yield put(addAppAction.error(e.message));
  }
}



// Watchers



export function* watchCreateApp() {
  while (true) {
    const { payload }: IAction<IAddAppArgs> = yield take(
      appConst.CREATE_APP
    );
    yield call(handleAddSite, payload);
  }
}
