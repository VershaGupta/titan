import React from "react";
import ChangePwd from "./change_password";
import "./userprofile.scss";

export interface UserProfileProps {}
export interface UserProfileState {}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <ChangePwd type="change" />;
  }
}

export default UserProfile;
