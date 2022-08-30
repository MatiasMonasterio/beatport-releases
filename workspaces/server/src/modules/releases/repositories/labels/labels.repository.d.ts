import type { ApiParams } from "@br/core";
import type { UserId, LabelId } from "../../../../core/domain";
import type { LabelRepo } from "../../interfaces";
import type { ScraperLabelDTO } from "../../../scraper";

export interface LabelsRepository {
  getAllByUserId: (userId: UserId, params: ApiParams) => Promise<LabelRepo[]>;
  getOneById: (labelId: LabelId) => Promise<LabelRepo | null>;
  saveAndConnectWithUser: (label: ScraperLabelDTO, userId: UserId) => Promise<LabelRepo>;
  connectWithUser: (labelId: LabelId, userId: UserId) => Promise<void>;
  disconnectWithUser: (labelId: LabelId, userId: UserId) => Promise<void>;
  isConnectedWithUser: (labelId: LabelId, userId: UserId) => Promise<boolean>;
}
