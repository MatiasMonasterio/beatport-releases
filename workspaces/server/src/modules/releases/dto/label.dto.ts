import type {
  LabelId,
  LabelName,
  LabelArtwork,
  LabelFollow,
  LabelProfile,
  LabelsTracksCount,
} from "../../../core/domain";

export interface LabelDTO {
  id: LabelId;
  name: LabelName;
  tracksCount: LabelsTracksCount;
  follow: LabelFollow;
  profile: LabelProfile;
  artwork?: LabelArtwork;
}
