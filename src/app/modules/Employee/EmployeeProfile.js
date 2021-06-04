import React from "react";
import "../../../_wastelink/_assets/sass/pages/Employee/employee-profile.scss";
import { Image, Tabs, Button } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import QRCode from "qrcode";

const { TabPane } = Tabs;

function EmployeeProfile(props) {
  let empDetails = props.location.state;
  const history = useHistory();

  const generateQrCode = async (val) => {
    try {
      const res = await QRCode.toDataURL(val);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleIDPrint = () => {
    generateQrCode(empDetails.empID).then((val) => {
      let obj = {
        emp: empDetails,
        qrImg: val,
      };
      history.push("/employee-QRCode", obj);
    });
  };

  return (
    <div className="employeeProfile row">
      <div className="col-lg-4">
        <div className="left ">
          <div className="empImg">
            <Image width={80} src={empDetails.profileImage} />
            <div className="_emp">
              <span className="_name">{empDetails.name}</span>
              <span className="_role">{empDetails.role}</span>
            </div>
          </div>

          <ul className="list-inline p-0 m-0">
            <li className="mb-2">
              <div className="d-flex align-items-center">
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="svg-icon mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <p className="mb-0">{empDetails.address}</p>
              </div>
            </li>
            <li className="mb-2">
              <div className="d-flex align-items-center">
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="svg-icon mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="mb-0">{empDetails.role}</p>
              </div>
            </li>
            <li className="mb-2">
              <div className="d-flex align-items-center">
                <CalendarOutlined />
                <p className="mb-0 ml-3">{empDetails.date_joined}</p>
              </div>
            </li>
            <li className="mb-2">
              <div className="d-flex align-items-center">
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="svg-icon mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <p className="mb-0">{empDetails.mobile}</p>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="svg-icon mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="mb-0">{empDetails.email}</p>
              </div>
            </li>

            <li>
              <div className="downloadID">
                <Button
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="small"
                  onClick={handleIDPrint}
                >
                  Download ID Card
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="right ">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal Details" key="1">
              <div className="row _dt">
                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Name</p>
                    <p className="mb-3 _val">{empDetails.name}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Email</p>
                    <p className="mb-3 _val">{empDetails.email}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Mobile</p>
                    <p className="mb-3 _val">{empDetails.mobile}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Address</p>
                    <p className="mb-3 _val">{empDetails.address}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Aadhar</p>
                    <p className="mb-3 _val">{empDetails.aadharNumber}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Pancard</p>
                    <p className="mb-3 _val">{empDetails.pancard}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Aadhar Image</p>
                    <div className="mb-3 mt-1 _val d-flex flex-row">
                      <Image
                        width={100}
                        src={empDetails.aadharFrontImage}
                        style={{ marginRight: "10px" }}
                      />
                      <Image width={100} src={empDetails.aadharBackImage} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Pancard Image</p>
                    <div className="mb-3 mt-1 _val">
                      <Image width={100} src={empDetails.pancardImage} />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="d-flex flex-column">
                    <p className="_tit">Date of birth</p>
                    <p className="mb-3 _val">{empDetails.dob}</p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Joining Details" key="2">
              <div className="row _dt">
                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Branch</p>
                    <p className="mb-3 _val">{empDetails.branch}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Date of Joining</p>
                    <p className="mb-3 _val">{empDetails.date_joined}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Designation</p>
                    <p className="mb-3 _val">{empDetails.role}</p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Bank Details" key="3">
              <div className="row _dt">
                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Bank Name</p>
                    <p className="mb-3 _val">{empDetails.bankname}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Account Number</p>
                    <p className="mb-3 _val">{empDetails.accountNumber}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">IFSC Code</p>
                    <p className="mb-3 _val">{empDetails.IFSCCode}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-column">
                    <p className="_tit">Passbook Image</p>
                    <div className="mb-3 mt-1 _val">
                      <Image width={100} src={empDetails.passbookImage} />
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
