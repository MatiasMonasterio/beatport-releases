import { Heading, Skeleton } from "@chakra-ui/react";

import { useGetInitialData } from "hooks";
import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getLabelReleases } from "@/dashboard/services/labels";

export default function LabelsReleases(): JSX.Element {
  const { data: releases, isLoading } = useGetInitialData({
    request: getLabelReleases,
    defaultValue: [],
  });

  return (
    <>
      <MetaTags title="Labels Releases" />

      {isLoading && <Skeleton width="110px" h="1.5rem" mb={4} />}

      {!isLoading && (
        <Heading as="h2" size="lg" mb={4}>
          {releases.length} Releases
        </Heading>
      )}

      <TrackList tracks={releases} isLoading={isLoading} />
    </>
  );
}
