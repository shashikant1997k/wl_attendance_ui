import React, { useMemo } from "react";
import { AsideMenuList } from "./AsideMenuList";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { NavLink } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../../../../app/modules/Auth/_redux/authReducer";

export function AsideMenu({ disableScroll }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true),
    };
  }, [uiService]);

  let token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
      accessToken: token,
    });
  };

  return (
    <>
      {/* begin::Menu Container */}
      <div
        id="kt_aside_menu"
        data-menu-vertical="1"
        className={`aside-menu my-4 ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >
        <AsideMenuList layoutProps={layoutProps} />

        <ul className={`menu-nav`}>
          {/*begin::1 Level*/}
          <li className={`menu-item`} aria-haspopup="true">
            <div className="menu-link" onClick={logout}>
              <span className="svg-icon menu-icon">
                <ExportOutlined />
              </span>
              <span className="menu-text">Logout</span>
            </div>
          </li>
          {/*end::1 Level*/}
        </ul>
      </div>
      {/* end::Menu Container */}
    </>
  );
}
