import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Dispatch } from "redux";
import { Message } from "semantic-ui-react";
import {
  INetwork,
  updateNetworkAction,
  IAppState,
  appStateAction,
} from "../../redux/actions/default";
// import amplitude from "../../services/amplitude";
import {
  getProfileAction,
  IGetProfile,
  IGetProfileArgs,
} from "../../redux/actions/user";
import { RootSchema } from "../../redux/reducers";
import Routes, { FALLBACK } from "../../routes";
import { getCookie } from "../../utils/urls";
import Navigation from "../Navigation";
import Footer from "../Navigation/footer";
import "./app.scss";
import { getInstallationCode } from "../../utils";

export interface AppProps extends RouteComponentProps {
  profile: IGetProfile;
  getProfile: (args: IGetProfileArgs) => void;
  network: INetwork;
  updateNetwork: (args: INetwork) => void;
  appState: IAppState;
  updateApp: (args: IAppState) => void;
}

class App extends React.Component<AppProps> {
  private reloadOnConnection = false;

  constructor(props: AppProps) {
    super(props);
    const { location } = props;
    if (new URLSearchParams(location.search).get("view") === "cms") {
      props.updateApp({ isCMSView: true });
    }
  }
  componentDidMount() {
    this.reloadOnConnection = navigator.onLine === false;

    const token = getCookie("accessToken");
    if (navigator.onLine && token) {
      this.props.getProfile({ token });
    }

    const { updateNetwork } = this.props;
    window.ononline = () => {
      if (this.reloadOnConnection) {
        return window.location.reload();
      }
      updateNetwork({ connected: true });
    };
    window.onoffline = () => {
      updateNetwork({ connected: false });
    };
  }

  componentDidUpdate(pProps: AppProps) {
    if (pProps.profile.state === "loading") {
      const { profile } = this.props;
      if (profile.state === "error") {
        toast.error(profile.error || "Session expired. Please login again!");
        const redirect = window.location.pathname + window.location.search;
        this.props.history.push(`/logout?redirect=${redirect}`);
      } else if (profile.state === "success") {
        window.parent.postMessage(
          { code: getInstallationCode(profile.Uid) },
          "*"
        );

        // amplitude.setUserId(profile.Uid);
        // if (profile.Email) {
        //   amplitude.setUserProperties({
        //     email: profile.Email[0].Value,
        //   });
        // }
      }
    }
  }

  render() {
    const hidePaths = [
      "/",
      "/login",
      "/signup",
      "/verification",
      "/forgotpassword",
      "/resetpassword",
      "/site/new",
      "/site/configure",
    ];

    const {
      profile,
      network,
      appState: { isCMSView },
    } = this.props;

    return (
      <React.Fragment>
        {!network.connected && (
          <Message
            error
            compact
            header="Internet not connected!"
            className="msg-no-network"
          />
        )}
        {!this.reloadOnConnection ? (
          <div className="main">
            {profile.state === "loading" ? (
              FALLBACK
            ) : (
              <React.Fragment>
                <Navigation isCMSView={isCMSView} hidePaths={hidePaths}>
                  <Routes isCMSView={isCMSView} />
                </Navigation>
                <Footer isCMSView={isCMSView} hidePaths={hidePaths} />
              </React.Fragment>
            )}
          </div>
        ) : null}
        <ToastContainer />
      </React.Fragment>
    );
  }
}

const mapState = (state: RootSchema) => {
  return {
    profile: state.user.profile,
    network: state.default.network,
    appState: state.default.appState,
  };
};
const mapDispath = (dispatch: Dispatch) => {
  return {
    getProfile: (args: IGetProfileArgs) =>
      dispatch(getProfileAction.dispatch(args)),
    updateNetwork: (args: INetwork) =>
      dispatch(updateNetworkAction.success(args)),
    updateApp: (args: IAppState) => dispatch(appStateAction.success(args)),
  };
};
export default connect(mapState, mapDispath)(withRouter(App));
