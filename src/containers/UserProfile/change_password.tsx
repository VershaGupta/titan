import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";
import { IForm } from "../../redux/actions";
import loginradius from "../../services/loginradius";
import "./change_password.scss";

export interface ChangePwdProps {
  type: "reset" | "forgot" | "change";
}

const ChangePwd: React.SFC<ChangePwdProps> = props => {
  const { type } = props;
  const history = useHistory();

  const [oldPassword, updateOldPassword] = useState<IForm<string>>({
    value: "",
  });
  const [newPassword, updateNewPassword] = useState<IForm<string>>({
    value: "",
  });
  const [cnfPassword, updateCnfPassword] = useState<IForm<string>>({
    value: "",
  });
  const [email, updateEmail] = useState<IForm<string>>({
    value: "",
  });
  const [loading, updateLoading] = useState<boolean>(false);

  const getFieldError = (field: string, value: string) => {
    if (field === "new" && !value) {
      return "New password can not be empty.";
    }
    if (field === "cnf" && value !== newPassword.value) {
      return "Password do not match.";
    }
    return undefined;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const err = getFieldError(name, value);

    if (name === "new") updateNewPassword({ value, err });
    if (name === "old") updateOldPassword({ value, err });
    if (name === "cnf") updateCnfPassword({ value, err });
  };

  const shouldDisableSubmit = () => {
    return !!(loading || oldPassword.err || newPassword.err || cnfPassword.err);
  };

  const changePassword = () => {
    loginradius.api.changePassword(
      {
        oldpassword: oldPassword.value,
        newpassword: newPassword.value,
        confirmpassword: cnfPassword.value,
      },
      () => {
        toast.success("Password updated successfully.");
        updateLoading(false);
      },
      (errors: any) => {
        let msg =
          errors[0].ErrorCode === 1015
            ? "New password is similar to old password."
            : errors[0].Message || "Please try again after sometime!";
        toast.error(msg);
        updateLoading(false);
      }
    );
  };

  const sendRecoveryEmail = () => {
    loginradius.api.forgotPassword(
      {
        email: email.value,
      },
      () => {
        toast.success("A reset password link has been sent to your email.");
        updateLoading(false);
      },
      (errors: any) => {
        toast.error(errors[0].Message || "Something went wrong!");
        updateLoading(false);
      }
    );
  };

  const resetPassword = () => {
    const vToken = new URLSearchParams(history.location.search).get("vtoken");
    loginradius.api.resetPassword(
      {
        resettoken: vToken,
        password: newPassword.value,
        confirmpassword: cnfPassword.value,
      },
      () => {
        toast.success("Password reset successfully.");
        updateLoading(false);
        history.push("/login");
      },
      (errors: any) => {
        let msg =
          errors[0].ErrorCode === 1015
            ? "New password is similar to old password."
            : errors[0].Message || "Something went wrong!";
        toast.error(msg);
        updateLoading(false);
      }
    );
  };

  const submitForm = () => {
    if (!shouldDisableSubmit()) {
      updateLoading(true);
      type === "change"
        ? changePassword()
        : type === "forgot"
        ? sendRecoveryEmail()
        : resetPassword();
    }
  };

  // Reset error fields on type change
  React.useEffect(() => {
    if (type === "change" || type === "reset") {
      updateNewPassword({ value: "", err: undefined });
      updateCnfPassword({ value: "", err: undefined });
      updateOldPassword({ value: "", err: undefined });
    } else if (type === "forgot") {
      updateEmail({ value: "", err: undefined });
    }
  }, [type]);

  const showNewFields = type === "change" || type === "reset";
  return (
    <div className="main row form-block d-flex align-items-center justify-content-center">
      <div className="change-password-form">
        <Form loading={loading}>
          {type === "change" && (
            <Form.Input
              id="fic-old-password"
              type="password"
              label="Old Password"
              name="old"
              value={oldPassword.value}
              error={oldPassword.err}
              onChange={onChange}
            />
          )}
          {showNewFields && (
            <Form.Input
              id="fic-new-password"
              type="password"
              label="New Password"
              name="new"
              value={newPassword.value}
              error={newPassword.err}
              onChange={onChange}
            />
          )}

          {showNewFields && (
            <Form.Input
              id="fic-confirm-password"
              type="password"
              label="Confirm Password"
              name="cnf"
              value={cnfPassword.value}
              onChange={onChange}
              error={cnfPassword.err}
            />
          )}

          {/*  !! Forgot Password !! */}
          {type === "forgot" && (
            <Form.Input
              label=" We’ll send a recovery link to:"
              type="email"
              placeholder="Email Address"
              value={email.value}
              onChange={e => {
                const { value } = e.target;
                updateEmail({ value });
              }}
            />
          )}

          {props.children}
          <Button
            type="submit"
            className="ui primary button w-100 mt-2"
            content={
              loading
                ? "Please wait..."
                : type === "change"
                ? "Change Password"
                : type === "reset"
                ? "Reset Password"
                : "Send Recovery Link"
            }
            loading={loading}
            disabled={shouldDisableSubmit()}
            onClick={submitForm}
          />
        </Form>
      </div>
    </div>
  );
};

export default ChangePwd;
