import cloneDeep from "lodash/cloneDeep";
import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ConnectGitProvider from "../CreateProviders/ConnectGitProvider"
// import {
//   githubAccessTokenAction,
//   GitHubTokenSchema
// } from "../../redux/actions/authActions";
import { RootSchema } from "../../../redux/reducers";
import { Step, Segment, Icon } from "semantic-ui-react";
import { getCookie, removeCookie } from "../../../utils/urls";
import PickRepo, { RepositoriesSchema } from "./PickRepo";
import BuildSetting from "./BuildSettings"
import { getGitHubTokenAction, IGithubToken } from "../../../redux/actions/providers";
import { toast } from "react-toastify";

export interface CreateProvidersProps extends RouteComponentProps {
  githubTokenData: IGithubToken;
  getGitHubToken: (data) => void;
  // sendVerificationData: SendVerificationSchema;
}

export interface CreateProvidersState {
  currentStep: number;
  stepsInfo: Map<number, { formData: any }>;
  mode: "new" | "edit" | "addsite";
  snapshot?: any;
  prevURL?: string;
  requiredInfo: any;
  currentProvider:string
}

class CreateProviders extends React.Component<
  CreateProvidersProps,
  CreateProvidersState
> {
  constructor(props: CreateProvidersProps) {
    super(props);
    const { location, history } = this.props;
    
    const params = new URLSearchParams(location.search);
    const _code = params.get("code");
    const _state = getCookie("github-import-state")
    this._defaultState["currentProvider"] = "github";
    if(_code && _state){
        removeCookie("github-import-state");
        this.props.getGitHubToken({code: _code, state: _state}) 
    }
    this.state = { ...cloneDeep(this._defaultState), mode: "new" };
  }
  componentDidUpdate(pProps: CreateProvidersProps) {
    
    if (
      pProps.githubTokenData.state === "loading" &&
      this.props.githubTokenData.state != "loading"
    ) {
      const githubTokenData = this.props.githubTokenData;

      if (githubTokenData.state === "success") {
        this.setState({
          ...cloneDeep(this._defaultState),
          currentStep: 1,
          mode: "new"
        });
      } else {
        toast.error("Unable to get github Token . try again");
      }
    }
  }

  // Vars
  private _defaultState = {
    currentStep: 0,
    stepsInfo: new Map(),
    requiredInfo: {},
    currentProvider:""
  };

  private _resetEverything = () => {
    const { mode, prevURL, snapshot } = this.state;
    if (mode !== "new") {
      this.props.history.push(prevURL || "", { snapshot });
    } else {
      this.setState({ ...cloneDeep(this._defaultState), mode: "new" });
    }
  };

  private _nextStep = (step?: number) => {
    const state = { ...this.state };
    step = step || state.currentStep + 1;
    this.setState({
      ...state,
      currentStep: step
    });
  };

  private _prevStep = formData => {
    const state = { ...this.state };
    if (formData) state.stepsInfo.set(state.currentStep, formData);
    this.setState(prevState => ({
      ...state,
      currentStep: prevState.currentStep - 1
    }));
  };

  private _addFormData = formData => {
    const state = { ...this.state };
    if (formData) state.stepsInfo.set(state.currentStep, formData);
    this.setState({
      ...state
    });
  };

  render() {
    const { currentStep, stepsInfo, mode } = this.state;
    const {  history } = this.props;

    return (
      <React.Fragment>
                    <div>
                   <Step.Group ordered attached='top'>
    <Step active={currentStep === 0 }>
      <Step.Content>
        <Step.Title>Connect to Git provider</Step.Title>
        <Step.Description></Step.Description>
      </Step.Content>
    </Step>

    <Step active={currentStep === 1 }>
      <Step.Content>
        <Step.Title>Pick a Repo</Step.Title>
        <Step.Description></Step.Description>
      </Step.Content>
    </Step>

    <Step active={currentStep === 2 }>
      <Step.Content>
        <Step.Title>Build options, and deploy!</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
  <Segment attached>
      {currentStep === 0 && <ConnectGitProvider nextStep={()=>{
          this.setState({currentStep:1})
      }} />}
      {currentStep === 1 && <PickRepo requiredInfo ={(data)=>{
        this.setState({requiredInfo:data})
      }} nextStep={()=>{
         this.setState({currentStep:2})
      }} />}
       {currentStep === 2 && <BuildSetting repoInfo ={this.state.requiredInfo} nextStep={()=>{
         this.setState({currentStep:2})
      }} />}
      
    </Segment>
  

     </div>
      </React.Fragment>
    );
  }
}

const mapState = (state: RootSchema) => {
  return {
    // i18n: state.appState.i18n.languages,
    githubTokenData: state.provider.githubToken
    //getAppInfo: state.admin.getAppById,
    // sendVerificationData: state.admin.sendVerification
  };
};
const mapDispatch = dispatch => {
  return {
    getGitHubToken: data => dispatch(getGitHubTokenAction.dispatch(data))
    // SendVerification: (args: SendVerificationArgs) =>
    //   dispatch(sendVerificationAction(args))
  };
};
export default connect(
    mapState,
  mapDispatch
)(withRouter(CreateProviders));
