import { usePlayerContext } from "@/dashboard/contexts/player";

export default function useUpdateCurrentTrack(trackId: number, isFavorite: boolean) {
  const { currentTrack, setCurrentTrack } = usePlayerContext();

  const checkCurrentTrack = () => {
    if (currentTrack.id === trackId) {
      const newCurrentTrack = { ...currentTrack, favorite: !isFavorite };
      setCurrentTrack(newCurrentTrack);
    }
  };

  return {
    checkCurrentTrack,
  };
}
