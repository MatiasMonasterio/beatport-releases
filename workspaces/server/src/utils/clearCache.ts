import cache from "../cache";

export const clearArtistCache = async (): Promise<void> => {
  await cache.del("/api/artists");
  await cache.del("/api/artists/releases");
  await cache.del("/api/artists/upcomings");
};

export const clearLabelCache = async (): Promise<void> => {
  await cache.del("/api/labels");
  await cache.del("/api/labels/releases");
  await cache.del("/api/labels/upcomings");
};
