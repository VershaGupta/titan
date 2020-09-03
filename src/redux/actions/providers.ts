import { createAction } from ".";
import { IAPIError } from "../../schema";

export const ProviderConst = {
  GET_GITHUB_TOKEN: "GET_GITHUB_TOKEN",
  DEPLOY_REPO: "DEPLOY_REPO",
};

export interface IGithubToken extends IAPIError {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}
export interface IDeployRepo extends IAPIError {}
export interface IBuildSetting {
  BaseDirectory?: string;
  PublishDirectory?: string;
  BuildCommand?: string;
  Branch?: string;
}
export interface IProviderRepoData {
  id: string;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  buildSettings: IBuildSetting;
  token: string;
  commit_id: string;
}
export interface IDeployRepoArgs {
  AppID: string;
  TitanAppName: string;
  // DateCreated:string,
  // DateUpdated:string,
  Github?: IProviderRepoData;
  Gitlab?: IProviderRepoData;
  Bitbucket?: IProviderRepoData;
}
export interface IGitHubArgs {
  code: string;
  state: string;
}
export const getGitHubTokenAction = createAction<IGithubToken, IGitHubArgs>(
  ProviderConst.GET_GITHUB_TOKEN
);

export const deployRepoAction = createAction<IDeployRepo, IDeployRepoArgs>(
  ProviderConst.DEPLOY_REPO
);
