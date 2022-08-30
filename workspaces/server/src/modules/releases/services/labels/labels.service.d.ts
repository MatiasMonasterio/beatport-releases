import type { ApiParams } from "@br/core";
import type { UserId, LabelId } from "../../../../core/domain";

export interface LabelsService<T> {
  getAllLabels: (userId: UserId, params: ApiParams) => Promise<T[]>;
  getOneLabel: (id: LabelId, userId: UserId) => Promise<T>;
  createAndConnectWithUser: (id: LabelId, userId: UserId) => Promise<T>;
  deteleOneLabel: (id: LabelId, userId: UserId) => Promise<void>;
}
