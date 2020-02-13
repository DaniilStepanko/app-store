import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import compose from "../../compose";
import "./logIn.sass";
import validate from "../hoc/validate";
import * as actionsLogIn from "../../actions/logInActions";

const LogIn = (props) => {
  const {
    validateLogin,
    validatePassword,
    setLoginValue,
    setPasswordValue,
    userLogIn

  } = props;

  const [{ loginValue, passwordValue, loginError, passwordError }, setFormValue] = useState({
    loginValue: "",
    passwordValue: "",
    loginError: false,
    passwordError: false
  });

  const generateInputClass = (errorTypes, value) => {
    return classNames({
      "log-in-form__input": value === "",
      "log-in-form__input log-in-form__input_success": !errorTypes && value !== "",
      "log-in-form__input log-in-form__input_error": errorTypes && value !== ""
    });
  };

  const enterUser = (event) => {
    event.preventDefault();
    userLogIn();
  };

  const handleChangeLogin = (event) => {
    const logValue = event.target.value;
    const validate = validateLogin(loginValue);
    setFormValue(state => {
      return {
        ...state,
        loginError: !validate,
        loginValue: logValue
      };
    });
    if (validate) {
      setLoginValue(logValue);
    }
  };

  const handleChangePassword = (event) => {
    const passValue = event.target.value;
    const validate = validatePassword(passValue);
    setFormValue(state => {
      return {
        ...state,
        passwordError: !validate,
        passwordValue: passValue
      };
    });
    if (validate) {
      setPasswordValue(passValue);
    }
  };

  return (
    <div className="log-in">
      <div className="log-in-form">
        <h1 className="log-in-form__title">Log In</h1>
        <form className="log-in-form__form" onSubmit={enterUser}>
          <label className="log-in-form__label">
            Login / Email address
            <input type="text"
              name="login"
              className={generateInputClass(loginError, loginValue)}
              onChange={handleChangeLogin}
              value={loginValue}
            ></input>
          </label>
          <label className="log-in-form__label log-in-form__label_indent">
            Password
            <input type="text"
              name="password"
              className={generateInputClass(passwordError, passwordValue)}
              onChange={handleChangePassword}
              value = {passwordValue}
            ></input>
          </label>
          <button type="submit" className="btn btn_center">log in</button>
        </form>
      </div>
    </div>
  );
};
LogIn.propTypes = {
  validateLogin: PropTypes.func,
  validatePassword: PropTypes.func,
  setLoginValue: PropTypes.func,
  setPasswordValue: PropTypes.func,
  userLogIn: PropTypes.func
};

const mapStateToProps = (state) => {
  return state.logIn;
};

export default compose(
  connect(mapStateToProps, actionsLogIn),
  validate
)(LogIn);
