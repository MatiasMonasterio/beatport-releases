import { Route } from "react-router-dom";

import { RoutesWithNotFound } from "hocs";
import { AuthLayout } from "@/auth/layouts";

import Login from "@/auth/pages/Login";
import Register from "@/auth/pages/Register";

export default function AuthRoutes() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </RoutesWithNotFound>
  );
}
