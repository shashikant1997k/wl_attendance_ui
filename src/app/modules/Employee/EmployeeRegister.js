import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, DatePicker } from "antd";
import "../../../_wastelink/_assets/sass/pages/Employee/employee-register.scss";
import ImgCrop from "antd-img-crop";
import { useHistory } from "react-router";
import moment from "moment";
import baseURL from "../../baseurl";

const { Option } = Select;

function EmployeeRegister() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [fileList, setFileList] = useState({
    aadharFrontImage: "",
    aadharBackImage: "",
    pancardImage: "",
    profileImage: "",
    passbookImage: "",
  });

  const onImgChange = (e, v) => {
    console.log(e);
    setFileList((preState) => ({
      ...preState,
      [v]: e.fileList,
    }));
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
    console.log(src);
  };

  // const [_emp, setEmp] = useState();
  const formSubmit = (fieldsValue) => {
    console.log(fileList);
    fetch(`${baseURL}/register/?branch=${fieldsValue.branch}`)
      .then((resp) => resp.json())
      .then((data) => {
        let emp = "RAI";
        if (fieldsValue.branch === "Lucknow Unit") {
          emp = "LKO";
        } else if (fieldsValue.branch === "Mumbai Unit") {
          emp = "MUM";
        } else if (fieldsValue.branch === "Rai Unit") {
          emp = "RAI";
        }

        let len = Number(data.length);
        console.log(len);
        let num =
          len === 1 || len === 0
            ? "000" + (len + 1)
            : len === 2
            ? "00" + (len + 1)
            : len === 3
            ? "0" + (len + 1)
            : len + 1;

        // console.log(fileList);
        // let formData = new FormData();
        // formData.append("aadharFrontImage", fileList.aadharFrontImage);
        // formData.append("aadharBackImage", fileList.aadharBackImage);
        // formData.append("pancardImage", fileList.pancardImage);
        // formData.append("profileImage", fileList.profileImage);
        // formData.append("passbookImage", fileList.passbookImage);

        // let obj1 = {
        //   empID: emp + "" + num,
        //   dob: moment(fieldsValue.dob).format("YYYY-MM-DD"),
        //   date_joined: moment(fieldsValue.date_joined).format("YYYY-MM-DD"),
        //   formData,
        // };

        let formData = new FormData();
        formData.append(
          "aadharFrontImage",
          fileList.aadharFrontImage[0].originFileObj
        );
        formData.append(
          "aadharBackImage",
          fileList.aadharBackImage[0].originFileObj
        );
        formData.append("pancardImage", fileList.pancardImage[0].originFileObj);
        formData.append("profileImage", fileList.profileImage[0].originFileObj);
        formData.append(
          "passbookImage",
          fileList.passbookImage[0].originFileObj
        );

        formData.append("empID", emp + "" + num);
        formData.append("name", fieldsValue.name);
        formData.append("aadharNumber", fieldsValue.aadharNumber);
        formData.append("pancard", fieldsValue.pancard);
        formData.append("email", fieldsValue.email);
        formData.append("mobile", fieldsValue.mobile);
        formData.append("branch", fieldsValue.branch);
        formData.append("address", fieldsValue.address);
        formData.append("role", fieldsValue.role);
        formData.append("bankname", fieldsValue.bankname);
        formData.append("accountNumber", fieldsValue.accountNumber);
        formData.append("IFSCCode", fieldsValue.IFSCCode);
        formData.append("dob", moment(fieldsValue.dob).format("YYYY-MM-DD"));
        formData.append(
          "date_joined",
          moment(fieldsValue.date_joined).format("YYYY-MM-DD")
        );

        // let empDetails = { ...fieldsValue, ...obj1 };
        const postEmpData = async () => {
          try {
            const req = await fetch(`${baseURL}/register/`, {
              method: "POST",
              // headers: { "Content-Type": "application/json" },
              // body: JSON.stringify(empDetails),
              body: formData,
            });

            const res = await req.json();
            history.push("/employee-list");
          } catch (err) {
            console.error(`ERROR: ${err}`);
          }
        };

        postEmpData();
      });
  };

  const formSubmitFailed = () => {};

  return (
    <div className="employeeRegister">
      <Form
        onFinish={formSubmit}
        onFinishFailed={formSubmitFailed}
        layout="vertical"
        className="row"
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
                {/* <ImgCrop rotate> */}
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList.aadharFrontImage}
                  onChange={(e) => onImgChange(e, "aadharFrontImage")}
                  onPreview={onPreview}
                  name="aadharFrontImage"
                >
                  {fileList?.aadharFrontImage.length < 1 && "+ Upload"}
                </Upload>
                {/* </ImgCrop> */}
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
                {/* <ImgCrop rotate> */}
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList.aadharBackImage}
                  onChange={(e) => onImgChange(e, "aadharBackImage")}
                  onPreview={onPreview}
                  name="aadharBackImage"
                >
                  {fileList?.aadharBackImage.length < 1 && "+ Upload"}
                </Upload>
                {/* </ImgCrop> */}
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
                {/* <ImgCrop rotate> */}
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList.pancardImage}
                  onChange={(e) => onImgChange(e, "pancardImage")}
                  onPreview={onPreview}
                  name="pancardImage"
                >
                  {fileList?.pancardImage.length < 1 && "+ Upload"}
                </Upload>
                {/* </ImgCrop> */}
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
                {/* <ImgCrop rotate> */}
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList.profileImage}
                  onChange={(e) => onImgChange(e, "profileImage")}
                  onPreview={onPreview}
                  name="profileImage"
                >
                  {fileList?.profileImage.length < 1 && "+ Upload"}
                </Upload>
                {/* </ImgCrop> */}
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
                {/* <ImgCrop rotate> */}
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList.passbookImage}
                  onChange={(e) => onImgChange(e, "passbookImage")}
                  onPreview={onPreview}
                  name="passbookImage"
                >
                  {fileList?.passbookImage.length < 1 && "+ Upload"}
                </Upload>
                {/* </ImgCrop> */}
              </Form.Item>
            </div>
          </fieldset>
        </div>

        <div className="form-row registerButton">
          <Button size="large" htmlType="submit" loading={loading}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EmployeeRegister;
