import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Heading, Skeleton } from "@chakra-ui/react";

import { useFetch } from "hooks";
import { MetaTags, TrackList } from "components";
import { getLabelUpcomings } from "services/labels";

export default function LabelUpcomings(): JSX.Element {
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
        <Heading as="h2" size="md" mb={4}>
          {upcomings.length} Upcoming
        </Heading>
      )}

      <TrackList tracks={upcomings} setTracks={setUpcomings} isLoading={isLoading} />
    </>
  );
}
