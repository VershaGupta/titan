import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { setCookie } from "../../../utils/urls";
import { RootSchema } from "../../../redux/reducers";
import { Button } from "semantic-ui-react";
import config from "../../../config";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);

export interface ConnectGitProviderProps {
  //i18n: LanguageSchema;
  nextStep: () => void;
}

export interface ConnectGitProviderState {}

const defaultFormState: ConnectGitProviderState = {};

class ConnectGitProvider extends React.Component<
  ConnectGitProviderProps,
  ConnectGitProviderState
> {
  constructor(props: ConnectGitProviderProps) {
    super(props);
    this.state = defaultFormState;
    //const { location, history } = this.props;
    //  console.log(history);
  }
  componentDidUpdate(prevProps) {
    // const { location, history } = this.props;
    // console.log(location);
  }
  _onNextClick = () => {
    //  const { location, history } = this.props;
    const _state = Math.random()
      .toString(36)
      .substring(7);
    setCookie("github-import-state", _state);
    window.location.href =
      "https://github.com/login?client_id=" +
      config.github_clientid +
      "&return_to=/login/oauth/authorize?client_id=" +
      config.github_clientid +
      "&scope=read%3Auser%2Cuser%3Aemail&state=" +
      _state;
  };
  render() {
    return (
      <React.Fragment>
        <div className="mt-5 sub-header mb-3">
          <h4>Continuous Deployment</h4>
          <p>Deploy content to Git providers</p>
        </div>
        <div>
          <Button content="Connect to Github" onClick={this._onNextClick} />
        </div>
      </React.Fragment>
    );
  }
}

export default ConnectGitProvider;
