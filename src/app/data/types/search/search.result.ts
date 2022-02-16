export interface SearchResult<T> {
  data: T;
  score: number;
  highlights: { [key: string]: string[] };
}
