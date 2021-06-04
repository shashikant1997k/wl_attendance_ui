import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import * as auth from "../_redux/authRedux";
import "../../../../_wastelink/_assets/sass/pages/login/login.scss";
import { Form, Input, Button } from "antd";
import { Alert } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actionTypes } from "../_redux/authReducer";

function Login(props) {
  const [loading, setLoading] = useState(false);

  const [validCredential, setValidCredential] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const dispatch = useDispatch();
  const formSubmit = (values) => {
    enableLoading();

    fetch("http://127.0.0.1:8000/api/userLogin/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data["code"] && data["code"][0] === "401") {
          setValidCredential(true);
          disableLoading();
          return false;
        }

        if (data["code"] && data["code"][0] === "203") {
          fetch(
            `http://127.0.0.1:8000/api/userRegister/?email=${values.email}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              disableLoading();
              dispatch({
                type: actionTypes.LOGIN,
                user: { email: data[0]["email"] },
                accessToken: data[0]["accessToken"],
              });
            })
            .catch((err) => {
              disableLoading();
              console.log(`Error- ${err}`);
            });
        } else {
          dispatch({
            type: actionTypes.LOGIN,
            user: data,
            accessToken: data.accessToken,
          });
          disableLoading();
        }
      })
      .catch(() => {
        setValidCredential(true);
        disableLoading();
      });

    // setTimeout(() => {
    //   login(values.email, values.password)
    //     .then(({ data: { accessToken } }) => {
    //       disableLoading();
    //       console.log(accessToken);
    //       props.login(accessToken);
    //     })
    //     .catch(() => {
    //       setValidCredential(true);
    //       disableLoading();
    //     });
    // }, 1000);
  };

  const formSubmitFailed = (value) => {
    console.log(value);
  };

  return (
    <div className="login-form">
      <div className="login_main">
        <h2>Sign In</h2>
        <div className="alert_message">
          {validCredential && (
            <Alert
              message="The login detail is incorrect"
              type="error"
              showIcon
            />
          )}
        </div>

        <Form
          // onSubmit={formSubmit}
          layout="vertical"
          onFinish={formSubmit}
          onFinishFailed={formSubmitFailed}
          initialValues={{ email: "anuj@gmail.com", password: "123456" }}
        >
          <div className="form-row">
            <Form.Item
              className="col-md-12"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter Username!",
                },
              ]}
            >
              <Input
                name="email"
                size="large"
                type="email"
                placeholder="Username"
                autoComplete="off"
              />
            </Form.Item>
          </div>

          <div className="form-row password_row">
            <Form.Item
              className="col-md-12"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter Password!",
                },
              ]}
            >
              <Input
                name="password"
                size="large"
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            {/* <p className="signUp_link">
              Don't have an account yet?
              <NavLink to="/auth/registration"> Sign Up!</NavLink>
            </p> */}
          </div>

          <div className="form-row _button">
            {/* <NavLink style={{ fontWeight: "500" }} to="/auth/forgot-password">
              Forgot Password ?
            </NavLink> */}
            <Button
              size="large"
              className="create_button_style"
              htmlType="submit"
              loading={loading}
            >
              Sign In
            </Button>
          </div>
        </Form>

        <div className="row-or row">
          <span className="span_1"></span>
          <span className="text_or">OR</span>
          <span className="span_2"></span>
        </div>

        <div className="row signInWithGoogle">
          <Button
            size="large"
            className="create_button_style"
            htmlType="submit"
            icon={<GoogleOutlined />}
          >
            Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
// export default injectIntl(connect(null, auth.actions)(Login));
