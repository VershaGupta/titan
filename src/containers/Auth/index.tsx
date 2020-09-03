import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { Button, Form } from "semantic-ui-react";
import facebook from "../../assets/images/facebook.svg";
import github from "../../assets/images/github.svg";
import google from "../../assets/images/google.svg";
import logoDark from "../../assets/images/logo-white.svg";
import config from "../../config";
import {
  getProfileAction,
  IGetProfile,
  IGetProfileArgs,
} from "../../redux/actions/user";
// import amplitude from "../../services/amplitude";
import loginradius from "../../services/loginradius";
import { getCookie, setCookie } from "../../utils/urls";
import ChangePwd from "../UserProfile/change_password";
import "./auth.scss";

export interface AuthProps extends RouteComponentProps {
  type:
    | "login"
    | "registration"
    | "verification"
    | "forgotpassword"
    | "resetpassword";
  getProfile: (args: IGetProfileArgs) => void;
  updateProfile: (args: IGetProfile) => void;
}
export interface AuthState {
  loading?: boolean;
}

class Auth extends React.Component<AuthProps, AuthState> {
  private _isMounted = false;
  constructor(props: AuthProps) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("message", this.postSocialAuthHandler);
  }

  render() {
    const isLoggedIn = !!getCookie("accessToken");
    const {
      type: authType,
      location: { search },
    } = this.props;

    if (isLoggedIn) {
      const redirect = search.startsWith("?redirect=")
        ? search.substr(10)
        : "/tools/list";
      return <Redirect to={redirect} />;
    }

    if (authType === "forgotpassword") {
      return (
        <LeftPaneWrapper>
          <ChangePwd type="forgot">
            <Link to="/login">Back to login?</Link>
          </ChangePwd>
        </LeftPaneWrapper>
      );
    } else if (authType === "resetpassword") {
      return (
        <LeftPaneWrapper>
          <ChangePwd type="reset">
            <Link to="/login">Back to login?</Link>
          </ChangePwd>
        </LeftPaneWrapper>
      );
    } else {
      return (
        <LeftPaneWrapper>
          <h2>{authType === "registration" ? "Sign Up" : "Login to Titan"}</h2>

          <p>
            {authType === "registration" ? (
              <>
                Already have an account?{" "}
                <Link to={"/login" + search}>Log In</Link>
              </>
            ) : (
              <>
                New to Titan? <Link to={"/signup" + search}>Sign Up</Link>
              </>
            )}
          </p>

          {/* <SocialLogin
            provider="facebook"
            authType={authType === "login" ? "Login" : "Signup"}
            onClick={() => {
              // amplitude.logEvent(authType, { provider: "facebook" });
              this.handleSocialClick("FacebookOAuth");
            }}
          />
          <SocialLogin
            provider="google"
            authType={authType === "login" ? "Login" : "Signup"}
            onClick={() => {
              // amplitude.logEvent(authType, { provider: "google" });
              this.handleSocialClick("google");
            }}
          /> */}
          <SocialLogin
            provider="github"
            authType={authType === "login" ? "Login" : "Signup"}
            onClick={() => {
              // amplitude.logEvent(authType, { provider: "github" });
              this.handleSocialClick("github");
            }}
          />
          <div className="seprator">
            <div className="d-flex align-items-center justify-content-center">
              or
            </div>
          </div>
          <AuthForm
            type={authType}
            loading={this.state.loading}
            onClick={
              authType === "login"
                ? this.handleEmailLoginClick
                : this.handleRegisterClick
            }
          />
        </LeftPaneWrapper>
      );
    }
  }

  handleSocialClick(provider: string) {
    let w = 900;
    let h = 500;
    let left = window.screen.width / 2 - w / 2;
    let top = window.screen.height / 2 - h / 2;

    let url = config.idp_hub_endpoint;
    url += `?apikey=${config.idp_apikey}`;
    url += `&provider=${provider}`;
    url += `&callback=${window.location.origin}/callback`;
    url += "&is_access_token=true";

    window.open(
      url,
      "sociallogin",
      `width=${w},height=${h},top=${top},left=${left}`
    );
    window.addEventListener("message", this.postSocialAuthHandler);
  }

  handleEmailLoginClick = (form: IAuthForm) => {
    this.setState({ loading: true }, () => {
      // amplitude.logEvent("login", { email: form.email });
      loginradius.api.login(
        {
          emailid: form.email,
          password: form.password,
        },
        this.postAuthHandler,
        (errors: any = []) => {
          try {
            toast.error(
              errors[0].Description || "Please try again after sometime!"
            );
          } catch (e) {
            toast.error("Please try again after sometime!");
          }
          this.setState({ loading: false });
        }
      );
    });
  };

  handleRegisterClick = (form: IAuthForm) => {
    this.setState({ loading: true }, () => {
      // amplitude.logEvent("register", { email: form.email });
      loginradius.api.registration(
        [],
        {
          email: [{ type: "Primary", value: form.email }],
          password: form.password,
          firstName: form.name,
        },
        this.postAuthHandler,
        (errors: any = []) => {
          try {
            let msg =
              errors[0].ErrorCode === 936
                ? "Email already registered. Please try logging in instead."
                : errors[0].Message || "Please try again after sometime!";
            toast.error(msg);
          } catch (e) {
            toast.error("Please try again after sometime!");
          }
          this.setState({ loading: false });
        }
      );
    });
  };

  postSocialAuthHandler = (ev: any) => {
    if (ev && ev.data && typeof ev.data === "string") {
      this.postAuthHandler({ access_token: ev.data });
    }
  };

  // Post Login and SignUp
  postAuthHandler = (resp: {
    access_token: string;
    Profile?: IGetProfile;
    expires_in?: string;
  }) => {
    if (resp.access_token) {
      setCookie("accessToken", resp.access_token, { expires: resp.expires_in });
      const redirect = new URLSearchParams(this.props.location.search).get(
        "redirect"
      );
      if (!resp.Profile) {
        this.props.getProfile({ token: resp.access_token });
      } else {
        this.props.updateProfile(resp.Profile);
      }
      this.props.history.push(redirect || "/tools/list");
    }
    this._isMounted && this.setState({ loading: false });
  };
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    getProfile: (args: IGetProfileArgs) =>
      dispatch(getProfileAction.dispatch(args)),
    updateProfile: (data: IGetProfile) =>
      dispatch(getProfileAction.success(data)),
  };
};

export default connect(null, mapDispatch)(withRouter(Auth));

const LeftPaneWrapper: React.FC = React.memo(props => (
  <div className="main row form-block d-flex align-items-center justify-content-center">
    <div className="left-panel login-screen col-md-4 col-sm-12 d-flex align-items-start justify-content-start flex-column">
      <LeftPane />
    </div>
    <div className="signup-form col-lg-8 col-md-8 col-sm-12">
      {props.children}
    </div>
  </div>
));

/**
 * AuthForm
 */
interface IAuthForm {
  name: string;
  email: string;
  password: string;
}
const AuthForm: React.FC<{
  type: AuthProps["type"];
  loading?: boolean;
  onClick: (data: IAuthForm) => void;
}> = React.memo(props => {
  const [form, updateForm] = useState<IAuthForm>({
    name: "",
    email: "",
    password: "",
  });

  const { loading } = props;
  return (
    <Form loading={loading} id={`${props.type}-form`}>
      {props.type === "registration" ? (
        <Form.Input
          placeholder="Full Name"
          value={form.name}
          onChange={e => {
            const name = e.target.value;
            updateForm(f => ({ ...f, name }));
          }}
        />
      ) : null}
      <Form.Input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={e => {
          const email = e.target.value;
          updateForm(f => ({ ...f, email }));
        }}
      />
      <Form.Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => {
          const password = e.target.value;
          updateForm(f => ({ ...f, password }));
        }}
      />
      {props.type === "login" ? (
        <Link to="/forgotpassword">Forgot Password?</Link>
      ) : null}

      <Button
        type="submit"
        className="ui primary button w-100 mt-2"
        onClick={e => props.onClick(form)}
        loading={loading}
        disabled={loading}
      >
        {props.type === "registration" ? "Sign Up" : "Log In"}
      </Button>
    </Form>
  );
});

/**
 * SocialLogin
 */
const SocialLogin: React.FC<{
  provider: "facebook" | "google" | "github";
  authType: "Login" | "Signup";
  onClick?: () => void;
}> = React.memo(props => {
  return props.provider === "facebook" ? (
    <button className="ui facebook button w-100 mb-3" onClick={props.onClick}>
      <img src={facebook} alt="Facebook" />
      {props.authType} with Facebook
    </button>
  ) : props.provider === "google" ? (
    <button className="ui button google w-100 mb-3" onClick={props.onClick}>
      <img src={google} alt="Google" />
      {props.authType} with Google
    </button>
  ) : (
    <button className="ui button github w-100 " onClick={props.onClick}>
      <img src={github} alt="Github" />
      {props.authType} with Github
    </button>
  );
});

const LeftPane: React.FC = React.memo(() => {
  return (
    <>
      <div className="logo">
        {/* <a href="/">
          <img src={logoDark} alt="Social9" title="Social9" />
        </a> */}
        Titan
      </div>
      <div className="message">
        <h1>Welcome to Titan</h1>
        <p>
          Deploy any Frontend app. Start by deploying with zero configuration.
        </p>
      </div>
    </>
  );
});
