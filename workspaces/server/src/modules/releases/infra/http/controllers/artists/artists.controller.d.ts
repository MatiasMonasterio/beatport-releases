import type { NextFunction, Request, Response } from "express";

export interface ArtistsController {
  getAllArtists: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createNewArtist: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getOneArtist: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deteleOneArtist: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
