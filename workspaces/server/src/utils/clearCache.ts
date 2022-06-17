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

export const clearFavoriteCache = async (): Promise<void> => {
  await cache.del("/api/favorites");
  await cache.del("/api/labels/releases");
  await cache.del("/api/labels/upcomings");
  await cache.del("/api/tracks/releases");
  await cache.del("/api/tracks/upcomings");
};
