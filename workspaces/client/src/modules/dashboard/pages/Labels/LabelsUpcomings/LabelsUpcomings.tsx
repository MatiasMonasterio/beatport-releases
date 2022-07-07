import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Heading, Skeleton } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useFetch } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getLabelUpcomings } from "@/dashboard/services/labels";

export default function LabelsUpcomings(): JSX.Element {
  const [upcomings, setUpcomings] = useState<Track[]>([]);
  const { fetch, isLoading } = useFetch();

  useEffect(() => {
    fetch<Track[]>(getLabelUpcomings).then((upcomings) => {
      upcomings && setUpcomings(upcomings);
    });
  }, []);

  return (
    <>
      <MetaTags title="Labels Upcoming" />

      {isLoading && (
        <Skeleton width="110px" h="1.5rem" startColor="gray.800" endColor="gray.700" mb={4} />
      )}

      {!isLoading && (
        <Heading as="h2" size="lg" mb={4}>
          {upcomings.length} Upcoming
        </Heading>
      )}

      <TrackList tracks={upcomings} isLoading={isLoading} />
    </>
  );
}
