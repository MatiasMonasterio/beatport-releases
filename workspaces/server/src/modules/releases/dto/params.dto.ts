interface PaginationDTO {
  limit?: number;
  offset?: number;
}

interface FilterDTO {
  sort?: string;
  order?: OrderFilter;
  length?: number;
}

type OrderFilter = "desc" | "asc";

export interface ParamsDTO extends PaginationDTO, FilterDTO {}
