import { lazy } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { RoutesWithNotFound } from "hocs";

const DashboardRoutes = lazy(() => import("@/dashboard/routes"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/*" element={<DashboardRoutes />} />
      </RoutesWithNotFound>
    </BrowserRouter>
  );
}
