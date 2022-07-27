import type { Type } from "../../types";

import { useRef } from "react";
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

import { useHttpRequest } from "hooks";

interface Props {
  type: Type;
  isOpen: boolean;
  onClose: () => void;
  onNewCard: (id: string) => Promise<void>;
}

export default function DialogForm({ type, isOpen, onClose, onNewCard }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { callRequest, isLoading } = useHttpRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const target = form.elements as typeof form.elements & {
      id_value: { value: string };
    };

    const id = target.id_value.value;
    await callRequest(async () => await onNewCard(id));
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={inputRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent textAlign="center" pt={6} bgColor="secondary.black.800">
        <AlertDialogHeader color="secondary.gray.100">
          Please entry the beatport {type} ID
        </AlertDialogHeader>

        <AlertDialogCloseButton />

        <chakra.form onSubmit={handleSubmit}>
          <AlertDialogBody>
            <Input placeholder="id" name="id_value" ref={inputRef} />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              isLoading={isLoading}
              loadingText="Loading..."
              type="submit"
              bgColor="secondary.pink"
              color="secondary.gray.200"
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
