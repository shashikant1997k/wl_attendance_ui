import React, { useCallback, useRef, useState } from "react";
import "../../../_wastelink/_assets/sass/pages/dashboard/attendance-checker.scss";
import Webcam from "react-webcam";
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Button, Image, Radio } from "antd";
import QrReader from "react-qr-reader";
import moment from "moment";
import Swal from "sweetalert2";
import baseURL from "../../baseurl";

function AttendanceChecker() {
  const campureImg = useRef();
  const [empData, setEmpData] = useState([]);

  const capture = useCallback(() => {
    const imageSrc = campureImg.current.getScreenshot();
    console.log(imageSrc);
  }, []);

  console.log(moment().format("HH:mm:ss"));
  const handleScan = (value) => {
    console.log(value);
    let curDate = moment().format("YYYY-MM-DD");
    if (value !== null && empData.length === 0) {
      fetch(`${baseURL}/attendanceInput/?empID=${value}&daydate=${curDate}`)
        .then((resp) => resp.json())
        .then((data) => {
          const postEmpData = async () => {
            try {
              const req = await fetch(`${baseURL}/register/?empID=${value}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });

              const res = await req.json();
              setEmpData(res);
              console.log(data);
              if (timeVal === "IN") {
                if (data.length === 0) {
                  let obj = {
                    empID: value,
                    timing_in: moment().format("HH:mm:ss"),
                    status: "P",
                  };

                  fetch(`${baseURL}/attendanceInput/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj),
                  })
                    .then((v) => v.json())
                    .then((val) => {
                      console.log(val);
                      Swal.fire({
                        icon: "success",
                        title: "Attendance Successfully Marked",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    })
                    .catch((err) => {
                      Swal.fire({
                        icon: "error",
                        title: "Something went wrong",
                      });
                      console.error(`ERROR: ${err}`);
                    });
                } else {
                  setEmpData([]);
                  Swal.fire({
                    icon: "error",
                    title: "Already Exist",
                    text: "Already Exist",
                  });
                }
              } else if (timeVal === "OUT") {
                console.log(data);
                if (data.length > 0) {
                  if (data[0].timing_out !== "") {
                    setEmpData([]);
                    Swal.fire({
                      icon: "error",
                      title: "Employee already exited!",
                    });
                    return false;
                  }

                  let obj = {
                    empID: value,
                    timing_in: data[0].timing_in,
                    timing_out: moment().format("HH:mm:ss"),
                    status: data[0].status,
                  };

                  fetch(`${baseURL}/attendanceList/${data[0].id}/`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj),
                  })
                    .then((v) => v.json())
                    .then((val) => {
                      Swal.fire({
                        icon: "success",
                        title: "Attendance Successfully Marked",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    })
                    .catch((err) => {
                      Swal.fire({
                        icon: "error",
                        title: "Something went wrong",
                      });
                      console.error(`ERROR: ${err}`);
                    });
                } else {
                  setEmpData([]);
                  Swal.fire({
                    icon: "error",
                    title: "Employee Entry not exist",
                    text: "Employee Entry not exist",
                  });
                }
              }
            } catch (err) {
              console.error(`ERROR: ${err}`);
            }
          };

          postEmpData();
        });
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  const resetQrcode = () => {
    setEmpData([]);
  };

  const [timeVal, setTimeVal] = useState("IN");
  const [txt, setTxt] = useState("Entry Time Qrcode Scan");

  const handleTimeChange = (val) => {
    setTimeVal(val);
    if (val === "IN") {
      setTxt("Entry Time Qrcode Scan");
      setEmpData([]);
      document.querySelector(".attendanceChecker").style.backgroundColor =
        "white";
      document.querySelector(".btn2").classList.remove("doneBtn");
      document.querySelector(".btn1").classList.add("doneBtn");
    } else if (val === "OUT") {
      setTxt("Exit Time Qrcode Scan");
      setEmpData([]);
      document.querySelector(".attendanceChecker").style.backgroundColor =
        "floralwhite";
      document.querySelector(".btn1").classList.remove("doneBtn");
      document.querySelector(".btn2").classList.add("doneBtn");
    }
  };

  return (
    <>
      <div className="extryExitBtn">
        {/* <Radio.Group
          options={options}
          onChange={handleTimeChange}
          value={timeVal}
          optionType="button"
          buttonStyle="solid"
          size="large"
        /> */}

        <Button
          onClick={() => handleTimeChange("IN")}
          type="default"
          shape="circle"
          size="large"
          className="btn1 doneBtn"
        >
          IN
        </Button>
        <Button
          onClick={() => handleTimeChange("OUT")}
          style={{ marginLeft: "15px" }}
          type="default"
          shape="circle"
          size="large"
          className="btn2"
        >
          OUT
        </Button>
      </div>

      <div className="attendanceChecker">
        <h3 className="txt mb-3">{txt}</h3>
        <div className="d-flex flex-row">
          <div className="cameraView">
            {/* <Webcam
          width={400}
          height={400}
          mirrored={true}
          ref={campureImg}
          screenshotFormat="image/jpeg"
        /> */}

            {empData?.length > 0 ? (
              <div className="d-flex flex-column">
                <div className="userInfo">
                  <div className="userImg">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="info">
                    <span className="_title">ID</span>
                    <span className="_val">{empData[0].empID}</span>
                  </div>

                  <div className="info">
                    <span className="_title">Name</span>
                    <span className="_val">{empData[0].name}</span>
                  </div>

                  <div className="info">
                    <span className="_title">
                      {timeVal === "IN" ? "Entry Time" : "Exit Time"}
                    </span>
                    <span className="_val">{moment().format("h:mm A")}</span>
                  </div>

                  <div className="info">
                    <span className="_title">Branch</span>
                    <span className="_val">{empData[0].branch}</span>
                  </div>

                  <div className="info">
                    <span className="_title">Role</span>
                    <span className="_val">{empData[0].role}</span>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-center mt-5">
                  <Button onClick={resetQrcode} type="primary" size="large">
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "400px", height: "400px" }}
              />
            )}

            {/* <Button type="primary" onClick={capture}>
          Capture photo
        </Button> */}
          </div>
          <div className="rightText">
            <div className="con1">
              {/* <div className="imageDiv styl">
            <span>1. Capture Employee image</span>
            <div className="iconDiv">
              <div className="loading">
                <LoadingOutlined />
              </div>
              <div className="rightTick">
                <CheckOutlined />
              </div>
            </div>
          </div> */}
              <div className="QrcodeDiv styl">
                <span className="txt">Scan QR Code</span>
                <div className="iconDiv">
                  {empData.length > 0 ? (
                    <div className="rightTick">
                      <CheckOutlined />
                    </div>
                  ) : (
                    <div className="loading">
                      <LoadingOutlined />
                    </div>
                  )}

                  {/* <div className="wrongTick">
                <CloseOutlined />
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttendanceChecker;
