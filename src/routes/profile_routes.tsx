import * as React from "react";
import { Redirect, RouteComponentProps, Switch } from "react-router-dom";
import { PAGE_FALLBACK, ProtectedRoute, withBase } from "./index";
const UserProfile = React.lazy(() => import("../containers/UserProfile"));

export interface ProfileRoutesProps extends RouteComponentProps {}

const ProfileRoutes: React.FC<ProfileRoutesProps> = ({ match: { path } }) => {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={withBase(path, "/")}
        component={() => (
          <React.Suspense fallback={PAGE_FALLBACK}>
            <UserProfile />
          </React.Suspense>
        )}
      />
      <Redirect to={withBase(path, "/")} />
    </Switch>
  );
};

export default ProfileRoutes;
