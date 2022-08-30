import type { Request, Response, NextFunction } from "express";

export interface TracksController {
  getAllReleases: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getAllUpcomings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getArtistsReleases: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getArtistsUpcoming: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getLabelsReleases: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getLabelsUpcoming: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getTracksByArtistId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getTracksByLabelId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
