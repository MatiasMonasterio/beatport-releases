import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { SecondNavbar } from "@/dashboard/components";

const labelsRoutes = [
  { path: "/labels", name: "All" },
  { path: "/labels/releases", name: "Releases" },
  { path: "/labels/upcomings", name: "Upcomings" },
];

export default function LabelsLayout() {
  return (
    <>
      <SecondNavbar routes={labelsRoutes} />
      <Container maxW="container.xl">
        <Outlet />
      </Container>
    </>
  );
}
