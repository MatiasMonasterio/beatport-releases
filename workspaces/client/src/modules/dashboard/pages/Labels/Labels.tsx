import type { Label } from "@br/core";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Skeleton } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useHttpRequest } from "hooks";

import { Search, CardList } from "@/dashboard/components";
import { useSearch } from "@/dashboard/hooks";
import { getLabels, addLabelId } from "@/dashboard/services/labels";

export default function Labels(): JSX.Element {
  const navigate = useNavigate();
  const [labels, setLabels] = useState<Label[]>([]);

  const { callRequest, isLoading } = useHttpRequest();
  const { results } = useSearch<Label>(labels);

  const handleNewLabel = async (labelId: string): Promise<void> => {
    const newLabel = await addLabelId(labelId);
    if (newLabel) navigate(`/label/${newLabel.id}`);
  };

  useEffect(() => {
    callRequest(getLabels).then((labels) => {
      setLabels(labels);
    });
  }, []);

  return (
    <>
      <MetaTags title="Labels" />

      <Flex justify="space-between" alignItems="center" mb={8}>
        {isLoading && <Skeleton width="110px" h="1.5rem" />}

        {!isLoading && (
          <Heading as="h2" size="lg">
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
