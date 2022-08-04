import { useState } from "react";
import { Heading } from "@chakra-ui/react";

import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getLabelReleases } from "@/dashboard/services/labels";

export default function LabelsReleases(): JSX.Element {
  const [resultsLength, setResultsLength] = useState(0);

  return (
    <>
      <MetaTags title="Labels Releases" />

      <Heading as="h2" size="lg" mb={4}>
        {resultsLength} Releases
      </Heading>

      <TrackList request={getLabelReleases} onLoad={setResultsLength} />
    </>
  );
}
