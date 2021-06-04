import React, { useState } from "react";
import "../../../_wastelink/_assets/sass/pages/Employee/employee-edit.scss";
import { Form, Input, Button, Select, Upload, DatePicker, Image } from "antd";
import "../../../_wastelink/_assets/sass/pages/Employee/employee-register.scss";
import ImgCrop from "antd-img-crop";
import { useHistory } from "react-router";
import moment from "moment";
import baseURL from "../../baseurl";

const { Option } = Select;

function EmployeeEdit(props) {
  let empData = props.location.state;
  console.log(empData);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formSubmit = (fieldsValue) => {
    let obj1 = {
      empID: empData.empID,
      dob: moment(fieldsValue.dob).format("YYYY-MM-DD"),
      date_joined: moment(fieldsValue.date_joined).format("YYYY-MM-DD"),
    };
    let empDetails = { ...fieldsValue, ...obj1 };
    const postEmpData = async () => {
      try {
        const req = await fetch(`${baseURL}/employeeList/${empData.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(empDetails),
        });
        const res = await req.json();
        console.log(res);
        history.push("/employee-list");
        console.log(res);
      } catch (err) {
        console.error(`ERROR: ${err}`);
      }
    };
    postEmpData();
  };

  const formSubmitFailed = () => {};

  return (
    <div className="employeeEdit">
      <Form
        onFinish={formSubmit}
        onFinishFailed={formSubmitFailed}
        layout="vertical"
        className="row"
        initialValues={{
          ...empData,
          dob: moment(empData.dob),
          date_joined: moment(empData.date_joined),
        }}
      >
        <div className="col-lg-4 col-md-6">
          <fieldset className="border p-4">
            <legend className="w-auto">Personal Details</legend>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Name",
                  },
                ]}
              >
                <Input
                  name="name"
                  type="text"
                  placeholder="Name"
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="aadharNumber"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Aadhar number",
                  },
                ]}
              >
                <Input
                  name="aadharNumber"
                  type="text"
                  placeholder="Aadhar Number"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row imageUpload">
              <Form.Item
                className="col-sm-6"
                name="aadharFrontImage"
                label="Aadhar front image"
                rules={[
                  {
                    required: true,
                    message: "Please upload Aadhar front image",
                  },
                ]}
              >
                <Image width={100} src={empData.aadharFrontImage} />
              </Form.Item>

              <Form.Item
                className="col-sm-6"
                name="aadharBackImage"
                label="Aadhar back image"
                rules={[
                  {
                    required: true,
                    message: "Please upload Aadhar back image",
                  },
                ]}
              >
                <Image width={100} src={empData.aadharBackImage} />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="pancard"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Pancard Number",
                  },
                ]}
              >
                <Input
                  name="pancard"
                  type="text"
                  placeholder="Pancard Number"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row imageUpload">
              <Form.Item
                className="col-md-6"
                name="pancardImage"
                label="Pancard image"
                rules={[
                  {
                    required: true,
                    message: "Please upload Pancard image",
                  },
                ]}
              >
                <Image width={100} src={empData.pancardImage} />
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
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="mobile"
                rules={[
                  {
                    // required: true,
                    // validator: (rule, value, cb) => {
                    //   value.length < 10 || value.length > 10
                    //     ? cb("Please Enter mobile!")
                    //     : cb();
                    // },
                    message: "Please Enter mobile!",
                  },
                ]}
              >
                <Input
                  name="mobile"
                  type="number"
                  placeholder="Mobile number"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter address!",
                  },
                ]}
              >
                <Input
                  name="address"
                  type="address"
                  placeholder="Address"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Date of birth!",
                  },
                ]}
              >
                <DatePicker placeholder="Date of birth" name="dob" />
              </Form.Item>
            </div>

            <div className="form-row imageUpload">
              <p className="tl">Employee Image:</p>
              <Form.Item
                className="col-md-12"
                name="profileImage"
                rules={[
                  {
                    required: true,
                    message: "Please upload employee image!",
                  },
                ]}
              >
                <Image width={100} src={empData.profileImage} />
              </Form.Item>
            </div>
          </fieldset>
        </div>
        <div className="col-lg-4 col-md-6">
          <fieldset className="border p-4">
            <legend className="w-auto">Joining Details</legend>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="branch"
                rules={[
                  {
                    required: true,
                    message: "Please select Branch!",
                  },
                ]}
              >
                <Select
                  showSearch
                  name="branch"
                  placeholder="Select Branch"
                  autoComplete="off"
                  disabled
                >
                  <Option value="Rai Unit">Rai Unit</Option>
                  <Option value="Lucknow Unit">Lucknow Unit</Option>
                  <Option value="Mumbai Unit">Mumbai Unit</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="date_joined"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Date of joining!",
                  },
                ]}
              >
                <DatePicker placeholder="Date of joining" name="date_joined" />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please select user designation!",
                  },
                ]}
              >
                <Select
                  showSearch
                  name="role"
                  placeholder="Select User Designation"
                  autoComplete="off"
                >
                  <Option value="Supervisor">Supervisor</Option>
                  <Option value="Staff">Staff</Option>
                  <Option value="Auditor">Auditor</Option>
                </Select>
              </Form.Item>
            </div>
          </fieldset>
        </div>
        <div className="col-lg-4 col-md-6">
          <fieldset className="border p-4">
            <legend className="w-auto">Bank Details</legend>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="bankname"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Bank Name",
                  },
                ]}
              >
                <Input
                  name="bankname"
                  type="text"
                  placeholder="Bank Name"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="accountNumber"
                rules={[
                  {
                    required: true,
                    message: "Please Enter account number",
                  },
                ]}
              >
                <Input
                  name="accountNumber"
                  type="text"
                  placeholder="Account Number"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item
                className="col-md-12"
                name="IFSCCode"
                rules={[
                  {
                    required: true,
                    message: "Please Enter IFSC Code",
                  },
                ]}
              >
                <Input
                  name="IFSCCode"
                  type="text"
                  placeholder="IFSC Code"
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <div className="form-row imageUpload">
              <p className="tl">Passbook Image:</p>
              <Form.Item
                className="col-md-12"
                name="passbookImage"
                rules={[
                  {
                    required: true,
                    message: "Please upload Passbook Image",
                  },
                ]}
              >
                <Image width={100} src={empData.passbookImage} />
              </Form.Item>
            </div>
          </fieldset>
        </div>

        <div className="form-row editButton">
          <Button size="large" htmlType="submit" loading={loading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EmployeeEdit;
