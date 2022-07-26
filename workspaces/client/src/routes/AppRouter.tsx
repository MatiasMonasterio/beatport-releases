import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { RoutesWithNotFound, PrivateRoutes, PublicRoutes } from "hocs";
import { AuthorizationProvider } from "contexts/authorization";

const DashboardRoutes = lazy(() => import("@/dashboard/routes"));
const AuthRoutes = lazy(() => import("@/auth/routes"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthorizationProvider>
        <Suspense fallback={null}>
          <RoutesWithNotFound>
            <Route
              path="/auth/*"
              element={
                <PublicRoutes>
                  <AuthRoutes />
                </PublicRoutes>
              }
            />

            <Route
              path="/*"
              element={
                <PrivateRoutes>
                  <DashboardRoutes />
                </PrivateRoutes>
              }
            />
          </RoutesWithNotFound>
        </Suspense>
      </AuthorizationProvider>
    </BrowserRouter>
  );
}
