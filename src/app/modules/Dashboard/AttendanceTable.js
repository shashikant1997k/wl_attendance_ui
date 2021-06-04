import React, { useEffect, useState } from "react";
import "../../../_wastelink/_assets/sass/pages/dashboard/attendance-table.scss";
import { DatePicker, Input, Button } from "antd";
// import empAttendance from "./attendanceData.json";
import moment from "moment";
import $ from "jquery";
import baseURL from "../../baseurl";

const { Search } = Input;

function AttendanceTable() {
  let daysInMonth = moment().daysInMonth();
  let monthArr = [];
  for (let i = 1; i <= daysInMonth; i++) {
    monthArr.push(i);
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const onSearch = (value) => console.log(value);
  const [item, setItem] = useState([]);
  const [item1, setItem1] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}/fetchAttendance/`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setItem1(data);
      });
  }, []);

  let arr1 = [];
  let idArr = [];
  item.forEach((val, ind) => {
    if (idArr.includes(val.empID)) {
      let a;
      arr1[idArr.indexOf(val.empID)]["date"].forEach((v, i) => {
        if (v.d === val.daydate) {
          a = i;
        }
      });

      arr1[idArr.indexOf(val.empID)]["date"][a] = {
        d: val.daydate,
        present: val.status,
        time: [val.timing_in, val.timing_out],
      };
    } else {
      let temp = {
        id: val.empID,
        name: val.empData.name,
        date: [
          {
            d: val.daydate,
            present: val.status,
            time: [val.timing_in, val.timing_out],
          },
        ],
      };
      monthArr.forEach((d, di) => {
        let curdate = moment(
          `${moment().year()}-${Number(moment().month()) + 1}-${d}`
        ).format("YYYY-MM-DD");

        temp["date"].push({
          d: curdate,
          present:
            moment().format("YYYY-MM-DD") >=
            moment(curdate).format("YYYY-MM-DD")
              ? moment(curdate, "YYYY-MM-DD").format("ddd") === "Sun"
                ? "L"
                : "A"
              : "N",
          time: [],
        });
      });
      idArr.push(val.empID);
      arr1.push(temp);
    }
  });

  // console.log(arr1);
  console.log(moment().format("MMMM YYYY"));

  arr1.map((val, ind) => {
    val["date"] = val["date"].map((v, i) => {
      if (arr1[ind]["date"][0]["d"] === v["d"] && i !== 0) {
        return {
          d: arr1[ind]["date"][0]["d"],
          present: arr1[ind]["date"][0]["present"],
          time: [
            arr1[ind]["date"][0]["time"][0],
            arr1[ind]["date"][0]["time"][1],
          ],
        };
      } else {
        return v;
      }
    });

    val["date"].shift();
    return {
      id: val.id,
      name: val.name,
      date: val["date"],
    };
  });

  const exportExcel = () => {
    let trData = ``;
    let thData = `<td style="border:1px solid black;font-weight:600;width:120px;vertical-align:middle;">Emp ID</td>
                  <td style="border:1px solid black;font-weight:600;width:200px;vertical-align:middle;">Name</td>`;

    let tb1 = `<tr>
                  <td colspan="33"></td>
                </tr>
                <tr>
                  <td colspan="33" style="font-weight:600;border-right:1px solid #000;background:white;font-size:22px;">Employee Attendance</td>
                </tr>
                <tr>
                  <td colspan="33" style="font-weight:600;border:none;background:white;text-align:left;">${moment().format(
                    "MMMM YYYY"
                  )}</td>
                </tr>
                <tr>
                <td colspan="33" style="font-weight:600;border-right:1px solid #000;background:white;"></td>
              </tr>`;

    monthArr.forEach((v) => {
      thData += `<td style="border:1px solid black;font-weight:600;width:85px;text-align:center;">${v}</td>`;
    });
    trData += `<tr>${thData}</tr>`;
    arr1.forEach((val) => {
      let tdData = ``;

      tdData += `<td style="width:120px;vertical-align:middle;">${val.id}</td><td style="width:200px;vertical-align:middle;">${val.name}</td>`;

      val.date.forEach((vals, ind) => {
        let temp = ``;
        if (vals["present"] === "P") {
          temp = `<div style="border-bottom: 1px solid #ccc;">
                    ${moment(vals.time[0], "HH:mm:ss").format("HH:mm")}
                  </div>
                  <div>
                    ${
                      vals.time[1] ? (
                        moment(vals.time[1], "HH:mm:ss").format("HH:mm")
                      ) : (
                        <span>-</span>
                      )
                    }
                  </div>`;
        } else if (vals["present"] === "A") {
          temp = `<span style="color: red;font-weight: 500;font-size: 1.1em;">A</span>`;
        } else if (vals["present"] === "L") {
          temp = `<span style="color: #ffb229;font-weight: 600;">Sun</span>`;
        } else {
          temp = `<span>-</span>`;
        }

        tdData += `<td key=${vals["d"]} style="width:85px;text-align:center;vertical-align:middle;">
                    <div style="padding:5px;">
                      ${temp}
                    </div>
                  </td>`;
      });

      trData += `<tr>${tdData}</tr>`;
    });

    // trData += `<tr><td colspan="100">${tb2}</td></tr>`;

    let finalTr = tb1 + "" + trData;

    $(".tableToExcel").html(finalTr);
    let tbl = $(".tableToExcel")[0];
    let uri = "data:application/vnd.ms-excel;base64,";
    let template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table style="border:1px solid black;">{table}</table></body></html>';

    let base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    let format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      });
    };

    var ctx = { worksheet: "Sheet1", table: tbl.innerHTML };
    window.location.href = uri + base64(format(template, ctx));
  };

  return (
    <div className="attendanceTable">
      <div className="tableToExcel" style={{ display: "none" }}></div>
      <div className="expBtn d-flex justify-content-end mb-4">
        <Button onClick={exportExcel}>Export</Button>
      </div>
      <div className="tableTop">
        <div className="con1">
          <div className="currMonth">{moment().format("MMMM YYYY")}</div>
          <div className="datePick">
            <DatePicker onChange={onChange} picker="month" />
          </div>
        </div>
        <div className="searchDiv">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              {monthArr.map((v) => (
                <th key={v}>{v}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {arr1.map((val, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{val.name}</td>
                {val.date.map((vals, ind) => (
                  <td key={vals["d"]}>
                    <div className="time">
                      {vals["present"] === "P" ? (
                        <>
                          <span className="brBtm">
                            {moment(vals.time[0], "HH:mm:ss").format("HH:mm")}
                          </span>
                          <span>
                            {vals.time[1] ? (
                              moment(vals.time[1], "HH:mm:ss").format("HH:mm")
                            ) : (
                              <span>-</span>
                            )}
                          </span>
                        </>
                      ) : vals["present"] === "A" ? (
                        <span className="absent">A</span>
                      ) : vals["present"] === "L" ? (
                        <span className="weekend">Sun</span>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              // moment(curdate, "YYYY-MM-DD").format("ddd")
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;
