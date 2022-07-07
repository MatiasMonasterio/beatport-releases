import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import { SecondNavbar } from "@/dashboard/components";

const accountRoutes = [
  { path: "/account", name: "Profile" },
  { path: "/account/settings", name: "Settings" },
];

export default function AccountLayout() {
  return (
    <>
      <Container maxW="container.xl">
        <SecondNavbar routes={accountRoutes} />
      </Container>

      <Container maxW="container.lg">
        <Outlet />
      </Container>
    </>
  );
}
