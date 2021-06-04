import React, { useState } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { NavLink } from "react-router-dom";
// import * as auth from "../_redux/authRedux";
import "../../../../_wastelink/_assets/sass/pages/login/login.scss";
import { Form, Input, Button, Select } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const { Option } = Select;

function Registration(props) {
  // const { intl } = props;
  const [loading, setLoading] = useState(false);

  // const enableLoading = () => {
  //   setLoading(true);
  // };

  // const disableLoading = () => {
  //   setLoading(false);
  // };

  return (
    <div className="login-form">
      <div className="signUp_main">
        <h2 style={{ marginBottom: "5%" }}>Sign Up</h2>

        <Form
        // onFinish={formSubmit}
        // onFinishFailed={formSubmitFailed}
        >
          <div className="form-row">
            <Form.Item
              className="col-md-12"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please Enter First Name!",
                },
              ]}
            >
              <Input
                name="firstname"
                size="large"
                type="text"
                placeholder="First Name"
                autoComplete="off"
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              className="col-md-12"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please Enter Last Name!",
                },
              ]}
            >
              <Input
                name="lastname"
                size="large"
                type="text"
                placeholder="Last Name"
                autoComplete="off"
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              className="col-md-12"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please Enter Username!",
                },
              ]}
            >
              <Input
                name="username"
                size="large"
                type="text"
                placeholder="Username"
                autoComplete="off"
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              className="col-md-12"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter email!",
                },
              ]}
            >
              <Input
                name="email"
                size="large"
                type="email"
                placeholder="email"
                autoComplete="off"
              />
            </Form.Item>
          </div>

          <div className="form-row">
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
          </div>

          <div className="form-row">
            <Form.Item
              className="col-md-12"
              name="admin"
              rules={[
                {
                  required: true,
                  message: "Please select admin!",
                },
              ]}
            >
              <Select
                showSearch
                size="large"
                name="admin"
                placeholder="Select User Role"
                autoComplete="off"
              >
                <Option value="admin">Admin</Option>
                <Option value="superUser">Super User</Option>
                <Option value="auditor">Auditor</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="form-row signin_link_row">
            <Form.Item
              className="col-md-12"
              name="supplierName"
              rules={[
                {
                  required: true,
                  message: "Please select Supplier Name!",
                },
              ]}
            >
              <Select
                showSearch
                size="large"
                name="supplierName"
                placeholder="Select Supplier Name"
                autoComplete="off"
              >
                <Option value="ITC ltd.">ITC ltd.</Option>
                <Option value="wastelink">Wastelink</Option>
                <Option value="ITC Ltd. Lucknow">ITC Ltd. Lucknow</Option>
                <Option value="Jubilant FoodWorks Limited">
                  Jubilant FoodWorks Limited
                </Option>
                <Option value="ITC Ltd. Haryana">ITC Ltd. Haryana</Option>
              </Select>
            </Form.Item>
            <p className="signIn_link">
              You have an account?
              <NavLink to="/auth/login">Sign In!</NavLink>
            </p>
          </div>

          <div className="form-row _button">
            {/* <NavLink to="/auth/forgot-password">Forgot Password ?</NavLink> */}
            <Button
              size="large"
              className="create_button_style"
              htmlType="submit"
              loading={loading}
            >
              Sign Up
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

// export default injectIntl(connect(null, auth.actions)(Registration));
export default Registration;
