import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import config from "../../config";
import classes from "./styles.module.scss";
import logo from "../../assets/images/google-logo.png";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/actions";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    dispatch(googleLogin({ idToken: response.tokenId }));
  };
  return (
    <div>
      <GoogleLogin
        clientId={`${config.GOOGLE_CLIENT_ID}`}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={classes.Google}
          >
            <img src={logo} alt="Google logo" />
            Login with Google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default GoogleLoginButton;
