import { Suspense, lazy } from "react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const DialogForm = lazy(() => import("./DialogForm.js"));

export interface Props {
  handleAddLabel: (beatport: string) => Promise<void>;
}

export default function AddLabel({ handleAddLabel }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isOpen && (
        <Suspense fallback={null}>
          <DialogForm isOpen={isOpen} onClose={onClose} handleAddLabel={handleAddLabel} />
        </Suspense>
      )}

      <Button
        colorScheme="gray"
        px={10}
        fontSize="sm"
        variant="outline"
        color="default"
        onClick={onOpen}
      >
        Add label
      </Button>
    </>
  );
}
