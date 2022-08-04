import type { ApiParams, Track } from "@br/core";

import { tracksFilter } from "types";
import { useState, useEffect } from "react";

interface useParamsArgs {
  filter: tracksFilter;
  order: "desc" | "asc";
}

export default function useParams({ filter, order }: useParamsArgs) {
  const [params, setParams] = useState<ApiParams>({});

  useEffect(() => {
    // !check to uso trackFilter with keyof track
    setParams({ ...params, sort: filter as keyof Track, order: order });
  }, [filter, order]);

  return {
    params,
  };
}
