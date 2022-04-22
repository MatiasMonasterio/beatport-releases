import { ChakraProvider } from "@chakra-ui/react";
import { HelloWord } from "components";

function App() {
  return (
    <ChakraProvider>
      <HelloWord />
    </ChakraProvider>
  );
}

export default App;
