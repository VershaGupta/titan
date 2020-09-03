import { all } from "redux-saga/effects";
import { watchGetProfile } from "./user";
import { watchGetEngagement } from "./insights";
import { watchAddSite, watchGetSites, watchGetAllSites, watchUpdateSite, watchGetAllUploadedSites } from "./sites";
import { watchCreateApp } from "./app";
import { watchGetGitHubToken, watchDeployRepo } from "./providers";


function* rootSaga() {
  yield all([

    // Widgets
    watchGetSites(),
    watchAddSite(),
    watchGetAllSites(),
    watchUpdateSite(),
    watchGetAllUploadedSites(),
    // User
    watchGetProfile(),
    watchCreateApp(),

    // Insights
    watchGetGitHubToken(),
    watchDeployRepo()
  ]);
}

export default rootSaga;
