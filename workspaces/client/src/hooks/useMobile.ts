import { useMediaQuery } from "@chakra-ui/react";

export default function useMobile() {
  const [IsMobile] = useMediaQuery("(max-width: 479px)");
  return IsMobile;
}
