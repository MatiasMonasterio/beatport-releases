import type { ApiParams } from "@br/core";
import type { UserId, ArtistId } from "../../../../core/domain";
import type { ArtistService } from "./artists.service.d";

import { HttpException } from "../../../../core";
import { scraperService } from "../../../scraper";

import { ArtistDTO } from "../../dto";
import { artistMapper } from "../../mappers";
import { artistRepository } from "../../repositories";
import { isEntityUpdated } from "../../utilities";
import { tempService } from "../../services";

const artistService: ArtistService<ArtistDTO> = {
  getAllByUserId: async (userId: UserId, params: ApiParams): Promise<ArtistDTO[]> => {
    const artists = await artistRepository.getAllByUserId(userId, params);
    return artists.map((artist) => artistMapper.persistanceToDTO(artist, userId));
  },

  getOneById: async (artistId: ArtistId, userId: UserId): Promise<ArtistDTO> => {
    const artist = await artistRepository.getOneById(artistId);
    if (artist && artist.artwork && isEntityUpdated(artist.updatedAt)) {
      return artistMapper.persistanceToDTO(artist, userId);
    }

    const artistOnCache = await tempService.getArtist(artistId);
    if (artistOnCache) {
      return artistMapper.scraperToDTO(artistOnCache);
    }

    const artistScreped = await scraperService.getOneArtistById(artistId);
    await tempService.saveArtist(artistScreped);
    return artistMapper.scraperToDTO(artistScreped);
  },

  createAndConnectWithUser: async (artistId: ArtistId, userId: UserId): Promise<ArtistDTO> => {
    const artistExist = await artistRepository.isConnectedWithUser(artistId, userId);
    if (artistExist) throw new HttpException(409, "Artists already exist");

    const artist = await artistRepository.getOneById(artistId);
    if (artist && artist.artwork && isEntityUpdated(artist.updatedAt)) {
      await artistRepository.connectWithUser(artistId, userId);
      return artistMapper.persistanceToDTO(artist, userId);
    }

    const artistOnCache = await tempService.getArtist(artistId);
    if (artistOnCache) {
      const newArtist = await artistRepository.saveAndConnectWithUser(artistOnCache, userId);
      return artistMapper.persistanceToDTO(newArtist, userId);
    }

    const artistScraped = await scraperService.getOneArtistById(artistId);
    const newArtist = await artistRepository.saveAndConnectWithUser(artistScraped, userId);
    return artistMapper.persistanceToDTO(newArtist, userId);
  },

  deleteOneById: async (artistId: ArtistId, userId: UserId): Promise<void> => {
    const artistExist = await artistRepository.isConnectedWithUser(artistId, userId);
    if (!artistExist) throw new HttpException(404, "Artists not found");

    await artistRepository.disconnectWithUser(artistId, userId);
  },
};

export default artistService;
