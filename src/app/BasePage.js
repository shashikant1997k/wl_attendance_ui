import React, { lazy, Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_wastelink/layout";

import { DashboardPage } from "./pages/DashboardPage";

const EmployeeRegister = lazy(() =>
  import("./modules/Employee/EmployeeRegister")
);

const EmpQrCode = lazy(() => import("./modules/Employee/EmpQrCode"));
const EmployeeList = lazy(() => import("./modules/Employee/EmployeeList"));
const EmployeeProfile = lazy(() =>
  import("./modules/Employee/EmployeeProfile")
);

const EmployeeEdit = lazy(() => import("./modules/Employee/EmployeeEdit"));

const AttendanceChecker = lazy(() =>
  import("./modules/Dashboard/AttendanceChecker")
);

export default function BasePage() {
  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/" to="/dashboard" />
          }
          <ContentRoute exact path="/dashboard" component={DashboardPage} />

          <ContentRoute
            exact
            path="/employee-register"
            component={EmployeeRegister}
          />
          <ContentRoute exact path="/employee-QRCode" component={EmpQrCode} />
          <ContentRoute
            exact
            path="/scan-qrcode"
            component={AttendanceChecker}
          />
          <ContentRoute exact path="/employee-list" component={EmployeeList} />
          <ContentRoute
            exact
            path="/employee-details"
            component={EmployeeProfile}
          />
          <ContentRoute exact path="/employee-edit" component={EmployeeEdit} />
          <Redirect to="/error/error-v1" />
        </Switch>
      </Suspense>
    </>
  );
}
