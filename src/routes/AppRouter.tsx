import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "layouts";

import Artists from "pages/artists/Artists";
import ArtistById from "pages/artists/ArtistsById";
import ArtistReleases from "pages/artists/ArtistsReleases";
import ArtistUpcomings from "pages/artists/ArtistUpcomings";

import Labels from "pages/labels/Labels";
import LabeltById from "pages/labels/LableById";
import LabelReleases from "pages/labels/LabelReleases";
import LabelUpcomings from "pages/labels/LabelUpcomings";

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

          <Route path="labels">
            <Route path="" element={<Labels />} />
            <Route path=":id" element={<LabeltById />} />
            <Route path="releases" element={<LabelReleases />} />
            <Route path="upcoming" element={<LabelUpcomings />} />
          </Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
