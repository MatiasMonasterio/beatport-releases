import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "layouts";

import Home from "pages/Home";
import Releases from "pages/Releases";
import Upcomings from "pages/Upcomings";
import Favorites from "pages/Fovorites";

import ArtistById from "pages/artists/ArtistsById";
import LabeltById from "pages/labels/LableById";

import ArtistsRouter from "./ArtistsRouter";
import LabelsRouter from "./LabelsRouter";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/upcomings" element={<Upcomings />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/labels/*" element={<LabelsRouter />} />
          <Route path="/artists/*" element={<ArtistsRouter />} />

          <Route path="artist">
            <Route path=":id" element={<ArtistById />} />
          </Route>

          <Route path="label">
            <Route path=":id" element={<LabeltById />} />
          </Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
