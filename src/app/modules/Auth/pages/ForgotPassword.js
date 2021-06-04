import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
// import * as auth from "../_redux/authRedux";
import { Form, Input, Button } from "antd";
import { Alert } from "antd";
import "../../../../_wastelink/_assets/sass/pages/login/forgot.scss";

function ForgotPassword(props) {
  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validCredential, setValidCredential] = useState(false);

  const history = useHistory();
  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-forgot">
          <div className="main">
            <div className="head">
              <h2>Forgotten Password ?</h2>
              <p>Enter your email to reset your password</p>
            </div>

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
            // onFinish={formSubmit}
            // onFinishFailed={formSubmitFailed}
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

              <div className="form-row _button">
                <Button
                  size="large"
                  className="create_button_style"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
                <Button
                  size="large"
                  className="cancel_button_style"
                  onClick={() => history.push("/auth/login")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

// export default injectIntl(connect(null, auth.actions)(ForgotPassword));
export default ForgotPassword;
