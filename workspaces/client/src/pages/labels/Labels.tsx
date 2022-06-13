import type { Label } from "@br/core";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Skeleton } from "@chakra-ui/react";

import { MetaTags, Search, CardList } from "components";
import { useFetch, useSearch } from "hooks";
import { getLabels, addLabelId } from "services/labels";

export default function Labels(): JSX.Element {
  const navigate = useNavigate();
  const [labels, setLabels] = useState<Label[]>([]);

  const { fetch, isLoading } = useFetch();
  const { results } = useSearch<Label[]>(labels);

  const handleNewLabel = async (labelId: string): Promise<void> => {
    const newLabel = await addLabelId(labelId);
    if (newLabel) navigate(`/label/${newLabel.id}`);
  };

  useEffect(() => {
    fetch<Label[]>(getLabels).then((labels) => {
      labels && setLabels(labels);
    });
  }, []);

  return (
    <>
      <MetaTags title="Labels" />

      <Flex justify="space-between" alignItems="center" mb={8}>
        {isLoading && (
          <Skeleton width="110px" h="1.5rem" startColor="gray.800" endColor="gray.700" />
        )}

        {!isLoading && (
          <Heading as="h2" size="md">
            {results.length} Labels
          </Heading>
        )}

        <Search placeholder="Search in labels" />
      </Flex>

      <CardList
        datas={results}
        size="md"
        type="label"
        isLoading={isLoading}
        onNew={handleNewLabel}
      />
    </>
  );
}
