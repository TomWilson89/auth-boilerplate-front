import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import config from "../../config";
import classes from "./styles.module.scss";
import logo from "../../assets/images/facebook-logo.png";
import { useDispatch } from "react-redux";
import { facebookLogin } from "../../redux/actions";

const FacebookLoginButton = () => {
  const dispatch = useDispatch();

  const responseFacebook = (response: any) => {
    dispatch(
      facebookLogin({
        accessToken: response.accessToken,
        userID: response.userID,
      })
    );
  };
  return (
    <div>
      <FacebookLogin
        appId={config.FACEBOOK_APP_ID}
        callback={responseFacebook}
        render={(renderProps: any) => (
          <button onClick={renderProps.onClick} className={classes.Facebook}>
            <img src={logo} alt="Google logo" />
            Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default FacebookLoginButton;
