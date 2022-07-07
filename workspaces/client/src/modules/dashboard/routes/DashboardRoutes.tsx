import { Route } from "react-router-dom";

import { RoutesWithNotFound } from "hocs";
import { DashboardLayout, ArtistsLayout, LabelsLayout, AccountLayout } from "@/dashboard/layouts";

import Home from "@/dashboard/pages/Home";
import Releases from "@/dashboard/pages/Releases";
import Upcomings from "@/dashboard/pages/Upcomings";
import Favorites from "@/dashboard/pages/Favorites";

import Artists from "@/dashboard/pages/Artists";
import ArtistsReleases from "@/dashboard/pages/Artists/ArtistsReleases";
import ArtistsUpcomings from "@/dashboard/pages/Artists/ArtistsUpcomgins";
import ArtistProfile from "@/dashboard/pages/Artists/ArtistProfile";

import Labels from "@/dashboard/pages/Labels";
import LabelsReleases from "@/dashboard/pages/Labels/LabelsReleases";
import LabelsUpcomings from "@/dashboard/pages/Labels/LabelsUpcomings";
import LabelProfile from "@/dashboard/pages/Labels/LabelProfile";

import Account from "@/dashboard/pages/Account";
import AccountSettings from "@/dashboard/pages/Account/Settings";

export default function DashboardRoutes() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="releases" element={<Releases />} />
        <Route path="upcomings" element={<Upcomings />} />
        <Route path="favorites" element={<Favorites />} />

        <Route path="artists" element={<ArtistsLayout />}>
          <Route index element={<Artists />} />
          <Route path="releases" element={<ArtistsReleases />} />
          <Route path="upcomings" element={<ArtistsUpcomings />} />
        </Route>

        <Route path="artist">
          <Route path=":id" element={<ArtistProfile />} />
        </Route>

        <Route path="labels" element={<LabelsLayout />}>
          <Route index element={<Labels />} />
          <Route path="releases" element={<LabelsReleases />} />
          <Route path="upcomings" element={<LabelsUpcomings />} />
        </Route>

        <Route path="label">
          <Route path=":id" element={<LabelProfile />} />
        </Route>

        <Route path="account" element={<AccountLayout />}>
          <Route path="" element={<Account />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>
      </Route>
    </RoutesWithNotFound>
  );
}
