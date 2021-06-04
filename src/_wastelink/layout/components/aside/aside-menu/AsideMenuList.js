/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import {
  UnorderedListOutlined,
  PlusOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";

export function AsideMenuList({ layoutProps }) {
  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item`} aria-haspopup="true">
          <NavLink className="menu-link commonButton" to="/employee-register">
            <span className="svg-icon menu-icon">
              <PlusOutlined />
            </span>
            <span className="menu-text">Add Employee</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li className={`menu-item`} aria-haspopup="true">
          <NavLink className="menu-link commonButton" to="/employee-list">
            <span className="svg-icon menu-icon">
              <UnorderedListOutlined />
            </span>
            <span className="menu-text">Employee List</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li className={`menu-item`} aria-haspopup="true">
          <NavLink className="menu-link commonButton" to="/scan-qrcode">
            <span className="svg-icon menu-icon">
              <QrcodeOutlined />
            </span>
            <span className="menu-text">Scan Qrcode</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
