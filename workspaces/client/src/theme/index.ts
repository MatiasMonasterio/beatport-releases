import { extendTheme } from "@chakra-ui/react";
import { green, solidBlack, purple, blue, pink, black, gray } from "./colors";

export default extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: black[900],
        color: gray[500],
      },
    },
  },
  colors: {
    primary: {
      green: green,
      black: solidBlack,
    },
    secondary: {
      purple: purple,
      blue: blue,
      pink: pink,
      black: black,
      gray: gray,
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: gray[100],
      },
    },
    Skeleton: {
      defaultProps: {
        startColor: black[600],
        endColor: black[900],
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderColor: black[700],
          _hover: { borderColor: black[500] },
          _active: { borderColor: black[500] },
          _placeholder: { color: gray[700] },
        },
      },
    },
    Button: {
      variants: {
        primary: {
          bgColor: pink,
          color: gray[200],
          fontWeight: "normal",
          fontSize: "sm",
          _hover: { bgColor: "#cf0358" },
          _active: { bgColor: "#c30252" },
        },
      },
    },
  },
});
