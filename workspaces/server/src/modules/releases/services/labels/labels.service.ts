import type { ApiParams } from "@br/core";
import type { UserId, LabelId } from "../../../../core/domain";
import type { LabelsService } from "./labels.service.d";

import { HttpException } from "../../../../core";
import { scraperService } from "../../../scraper";

import { LabelDTO } from "../../dto";
import { labelsRepository } from "../../repositories";
import { labelMapper } from "../../mappers";

import { tempService } from "../../services";
import { isEntityUpdated } from "../../utilities";

const labelsService: LabelsService<LabelDTO> = {
  getAllLabels: async (userId: UserId, params: ApiParams): Promise<LabelDTO[]> => {
    const labels = await labelsRepository.getAllByUserId(userId, params);
    return labels.map((label) => labelMapper.persistenceToDTO(label, userId));
  },

  createAndConnectWithUser: async (id: LabelId, userId: UserId): Promise<LabelDTO> => {
    const labelExist = await labelsRepository.isConnectedWithUser(id, userId);
    if (labelExist) throw new HttpException(409, "Label already exist");

    const label = await labelsRepository.getOneById(id);
    if (label && label.artwork && isEntityUpdated(label.updatedAt)) {
      await labelsRepository.connectWithUser(id, userId);
      return labelMapper.persistenceToDTO(label, userId);
    }

    const labelOnCache = await tempService.getLabel(id);
    if (labelOnCache) {
      const newLabel = await labelsRepository.saveAndConnectWithUser(labelOnCache, userId);
      return labelMapper.persistenceToDTO(newLabel, userId);
    }

    const labelScraped = await scraperService.getOneLabelById(id);
    const newLabel = await labelsRepository.saveAndConnectWithUser(labelScraped, userId);
    return labelMapper.persistenceToDTO(newLabel, userId);
  },

  getOneLabel: async (id: LabelId, userId: UserId): Promise<LabelDTO> => {
    const label = await labelsRepository.getOneById(id);
    if (label && label.artwork && isEntityUpdated(label.updatedAt)) {
      return labelMapper.persistenceToDTO(label, userId);
    }

    const labelOnCache = await tempService.getLabel(id);
    if (labelOnCache) return labelMapper.scraperToDTO(labelOnCache);

    const newLabel = await scraperService.getOneLabelById(id);
    await tempService.saveLabel(newLabel);
    return labelMapper.scraperToDTO(newLabel);
  },

  deteleOneLabel: async (id: LabelId, userId: UserId): Promise<void> => {
    const labelExist = await labelsRepository.isConnectedWithUser(id, userId);
    if (!labelExist) throw new HttpException(404, "Label not found");

    await labelsRepository.disconnectWithUser(id, userId);
  },
};

export default labelsService;
