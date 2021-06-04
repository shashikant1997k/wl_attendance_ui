import React from "react";
import { Image, Button } from "antd";
import "../../../_wastelink/_assets/sass/pages/Employee/emp-qrcode.scss";
import { toAbsoluteUrl } from "../../../_wastelink/_helpers";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function EmpQrCode(props) {
  let user = props.location.state;
  const handlePrint = () => {
    var doc = new jsPDF("p", "mm", "a4");
    html2canvas(document.querySelector(".idCard")).then(function(canvas) {
      var imgData = canvas.toDataURL("image/png");
      var pageHeight = 295;
      var imgWidth = (canvas.width * 50) / 210;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var position = 15;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.output("dataurlnewwindow");
      doc.save(Date.now() + ".pdf");
    });
  };
  return (
    <div className="empQrCode">
      <div className="printBtn">
        <Button onClick={handlePrint}>Print</Button>
      </div>
      <div className="idCard">
        <div className="cardHeader">
          <div className="img">
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/wastelink/wastelink_logo1.png")}
            />
          </div>
          <span>Wastelink Pvt. Ltd.</span>
        </div>
        <div className="cardBody">
          <div className="userImage">
            <Image width={70} src={user?.emp.profileImage} />
          </div>
          <div className="userDetails">
            <div className="details">
              <span className="_title">Name</span>
              <span className="_val">{user?.emp.name}</span>
            </div>
            <div className="details">
              <span className="_title">Designation</span>
              <span className="_val">{user?.emp.role}</span>
            </div>
            <div className="details">
              <span className="_title">Mobile</span>
              <span className="_val">{user?.emp.mobile}</span>
            </div>
            <div className="details">
              <span className="_title">DOB</span>
              <span className="_val">{user?.emp.dob}</span>
            </div>
            <div className="details">
              <span className="_title">Blood Group</span>
              <span className="_val">AB+</span>
            </div>
          </div>

          <div className="userBarocde">
            <Image width={100} src={user?.qrImg} />
          </div>
        </div>
        <div className="cardFooter">
          <span>
            1238 Rai Industrial Estate, Sector 38, Sonipat, Haryana 131029
          </span>
        </div>
      </div>
    </div>
  );
}

export default EmpQrCode;
