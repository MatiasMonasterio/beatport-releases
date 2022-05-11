import type { Label } from "types";

import { useState, useEffect } from "react";
import { Container, Flex, Heading, Grid, GridItem } from "@chakra-ui/react";

import { AddLabel, LabelCard } from "components";
import { getLabels, addLabelId } from "services/labels";

export default function Labels(): JSX.Element {
  const [labels, setLabels] = useState<Label[]>([]);

  const handleAddLabel = async (beatport: string): Promise<void> => {
    const newLabel = await addLabelId(beatport);
    newLabel && setLabels((labels) => [...labels, newLabel]);
  };

  useEffect(() => {
    getLabels().then((labels) => {
      labels && setLabels(labels);
    });
  }, []);

  return (
    <Container maxW="container.xl">
      <Flex justify="space-between" mt={24}>
        <Heading as="h2" size="lg" mb={10}>
          Labels
        </Heading>

        <AddLabel handleAddLabel={handleAddLabel} />
      </Flex>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
        {labels.map((label) => (
          <GridItem key={label.id}>
            <LabelCard {...label} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}