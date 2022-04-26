import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "routes";

function App() {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
