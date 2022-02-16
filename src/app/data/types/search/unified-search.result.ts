import {SearchResult} from './search.result';
import {SearchType} from "../../enums";

export interface UnifiedSearchResult extends SearchResult<any> {
  type: SearchType;
}
