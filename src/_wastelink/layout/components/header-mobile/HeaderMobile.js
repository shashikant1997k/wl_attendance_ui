import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import objectPath from "object-path";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function HeaderMobile() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      headerMenuSelfDisplay:
        objectPath.get(uiService.config, "header.menu.self.display") === true,
      headerMobileCssClasses: uiService.getClasses("header_mobile", true),
      headerMobileAttributes: uiService.getAttributes("header_mobile"),
    };
  }, [uiService]);

  const location = useLocation();

  const [title, setTitle] = useState("");

  useEffect(() => {
    let path_name = location?.pathname ? location?.pathname : '';
    let name = '';
    if (path_name && path_name.includes("-")) {
      path_name = String(path_name).split("/").pop();
      name = String(path_name).split("-").join(" ");
    } else {
      name = String(path_name).split("/").pop();
    }

    setTitle(name);
  }, [location.pathname])

  return (
    <>
      {/*begin::Header Mobile*/}
      <div
        id="kt_header_mobile"
        className={`header-mobile align-items-center ${layoutProps.headerMobileCssClasses}`}
        {...layoutProps.headerMobileAttributes}
      >

        <div className="header_left d-flex flex-row">
          {/*begin::Logo*/}
          <Link to="/">
              <img alt="logo" src={toAbsoluteUrl("/media/wastelink/w_logo.svg")} />
            </Link>
          {/*end::Logo*/}
          <div className="page_title">
            <span>{title}</span>
          </div>
        </div>

        {/*begin::Toolbar*/}
        <div className="d-flex align-items-center">
          {layoutProps.asideDisplay && (
            <>
              {/*begin::Aside Mobile Toggle*/}
              <button
                className="btn p-0 burger-icon burger-icon-left header__hamburger"
                id="kt_aside_mobile_toggle"
              >
                <div></div>
                <div></div>
                <div></div>
              </button>
              {/*end::Aside Mobile Toggle*/}
            </>
          )}

        </div>
        {/*end::Toolbar*/}
      </div>
      {/*end::Header Mobile*/}
    </>
  );
}
