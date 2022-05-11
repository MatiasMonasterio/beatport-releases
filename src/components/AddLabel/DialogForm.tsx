import type { Props as AddLabelProps } from "./AddLabel";

import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Input,
  chakra,
} from "@chakra-ui/react";

interface Props extends AddLabelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DialogForm({ isOpen, onClose, handleAddLabel }: Props): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const target = form.elements as typeof form.elements & {
      label_id: { value: string };
    };

    const labelId = target.label_id.value;

    setLoading(true);
    await handleAddLabel(labelId);
    setLoading(false);
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={inputRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent textAlign="center" pt={6}>
        <AlertDialogHeader>Please entry the beatport label ID</AlertDialogHeader>

        <AlertDialogCloseButton />

        <chakra.form onSubmit={handleSubmit}>
          <AlertDialogBody>
            <Input placeholder="ID" name="label_id" ref={inputRef} />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              isLoading={isLoading}
              loadingText="Loading..."
              type="submit"
              colorScheme="gray"
              ml={3}
            >
              Submit
            </Button>
          </AlertDialogFooter>
        </chakra.form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
