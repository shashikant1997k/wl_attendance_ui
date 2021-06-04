import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true)
    };
  }, [uiService]);

  return (
    <div
      className={`footer`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">{today.toString()}</span> &copy;{" "}
          <NavLink to="/" className="copyright">
            Wastelink
          </NavLink>
        </div>
        <div className="nav nav-dark order-1 order-md-2">
          <a
            href="/"
            className="nav-link pr-3 pl-0"
          >
            About
          </a>
          <a
            href="/"
            className="nav-link px-3"
          >
            Team
          </a>
          <a
            href="/"
            className="nav-link pl-3 pr-0"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
