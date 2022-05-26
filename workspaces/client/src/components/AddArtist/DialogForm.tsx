import type { Props as AddArtistProps } from "./AddArtist";

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

interface Props extends AddArtistProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DialogForm({ isOpen, onClose, handleAddArtist }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const target = form.elements as typeof form.elements & {
      artist_id: { value: string };
    };

    const artistId = target.artist_id.value;

    setLoading(true);
    await handleAddArtist(artistId);
    setLoading(false);
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={inputRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent textAlign="center" pt={6}>
        <AlertDialogHeader>Please entry the beatport artist ID</AlertDialogHeader>

        <AlertDialogCloseButton />

        <chakra.form onSubmit={handleSubmit}>
          <AlertDialogBody>
            <Input placeholder="ID" name="artist_id" ref={inputRef} />
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
