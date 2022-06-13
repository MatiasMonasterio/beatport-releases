import { Routes, Route } from "react-router-dom";

import { LabelsLayout } from "layouts";

import Labels from "pages/labels/Labels";
import LabelsReleases from "pages/labels/LabelReleases";
import LabelsUpcomings from "pages/labels/LabelUpcomings";

export default function LabelsRouter() {
  return (
    <LabelsLayout>
      <Routes>
        <Route path="*">
          <Route path="" element={<Labels />} />
          <Route path="releases" element={<LabelsReleases />} />
          <Route path="upcomings" element={<LabelsUpcomings />} />
        </Route>
      </Routes>
    </LabelsLayout>
  );
}
