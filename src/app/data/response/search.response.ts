import {SearchResult} from "../types/search";

export interface SearchResponse<T> {
  results: SearchResult<T>[];
  totalResults: number;
  queryString: string;
}
