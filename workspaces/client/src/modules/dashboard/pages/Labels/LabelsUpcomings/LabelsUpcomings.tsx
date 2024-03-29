import type { Track } from "@br/core";

import { useState } from "react";
import { Heading } from "@chakra-ui/react";

import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getLabelUpcomings } from "@/dashboard/services/labels";

export default function LabelsUpcomings(): JSX.Element {
  const [resultsLength, setResultsLength] = useState(0);

  const handleTracksLoad = (tracks: Track[]) => {
    setResultsLength(tracks.length);
  };

  return (
    <>
      <MetaTags title="Labels Upcoming" />

      <Heading as="h2" size="lg" mb={4}>
        {resultsLength} Upcoming
      </Heading>

      <TrackList request={getLabelUpcomings} onLoad={handleTracksLoad} />
    </>
  );
}
