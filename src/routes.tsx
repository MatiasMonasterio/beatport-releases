import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "layouts";

import Artists from "pages/artists/Artists";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Artists />} />

          <Route path="artists">
            <Route path="" element={<Artists />} />
          </Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
