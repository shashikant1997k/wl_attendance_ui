import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_helpers";

export function Header() {
  const location = useLocation();

  const [title, setTitle] = useState("");

  useEffect(() => {
    let path_name = location?.pathname ? location?.pathname : "";
    let name = "";
    if (path_name && path_name.includes("-")) {
      path_name = String(path_name)
        .split("/")
        .pop();
      name = String(path_name)
        .split("-")
        .join(" ");
    } else {
      name = String(path_name)
        .split("/")
        .pop();
    }

    setTitle(name);
  }, [location.pathname]);

  return (
    <>
      <div className="header">
        <div className="page_title">
          <span>{title}</span>
        </div>
        {/* <NavLink to="/employee-register">
          <Button>Add Employee</Button>
        </NavLink> */}
      </div>
    </>
  );
}
