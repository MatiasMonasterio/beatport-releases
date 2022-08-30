import type { ArtistId, LabelId } from "../../../core/domain";

import dayjs from "dayjs";
import { BEATPORT_BASE_URL } from "../../../core/constants";

export default {
  artist: (artistId: ArtistId, days = 30): string => {
    const endDate = dayjs(new Date()).add(60, "day").format("YYYY-MM-DD");
    const startDate = dayjs(new Date()).subtract(days, "day").format("YYYY-MM-DD");

    const artistProfile = `${BEATPORT_BASE_URL}/artist/a/${artistId}`;
    const artistReleasesPage = `${artistProfile}/tracks?start-date=${startDate}&end-date=${endDate}`;

    return artistReleasesPage;
  },

  label: (labelId: LabelId, days = 30): string => {
    const endDate = dayjs(new Date()).add(60, "day").format("YYYY-MM-DD");
    const startDate = dayjs(new Date()).subtract(days, "day").format("YYYY-MM-DD");

    const labelProfile = `${BEATPORT_BASE_URL}/label/l/${labelId}`;
    const labelReleasesPage = `${labelProfile}/tracks?start-date=${startDate}&end-date=${endDate}`;

    return labelReleasesPage;
  },
};
