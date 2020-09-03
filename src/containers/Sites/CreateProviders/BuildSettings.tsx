import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Form, Input, Button, Dropdown } from "semantic-ui-react";
import { RootSchema } from "../../../redux/reducers";
import { capitalizeFirst } from "../../../utils";
import { toast } from "react-toastify";
import Http from "../../../services/http";
import { addAppAction, IApp } from "../../../redux/actions/app";
import { IProfile } from "../../../redux/actions/user";
import {
  deployRepoAction,
  IDeployRepoArgs,
  IDeployRepo,
} from "../../../redux/actions/providers";
import { RepositoriesSchema } from "./PickRepo";

export interface BuildSettingProps extends RouteComponentProps {
  //i18n: LanguageSchema;
  nextStep: (number?: number) => void;
  accessToken: string;
  repoInfo: RepositoriesSchema;
  createAppAction: (customerId) => void;
  profileData: IProfile;
  appData: IApp;
  deployRepoAction: (args: IDeployRepoArgs) => void;
  deployRepoData: IDeployRepo;
}
interface BrancheSchema {
  name: string;
  protected: boolean;
  commit: {
    sha: string;
  };
}
export interface BuildSettingState {
  branches: BrancheSchema[];
  isLoading: boolean;
  selectedBranch: string;
  buildCmd: string;
  publishDir: string;
}

const defaultFormState: BuildSettingState = {
  branches: [],
  isLoading: false,
  selectedBranch: "",
  buildCmd: "",
  publishDir: "",
};

class BuildSetting extends React.Component<
  BuildSettingProps,
  BuildSettingState
> {
  constructor(props: BuildSettingProps) {
    super(props);
    this.state = defaultFormState;
  }
  componentDidMount = () => {
    const { accessToken, repoInfo } = this.props;

    if (accessToken) {
      this.setState({ isLoading: true }, () => {
        const _http = new Http({
          endpoint: "https://api.github.com/",
          headers: {
            Accept: "application/vnd.github.machine-man-preview+json",
            Authorization: "token " + this.props.accessToken,
          },
          contentType: true,
        });
        _http
          .get("repos/" + repoInfo.full_name + "/branches", {
            page: 1,
            per_page: 100,
          })
          .then(branchesInfo => {
            console.log(branchesInfo);
            if (branchesInfo) {
              this.setState({ branches: branchesInfo, isLoading: false });
            }
          })
          .catch(err => {
            this.setState({ isLoading: false });
            toast.error(err.message);
          });
      });
    } else {
      this.props.nextStep(1);
    }
  };
  componentDidUpdate(pProps) {
    const { repoInfo } = this.props;
    if (
      pProps.appData.state === "loading" &&
      this.props.appData.state !== "loading"
    ) {
      const appData = this.props.appData;

      if (appData.state === "success") {
        let commitId = "";
        this.state.branches.filter(b => {
          if (b.name == "dev") {
            commitId = b.commit.sha;
          }
        });
        //Upload zip file with settings
        const data: IDeployRepoArgs = {
          AppID: appData.appID,
          TitanAppName: appData.appName,
          Github: {
            id: repoInfo.id,
            node_id: repoInfo.node_id,
            commit_id: commitId,
            full_name: repoInfo.full_name,
            name: repoInfo.name,
            private: repoInfo.private,
            token: this.props.accessToken,
            buildSettings: {
              BuildCommand: this.state.buildCmd,
              PublishDirectory: this.state.publishDir,
              Branch: this.state.selectedBranch,
            },
          },
        };
        this.props.deployRepoAction(data);
      } else {
        toast.error("Unable to create app");
      }
    }
  }
  private _deploySite = () => {
    const { buildCmd, publishDir, selectedBranch } = this.state;
    const { profileData } = this.props;
    //Create titan site
    //Create Titan Customer
    // Deploy Site
    this.props.createAppAction(profileData.Uid);
  };

  render() {
    const { repoInfo } = this.props;
    const {
      isLoading,
      branches,
      selectedBranch,
      buildCmd,
      publishDir,
    } = this.state;
    return isLoading ? (
      <Form Loading />
    ) : (
      <React.Fragment>
        <Form>
          <div className="mt-5 sub-header mb-3">
            <h4>Deploy settings for {repoInfo.name}</h4>
            <p>Deploys your site with these settings.</p>
          </div>
          <div>
            <Form.Select
              required
              options={branches.map(({ name }, key) => ({
                key,
                name,
                text: capitalizeFirst(name),
              }))}
              placeholder="Branch to Deploy"
              search
              searchInput={{ id: "fsc-button" }}
              value={selectedBranch}
              onChange={(e, d) => {
                console.log(d.value);
                if (typeof d.value === "string") {
                  this.setState({ selectedBranch: d.value });
                }
              }}
            />

            <h4>Build Settings</h4>
            <Form.Input
              value={buildCmd}
              onChange={event => {
                this.setState({ buildCmd: event.target.value });
              }}
            />
            <Form.Input
              value={publishDir}
              onChange={event => {
                this.setState({ publishDir: event.target.value });
              }}
            />
            <Form.Button
              id="fbc-add"
              primary
              content="Deploy site"
              onClick={() => {
                this._deploySite();
              }}
            />
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

const mapState = (state: RootSchema) => {
  return {
    accessToken: state.provider.githubToken.access_token,
    profileData: state.user.profile,
    appData: state.app.added,
    deployRepoData: state.provider.deployRepo,
  };
};

const mapDispatch = dispatch => {
  return {
    createAppAction: customerId =>
      dispatch(addAppAction.dispatch({ customerId })),
    deployRepoAction: data => dispatch(deployRepoAction.dispatch(data)),
  };
};

export default connect(mapState, mapDispatch)(withRouter(BuildSetting));
