import { Heading, Skeleton } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getLabelUpcomings } from "@/dashboard/services/labels";

export default function LabelsUpcomings(): JSX.Element {
  const { data: upcomings, isLoading } = useGetInitialData({
    request: getLabelUpcomings,
    defaultValue: [],
  });

  return (
    <>
      <MetaTags title="Labels Upcoming" />

      {isLoading && <Skeleton width="110px" h="1.5rem" mb={4} />}

      {!isLoading && (
        <Heading as="h2" size="lg" mb={4}>
          {upcomings.length} Upcoming
        </Heading>
      )}

      <TrackList tracks={upcomings} isLoading={isLoading} />
    </>
  );
}
