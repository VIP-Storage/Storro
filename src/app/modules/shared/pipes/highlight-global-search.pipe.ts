import {Pipe, PipeTransform} from '@angular/core';
import {UnifiedSearchResult} from "../../../data/types/search";

@Pipe({
  name: 'highlightSearch'
})
export class HighlightGlobalSearchPipe implements PipeTransform {

  transform(value: string, result: UnifiedSearchResult, key?: string|string[]): string {
    if (!key) {
      return value;
    }

    if (typeof key === 'string') {
      return HighlightGlobalSearchPipe.highlightViaKey(value, result, key as string);
    }

    let returnValue = value;

    (key as string[]).forEach(k => {
      returnValue = HighlightGlobalSearchPipe.highlightViaKey(returnValue, result, k);
    });

    return returnValue;
  }

  private static highlightViaKey(value: string, result: UnifiedSearchResult, key: string) {
    const highlights = result.highlights[key];

    if (!highlights) {
      return value;
    }

    const highlight = highlights[0];

    if (!highlight) {
      return value;
    }

    const regex = new RegExp(highlight, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
  }

}
