import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { RoutesWithNotFound } from "hocs";
import { AuthorizationProvider } from "contexts/authorization";

const DashboardRoutes = lazy(() => import("@/dashboard/routes"));
const AuthRoutes = lazy(() => import("@/auth/routes"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthorizationProvider>
        <Suspense fallback={null}>
          <RoutesWithNotFound>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/*" element={<DashboardRoutes />} />
          </RoutesWithNotFound>
        </Suspense>
      </AuthorizationProvider>
    </BrowserRouter>
  );
}
