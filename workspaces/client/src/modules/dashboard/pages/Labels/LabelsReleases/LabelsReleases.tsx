import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Heading, Skeleton } from "@chakra-ui/react";

import { useFetch } from "hooks";
import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getLabelReleases } from "@/dashboard/services/labels";

export default function LabelsReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);
  const { fetch, isLoading } = useFetch();

  useEffect(() => {
    fetch<Track[]>(getLabelReleases).then((releases) => {
      releases && setReleases(releases);
    });
  }, []);

  return (
    <>
      <MetaTags title="Labels Releases" />

      {isLoading && (
        <Skeleton width="110px" h="1.5rem" startColor="gray.800" endColor="gray.700" mb={4} />
      )}

      {!isLoading && (
        <Heading as="h2" size="md" mb={4}>
          {releases.length} Releases
        </Heading>
      )}

      <TrackList tracks={releases} isLoading={isLoading} />
    </>
  );
}
