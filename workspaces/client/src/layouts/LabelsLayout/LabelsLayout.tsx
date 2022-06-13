import { Container } from "@chakra-ui/react";
import { SecondNavbar } from "components";

interface Props {
  children: React.ReactNode;
}

const labelsRoutes = [
  { path: "/labels", name: "All" },
  { path: "/labels/releases", name: "Releases" },
  { path: "/labels/upcomings", name: "Upcomings" },
];

export default function LabelsLayout({ children }: Props) {
  return (
    <>
      <SecondNavbar routes={labelsRoutes} />
      <Container maxW="container.xl">{children}</Container>
    </>
  );
}
