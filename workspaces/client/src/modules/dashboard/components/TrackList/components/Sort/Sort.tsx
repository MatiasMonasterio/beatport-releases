import { tracksFilter } from "types";
import { useMobile } from "hooks";
import { SortDesktop, SortMobile } from "./variants";

export interface Props {
  filter: string;
  isDesc: boolean;
  favoritesList?: boolean;
  onSortBy: (sortValue: tracksFilter) => void;
}

export default function Sort(props: Props) {
  const isMobile = useMobile();

  return <>{isMobile ? <SortMobile {...props} /> : <SortDesktop {...props} />}</>;
}
