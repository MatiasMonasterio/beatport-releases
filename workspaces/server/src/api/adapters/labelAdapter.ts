import type { Label } from "@br/core";
import type { LabelWithTracks } from "../../types";

import trackAdapter from "./trackAdapter";

export default function labelAdapter(label: LabelWithTracks, userId?: number): Label {
  const tracks = label.tracks.map((track) => trackAdapter(track, userId));

  return {
    id: label.id,
    name: label.name,
    artwork: label.artwork || "",
    tracks: tracks,
    profile: label.profile,
    follow: label.users?.some((user) => user.id === userId),
  };
}
