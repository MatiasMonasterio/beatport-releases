import { useState } from "react";
import { tracksFilter } from "types";

export default function useOrderBy() {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [filter, setFilter] = useState<tracksFilter>(tracksFilter.released);

  const handleOrderBy = (sortValue: tracksFilter) => {
    if (sortValue === filter) {
      const newOrder = order === "desc" ? "asc" : "desc";
      setOrder(newOrder);

      return;
    }

    setFilter(sortValue);
    setOrder("desc");
  };

  return {
    handleOrderBy,
    filter,
    order,
  };
}
