import { Route } from "react-router-dom";

import { RoutesWithNotFound } from "hocs";

import Seed from "@/seed/pages/Seed";

export default function SeedRoutes() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Seed />} />
    </RoutesWithNotFound>
  );
}
