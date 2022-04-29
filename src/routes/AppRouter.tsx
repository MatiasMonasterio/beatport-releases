import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "layouts";

import Artists from "pages/artists/Artists";
import ArtistById from "pages/artists/ArtistsById";
import ArtistReleases from "pages/artists/ArtistsReleases";
import ArtistUpcomings from "pages/artists/ArtistUpcomings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Artists />} />

          <Route path="artists">
            <Route path="" element={<Artists />} />
            <Route path=":id" element={<ArtistById />} />
            <Route path="releases" element={<ArtistReleases />} />
            <Route path="upcoming" element={<ArtistUpcomings />} />
          </Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
