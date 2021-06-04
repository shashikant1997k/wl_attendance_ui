/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_wastelink/_helpers";
import { ContentRoute } from "../../../../_wastelink/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_wastelink/_assets/sass/pages/login/auth-page.scss";

export function AuthPage() {
  return (
    <>
      {/*begin::Login*/}
      <div className="login ">
        {/*begin::Aside*/}
        <div
          className="login-aside"
          style={{
            backgroundImage: `url(${toAbsoluteUrl(
              "/media/wastelink/login-page-bg.jpeg"
            )})`,
          }}
        >
          {/*begin: Aside Container*/}
          <div className="aside-content">
            {/* start:: Aside header */}
            <Link to="/" className="wastelink_logo_link">
              <img
                alt="Logo"
                src={toAbsoluteUrl("/media/wastelink/wastelink_logo.svg")}
              />
            </Link>
            {/* end:: Aside header */}

            {/* start:: Aside content */}
            <div className="aside-text">
              <h3>Welcome to Wastelink!</h3>
              <p>The ultimate Reverse logistics Platform.</p>
            </div>
            {/* end:: Aside content */}

            {/* start:: Aside footer for desktop */}
            <div className="footer-content-desktop">
              <div className="copyright">&copy; 2020 Wastelink</div>
              <div className="footer-link">
                <Link to="/terms" className="privacy">
                  Privacy
                </Link>
                <Link to="/terms" className="leagal">
                  Legal
                </Link>
                <Link to="/terms" className="contact">
                  Contact
                </Link>
              </div>
            </div>
            {/* end:: Aside footer for desktop */}
          </div>
          {/*end: Aside Container*/}
        </div>
        {/*begin::Aside*/}

        {/* begin::Content body */}
        <div className="d-flex all-pages">
          <Switch>
            <ContentRoute path="/auth/login" component={Login} />
            <ContentRoute path="/auth/registration" component={Registration} />
            <ContentRoute
              path="/auth/forgot-password"
              component={ForgotPassword}
            />
            <Redirect from="/auth" exact={true} to="/auth/login" />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
        {/*end::Content*/}

        {/* start:: Aside footer for mobile */}
        <div className="footer-content-mobile d-none">
          <div className="copyright">&copy; 2020 Wastelink</div>
          <div className="footer-link">
            <Link to="/terms" className="privacy">
              Privacy
            </Link>
            <Link to="/terms" className="leagal">
              Legal
            </Link>
            <Link to="/terms" className="contact">
              Contact
            </Link>
          </div>
        </div>
        {/* end:: Aside footer for mobile */}
      </div>
      {/*end::Login*/}
    </>
  );
}
