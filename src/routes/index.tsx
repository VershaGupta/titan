import React from "react";
import { RouteComponentProps, RouteProps, useLocation } from "react-router";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import LRObject from "../services/loginradius";
import { getCookie, removeCookie } from "../utils/urls";
import ProfileRoutes from "./profile_routes";

const LandingPage = React.lazy(() => import("../containers/LandingPage"));
const Auth = React.lazy(() => import("../containers/Auth"));
const Sites = React.lazy(() => import("../containers/Sites"));
//Internal view
const CreateSite = React.lazy(() => import("../containers/Sites/create_site"));
const ConfigureSite = React.lazy(() =>
  import("../containers/Sites/configure_site")
);

export const FALLBACK = (
  <div id="preloader" className="fullscreen">
    <div id="status">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  </div>
);

export const PAGE_FALLBACK = (
  <div id="preloader">
    <div id="status">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  </div>
);

export interface RoutesProps extends RouteComponentProps {
  isCMSView?: boolean;
}

class Routes extends React.Component<RoutesProps> {
  render() {
    const { isCMSView } = this.props;

    return (
      <Switch>
        {/* Protected Routes */}
        {/* <ProtectedRoute
          path="/tools"
          render={props => <ToolsRoute {...props} isCMSView={isCMSView} />}
        /> */}

        <ProtectedRoute path="/profile" component={ProfileRoutes} />
        <Route exact path="/sites">
          <React.Suspense fallback={PAGE_FALLBACK}>
            <Sites />
          </React.Suspense>
        </Route>
        <Route
          exact
          path="/site/new"
          render={() => (
            <React.Suspense fallback={FALLBACK}>
              <CreateSite />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/site/configure"
          render={() => (
            <React.Suspense fallback={FALLBACK}>
              <ConfigureSite />
            </React.Suspense>
          )}
        />
        {/* Public Routes */}
        <Route
          exact
          path="/"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <LandingPage type="home" />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <Auth type="login" />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <Auth type="registration" />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/verification"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <Auth type="verification" />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/forgotpassword"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <Auth type="forgotpassword" />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/resetpassword"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <Auth type="resetpassword" />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/logout"
          render={({ location }) => {
            const token = removeCookie("accessToken");
            LRObject.api.invalidateToken(token);
            const redirect =
              new URLSearchParams(location.search).get("redirect") || "/sites";
            return <Redirect to={`/login?redirect=${redirect}`} />;
          }}
        />

        <Route
          exact
          path="/social9vs-:others"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <LandingPage type="comparison" />
            </React.Suspense>
          )}
        />
        <Route
          exact
          path="/social9vs:other"
          render={() => (
            <React.Suspense fallback={PAGE_FALLBACK}>
              <LandingPage type="comparison" />
            </React.Suspense>
          )}
        />

        {/* Default route */}
        <Redirect to={"/sites"} />
      </Switch>
    );
  }
}

export default withRouter(Routes);

// Functional Component
export const ProtectedRoute: React.FC<RouteProps> = props => {
  const isLoggedIn = !!getCookie("accessToken");
  const { pathname, search } = useLocation();

  if (isLoggedIn) {
    return <Route {...props} />;
  } else return <Redirect to={`/login?redirect=${pathname + search}`} />;
};

export const withBase = (base: string, suffix: string) => {
  return base + suffix;
};
