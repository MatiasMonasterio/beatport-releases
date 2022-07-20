import { Button, Spinner, HStack } from "@chakra-ui/react";

export interface Props {
  isLoading?: boolean;
  isFollowing: boolean;
  onClick: () => void;
}

export default function Follow({ isFollowing, isLoading, onClick }: Props): JSX.Element {
  return (
    <HStack>
      <Button
        onClick={onClick}
        variant={isFollowing ? "solid" : "outline"}
        fontSize="sm"
        color="secondary.gray.100"
        size="xs"
        colorScheme={isFollowing ? "green" : "white"}
        disabled={isLoading}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>

      {isLoading && <Spinner size="sm" />}
    </HStack>
  );
}
