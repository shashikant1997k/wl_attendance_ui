import React, { useEffect, useState } from "react";
import "../../../_wastelink/_assets/sass/pages/Employee/employee-list.scss";
import {
  Table,
  Dropdown,
  Button,
  Menu,
  Image,
  Input,
  DatePicker,
  Tag,
  Popover,
} from "antd";
import {
  EditFilled,
  DownloadOutlined,
  DeleteFilled,
  UserSwitchOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import QRCode from "qrcode";
import moment from "moment";
import $ from "jquery";
import baseURL from "../../baseurl";

const { Search } = Input;
const { RangePicker } = DatePicker;

function EmployeeList() {
  const history = useHistory();
  const [loading, setloading] = useState(true);
  const generateQrCode = async (val) => {
    try {
      const res = await QRCode.toDataURL(val);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const employeeDetails = (val) => {
    history.push("/employee-details", val);
  };

  const handleMenuClick = (e, rowItem) => {
    if (e.key === "1") {
      generateQrCode(rowItem.empID).then((val) => {
        let obj = {
          emp: rowItem,
          qrImg: val,
        };
        history.push("/employee-QRCode", obj);
      });
    } else if (e.key === "2") {
      history.push("/employee-edit", rowItem);
    } else if (e.key === "3") {
      let st = e.item.props.status === "Active" ? 1 : 0;
      let temp = item.filter((v) => v.id === rowItem.id);
      fetch(`${baseURL}/employeeList/${rowItem.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...temp[0], isActive: st }),
      })
        .then((res) => res.json())
        .then((data) => {
          let temp = item.map((v) => {
            if (v.id === data.id) {
              return data;
            } else {
              return v;
            }
          });
          setItem(temp);
          setloading(false);
        });
    } else if (e.key === "4") {
      fetch(`${baseURL}/employeeList/${rowItem.id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          let temp = item.filter((v) => v.id !== rowItem.id);
          setItem(temp);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (e.key === "5") {
      employeeDetails(rowItem);
    }
  };

  const menu = (rowData) => {
    return (
      <Menu className="goto_menu" onClick={(e) => handleMenuClick(e, rowData)}>
        <Menu.Item
          className="d-flex align-items-center justify-content-start"
          key="5"
        >
          <UserOutlined />
          <div className="menuItem">Employee Details</div>
        </Menu.Item>
        {/* <Menu.Divider /> */}
        <Menu.Item
          className="d-flex align-items-center justify-content-start"
          key="1"
        >
          <DownloadOutlined />
          <div className="menuItem">Download card</div>
        </Menu.Item>
        {/* <Menu.Divider /> */}
        <Menu.Item
          className="d-flex align-items-center justify-content-start"
          key="2"
        >
          <EditFilled />
          <div className="menuItem">Edit Details</div>
        </Menu.Item>
        {/* <Menu.Divider /> */}
        <Menu.Item
          className="d-flex align-items-center justify-content-start"
          key="3"
          status={rowData.isActive === "0" ? "Active" : "Inactive"}
        >
          <UserSwitchOutlined />
          <div className="menuItem">
            {rowData.isActive === "0" ? "Active" : "Inactive"}
          </div>
        </Menu.Item>
        {/* <Menu.Divider /> */}
        <Menu.Item
          className="d-flex align-items-center justify-content-start"
          key="4"
        >
          <DeleteFilled />
          <div className="menuItem">Delete</div>
        </Menu.Item>
      </Menu>
    );
  };

  const actionElemet = (rowData) => {
    return (
      <Dropdown overlay={menu(rowData)} trigger={["click"]}>
        <Button>
          <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
        </Button>
      </Dropdown>
    );
  };
  const columns = [
    {
      title: "EMP ID",
      dataIndex: "empID",
      className: "empID",
      key: "empID",
    },
    {
      title: "IMAGE",
      dataIndex: "empImage",
      key: "0",
    },
    {
      title: "NAME",
      dataIndex: "empName",
      key: "1",
    },
    { title: "EMAIL", dataIndex: "email", key: "3" },
    { title: "MOBILE", dataIndex: "mobile", key: "4" },
    { title: "BRANCH", dataIndex: "branch", key: "branch" },
    {
      title: "Date of joining",
      dataIndex: "dateOfJoin",
      key: "7",
    },
    { title: "Designation", dataIndex: "designation", key: "8" },
    { title: "Status", dataIndex: "status", key: "8" },
    { title: "Action", dataIndex: "action", key: "9" },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [item, setItem] = useState([]);
  const [item1, setItem1] = useState([]);
  useEffect(() => {
    // async function getData() {
    //   try {
    //     const res = await axios.get("http://127.0.0.1:8000/api/register/");
    //     setItem(res);
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getData();

    fetch(`${baseURL}/register/`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setItem1(data);
        setloading(false);
      });
  }, []);

  console.log(item);

  const data = loading
    ? []
    : item?.map((row, i) => ({
        key: i,
        empID: <div onClick={() => employeeDetails(row)}>{row.empID}</div>,
        empImage: (
          <>
            <Image width={50} src={row.profileImage} />
          </>
        ),
        empName: row.name,
        email: row.email,
        mobile: row.mobile,
        branch: row.branch,
        dateOfJoin: moment(row.date_joined).format("ll"),
        designation: row.role,
        status:
          row.isActive === "1" ? (
            <Tag color="#108ee9">Active</Tag>
          ) : (
            <Tag color="#C50">Inactive</Tag>
          ),
        action: actionElemet(row),
      }));

  const onSearch = (value) => {
    console.log(value);
  };

  const handleSearch = (e) => {
    let input = e.target.value;
    let temp = item1.filter(
      (v) =>
        v.name.toLowerCase().includes(input.toLowerCase()) ||
        v.empID.toLowerCase().includes(input.toLowerCase()) ||
        v.email.toLowerCase().includes(input.toLowerCase()) ||
        v.branch.toLowerCase().includes(input.toLowerCase()) ||
        v.mobile.includes(input)
    );

    setItem(temp);
  };

  const handleRangePicker = (e) => {
    if (e !== null) {
      let temp = item1.filter((v) =>
        moment(v.date_joined).isBetween(e[0]["_d"], e[1]["_d"])
      );
      setItem(temp);
    } else {
      setItem(item1);
    }
  };

  const headItem = [
    "Emp ID",
    "Name",
    "Email",
    "Mobile",
    "Date Of Joining",
    "Role",
    "Branch",
    "DOB",
    "Active",
    "Address",
    "Aadhar",
    "Pancard",
    "Bank Name",
    "Account Number",
    "IFSC Code",
  ];

  const exportExcel = () => {
    let trData = ``;
    let thData = ``;

    let tb1 = `<tr>
                  <td colspan="15"></td>
              </tr>`;

    headItem.forEach((v) => {
      thData += `<td style="border:1px solid black;font-weight:600;text-align:center;">${v}</td>`;
    });
    trData += `<tr>${thData}</tr>`;
    item.forEach((val) => {
      let tdData = ``;
      tdData = `<td style="vertical-align:middle;padding:5px;">${val.empID}</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.name
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.email
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.mobile
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${moment(
                    val.date_joined
                  ).format("ll")}</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.role
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.branch
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${moment(
                    val.dob
                  ).format("ll")}</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.isActive ? "Active" : "Inactive"
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.address
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.aadharNumber
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.pancard
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.bankname
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.accountNumber
                  }</td>
                  <td style="vertical-align:middle;padding:5px;">${
                    val.IFSCCode
                  }</td>`;

      trData += `<tr>${tdData}</tr>`;
    });

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

  const totalEmpToolTip = (
    <div className="_empToolTip">
      <div className="d-flex flex-row">
        <p className="_tit">Rai</p>
        <p className="mb-0 ml-4 _val">
          {item?.filter((v) => v.branch === "Rai Unit").length}
        </p>
      </div>
      <div className="d-flex flex-row">
        <p className="_tit">Lucknow</p>
        <p className="mb-0 ml-4 _val">
          {item?.filter((v) => v.branch === "Lucknow Unit").length}
        </p>
      </div>
      <div className="d-flex flex-row">
        <p className="_tit">Mumbai</p>
        <p className="mb-0 ml-4 _val">
          {item?.filter((v) => v.branch === "Mumbai Unit").length}
        </p>
      </div>
    </div>
  );

  const activeEmpToolTip = (
    <div className="_empToolTip">
      <div className="d-flex flex-row">
        <p className="_tit">Rai</p>
        <p className="mb-0 ml-4 _val">
          {
            item?.filter((v) => v.branch === "Rai Unit" && v.isActive === "1")
              .length
          }
        </p>
      </div>
      <div className="d-flex flex-row">
        <p className="_tit">Lucknow</p>
        <p className="mb-0 ml-4 _val">
          {
            item?.filter(
              (v) => v.branch === "Lucknow Unit" && v.isActive === "1"
            ).length
          }
        </p>
      </div>
      <div className="d-flex flex-row">
        <p className="_tit">Mumbai</p>
        <p className="mb-0 ml-4 _val">
          {
            item?.filter(
              (v) => v.branch === "Mumbai Unit" && v.isActive === "1"
            ).length
          }
        </p>
      </div>
    </div>
  );

  const inActiveEmpToolTip = (
    <div className="_empToolTip">
      <div className="d-flex flex-row">
        <p className="_tit">Rai</p>
        <p className="mb-0 ml-4 _val">
          {
            item?.filter((v) => v.branch === "Rai Unit" && v.isActive === "0")
              .length
          }
        </p>
      </div>
      <div className="d-flex flex-row">
        <p className="_tit">Lucknow</p>
        <p className="mb-0 ml-4 _val">
          {
            item?.filter(
              (v) => v.branch === "Lucknow Unit" && v.isActive === "0"
            ).length
          }
        </p>
      </div>
      <div className="d-flex flex-row">
        <p className="_tit">Mumbai</p>
        <p className="mb-0 ml-4 _val">
          {
            item?.filter(
              (v) => v.branch === "Mumbai Unit" && v.isActive === "0"
            ).length
          }
        </p>
      </div>
    </div>
  );

  return (
    <div className="employeeList">
      <div className="tableToExcel" style={{ display: "none" }}></div>
      <div className="expBtn d-flex justify-content-end mb-4">
        <Button onClick={exportExcel}>Export</Button>
      </div>
      <div className="empSummary">
        <div className="row ">
          <div className="col-sm-4 col-6">
            <div className="d-flex flex-column">
              <p className="_tit">Total Employee</p>
              <div className="d-flex flex-row align-items-center">
                <p className="mb-0 _val">{item?.length}</p>
                <Popover
                  placement="bottomLeft"
                  content={totalEmpToolTip}
                  title="Total Employee"
                  trigger="click"
                  className="_popover"
                >
                  <CaretDownOutlined />
                </Popover>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-6">
            <div className="d-flex flex-column">
              <p className="_tit">Active Employee</p>

              <div className="d-flex flex-row align-items-center">
                <p className="mb-0 _val">
                  {item?.filter((v) => v.isActive === "1").length}
                </p>
                <Popover
                  placement="bottomLeft"
                  content={activeEmpToolTip}
                  title="Active Employee"
                  trigger="click"
                >
                  <CaretDownOutlined />
                </Popover>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-6">
            <div className="d-flex flex-column">
              <p className="_tit">Inactive Employee</p>
              <div className="d-flex flex-row align-items-center">
                <p className="mb-0 _val">
                  {item?.filter((v) => v.isActive === "0").length}
                </p>
                <Popover
                  placement="bottomLeft"
                  content={inActiveEmpToolTip}
                  title="Inactive Employee"
                  trigger="click"
                >
                  <CaretDownOutlined />
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="filter">
        <RangePicker onChange={handleRangePicker} />
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          onChange={handleSearch}
          style={{ width: 250 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        size="small"
        scroll={{ x: 1500 }}
      />
    </div>
  );
}

export default EmployeeList;
