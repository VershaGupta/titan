import { take, put, call } from "redux-saga/effects";
import { IAction } from "../../schema";
import { __Http as http } from "../../services/http";
import {
  getSitesAction,
  ISites,
  IAddSiteArgs,
  addSiteAction,
  SitesConst,
  IAllSites,
  getAllSitesAction,
  updateSiteAction,
  getAllUploadSitesAction,
} from "../actions/sites";

// Workers
function* handleGetSites(args) {
  try {
    yield put(getSitesAction.loading());

    const resp: ISites = yield http.get("/api/v1/Sites/", {
      user_id: args.user_id,
    });

    if (resp.error) {
      throw new Error(resp.error);
    }

    yield put(getSitesAction.success(resp));
  } catch (e) {
    yield put(getSitesAction.error(e.message));
  }
}

function* handleGetAllUploadedSites(args) {
  try {
    yield put(getAllUploadSitesAction.loading());

    let resp = yield http.get(`/uploadFile/${args.customerId}`);

    if (resp.error) {
      throw new Error(resp.error);
    }
    if (!Object.keys(resp).length) {
      resp = [];
    }

    yield put(getAllUploadSitesAction.success({ data: resp }));
  } catch (e) {
    yield put(getAllUploadSitesAction.error(e.message));
  }
}
function* handleGetAllSites(args) {
  try {
    yield put(getAllSitesAction.loading());

    let resp = yield http.get(`/templates/${args.customerId}`);

    if (resp.error) {
      throw new Error(resp.error);
    }
    if (!Object.keys(resp).length) {
      resp = [];
    }

    yield put(getAllSitesAction.success({ data: resp }));
  } catch (e) {
    yield put(getAllSitesAction.error(e.message));
  }
}

function* handleAddSite(payload: IAddSiteArgs) {
  try {
    yield put(addSiteAction.loading());

    let resp: ISites;

    resp = yield http.post(
      `/template/${payload.appId}`,
      {},
      JSON.stringify({
        CodeTemplate: payload.template,
        theme: payload.template.theme,
      })
    );

    if (resp.error) {
      throw new Error(resp.error);
    }

    yield put(addSiteAction.success(resp));
  } catch (e) {
    yield put(addSiteAction.error(e.message));
  }
}

function* handleUpdateSite(payload: IAddSiteArgs) {
  try {
    yield put(updateSiteAction.loading());

    let resp: ISites;

    resp = yield http.put(
      `/template/${payload.appId}`,
      {},
      JSON.stringify({
        CodeTemplate: payload.template,
        theme: payload.template.theme,
      })
    );

    if (resp.error) {
      throw new Error(resp.error);
    }

    yield put(updateSiteAction.success(resp));
  } catch (e) {
    yield put(updateSiteAction.error(e.message));
  }
}

// Watchers
export function* watchGetSites() {
  while (true) {
    const { payload }: IAction<ISites> = yield take(SitesConst.GET_SITES);
    yield call(handleGetSites, payload);
  }
}

export function* watchGetAllSites() {
  while (true) {
    const { payload }: IAction<IAllSites> = yield take(
      SitesConst.GET_ALL_SITES
    );
    yield call(handleGetAllSites, payload);
  }
}

export function* watchAddSite() {
  while (true) {
    const { payload }: IAction<IAddSiteArgs> = yield take(SitesConst.ADD_SITES);
    yield call(handleAddSite, payload);
  }
}

export function* watchUpdateSite() {
  while (true) {
    const { payload }: IAction<IAddSiteArgs> = yield take(
      SitesConst.UPDATE_SITE
    );
    yield call(handleUpdateSite, payload);
  }
}

export function* watchGetAllUploadedSites() {
  while (true) {
    const { payload }: IAction<IAllSites> = yield take(
      SitesConst.GET_ALL_UPLOAD_SITES
    );
    yield call(handleGetAllUploadedSites, payload);
  }
}
