import { Heading } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function SidebarTitle({ children }: Props) {
  return (
    <Heading fontSize="xs" color="secondary.gray.700" fontWeight="normal" px={2} mb={2}>
      {children}
    </Heading>
  );
}
