import { VStack, Skeleton } from "@chakra-ui/react";

interface Props {
  height: number | { base: number; sm: number };
}

export default function CardLoader({ height }: Props) {
  return (
    <VStack w="100%">
      <Skeleton height={height} w="100%" borderRadius="lg" />

      <VStack gap={0} alignItems="left" w="100%">
        <Skeleton width="120px" height="1rem" />
        <Skeleton width="60px" height="0.8rem" />
      </VStack>
    </VStack>
  );
}
