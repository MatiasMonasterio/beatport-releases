import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { RoutesWithNotFound } from "hocs";

const DashboardRoutes = lazy(() => import("@/dashboard/routes"));
const AuthRoutes = lazy(() => import("@/auth/routes"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <RoutesWithNotFound>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<DashboardRoutes />} />
        </RoutesWithNotFound>
      </Suspense>
    </BrowserRouter>
  );
}
