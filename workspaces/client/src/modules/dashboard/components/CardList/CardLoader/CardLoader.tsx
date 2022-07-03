import { VStack, Skeleton } from "@chakra-ui/react";

interface Props {
  height: number | { base: number; sm: number };
}

export default function CardLoader({ height }: Props) {
  return (
    <VStack w="100%">
      <Skeleton
        height={height}
        startColor="gray.800"
        endColor="gray.700"
        w="100%"
        borderRadius="lg"
      />

      <VStack gap={0} alignItems="left" w="100%">
        <Skeleton width="120px" height="1.2rem" startColor="gray.800" endColor="gray.700" />
        <Skeleton width="60px" height="0.9rem" startColor="gray.800" endColor="gray.700" />
      </VStack>
    </VStack>
  );
}
