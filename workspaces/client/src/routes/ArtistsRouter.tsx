import { Routes, Route } from "react-router-dom";

import { ArtistsLayout } from "layouts";

import Artists from "pages/artists/Artists";
import ArtistReleases from "pages/artists/ArtistsReleases";
import ArtistUpcomings from "pages/artists/ArtistUpcomings";

export default function ArtistsRouter() {
  return (
    <ArtistsLayout>
      <Routes>
        <Route path="*">
          <Route path="" element={<Artists />} />
          <Route path="releases" element={<ArtistReleases />} />
          <Route path="upcomings" element={<ArtistUpcomings />} />
        </Route>
      </Routes>
    </ArtistsLayout>
  );
}
