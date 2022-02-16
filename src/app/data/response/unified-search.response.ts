import {UnifiedSearchResult} from "../types/search";

export interface UnifiedSearchResponse {
  totalResults: number;
  queryString: string;
  results: UnifiedSearchResult[];
}
