export const tracksCountMessage = (tracksLength: number): string => {
  return tracksLength > 0 ? `${tracksLength} tracks` : "No tracks";
};
