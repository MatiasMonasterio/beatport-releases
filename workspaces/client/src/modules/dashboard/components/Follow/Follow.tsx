import { useState } from "react";
import { Button, Spinner, HStack } from "@chakra-ui/react";

import { useHttpRequest } from "hooks";

export interface Props {
  isFollowing: boolean;
  onFollow: (isFollowing: boolean) => Promise<void>;
}

export default function Follow({ isFollowing, onFollow }: Props): JSX.Element {
  const [isFollowingState, setIsFollowingState] = useState<boolean>(isFollowing);
  const { callRequest, isLoading } = useHttpRequest();

  const handleClick = () => {
    callRequest(async () => onFollow(isFollowingState)).then(() => {
      setIsFollowingState(!isFollowingState);
    });
  };

  return (
    <HStack>
      <Button
        onClick={handleClick}
        variant={isFollowingState ? "solid" : "outline"}
        fontSize="sm"
        color="secondary.gray.100"
        size="xs"
        colorScheme={isFollowingState ? "green" : "white"}
        disabled={isLoading}
      >
        {isFollowingState ? "Following" : "Follow"}
      </Button>

      {isLoading && <Spinner size="sm" />}
    </HStack>
  );
}
