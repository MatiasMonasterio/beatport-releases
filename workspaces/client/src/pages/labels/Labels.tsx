import type { Label } from "@br/core";

import { useState, useEffect } from "react";
import { Container, Flex, Heading, Grid, GridItem } from "@chakra-ui/react";

import { MetaTags, AddLabel, LabelCard } from "components";
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
    <>
      <MetaTags title="Labels" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Flex justify="space-between">
          <Heading as="h2" size="md" mb={8}>
            Labels
          </Heading>
          <AddLabel handleAddLabel={handleAddLabel} />
        </Flex>

        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(150px, 1fr))",
            sm: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
          gap={2}
        >
          {labels.map((label) => (
            <GridItem key={label.id}>
              <LabelCard {...label} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );
}
