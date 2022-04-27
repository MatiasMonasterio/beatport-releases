import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "layouts";

import Artists from "pages/artists/Artists";
import ArtistById from "pages/artists/ArtistsById";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Artists />} />

          <Route path="artists">
            <Route path="" element={<Artists />} />
            <Route path=":id" element={<ArtistById />} />
          </Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
