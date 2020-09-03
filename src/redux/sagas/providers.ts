import { take, put, call } from "redux-saga/effects";
import { IAction } from "../../schema";
import { __Http as http } from "../../services/http";
import { IGithubToken, ProviderConst, getGitHubTokenAction, IDeployRepo, deployRepoAction, IDeployRepoArgs } from "../actions/providers";


// Workers
function* handleGetGitHubToken(args) {
  try {
    yield put(getGitHubTokenAction.loading());

    const resp: IGithubToken = yield http.post("/accesstoken", {
      
    }, JSON.stringify({code:args.code, state:args.state}));

    if (resp.error) {
      throw new Error(resp.error);
    }

    yield put(getGitHubTokenAction.success(resp));
  } catch (e) {
    yield put(getGitHubTokenAction.error(e.message));
  }
}

function* handleDeployRepo(args:IDeployRepoArgs){
  try {
    yield put(deployRepoAction.loading());

    const resp: IDeployRepo = yield http.post(`/repo/${args.AppID}`, {
      
    }, JSON.stringify(args));

    if (resp.error) {
      throw new Error(resp.error);
    }

    yield put(deployRepoAction.success(resp));
  } catch (e) {
    yield put(deployRepoAction.error(e.message));
  }
}

// Watchers
export function* watchGetGitHubToken() {
  while (true) {
    const { payload }: IAction<IGithubToken> = yield take(
      ProviderConst.GET_GITHUB_TOKEN
    );
    yield call(handleGetGitHubToken, payload);
  }
}

export function* watchDeployRepo() {
  while (true) {
    const { payload }: IAction<IDeployRepoArgs> = yield take(
      ProviderConst.DEPLOY_REPO
    );
    yield call(handleDeployRepo, payload);
  }
}

