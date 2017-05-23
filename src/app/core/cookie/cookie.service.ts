import { Injectable } from '@angular/core';

export type CookieValue = string | number;

@Injectable()
export class CookieService {
  get map(): Map<string, CookieValue> {
    if (!document.cookie) {
      return new Map<string, string>();
    }

    const components = document.cookie.split(/(;\s?)/g);

    const tuples = components.map(
      (pair: string): [string, CookieValue] => {
        const [key, value] = pair.split(/=/);

        if (/^([\d+])$/.test(value)) {
          return [key, parseInt(value, 10)];
        }

        return [key, value];
      });

    return new Map<string, CookieValue>(tuples);
  }

  get<T>(key: string): T {
    return this.map.get(key) as any;
  }

  set(key: string, value: CookieValue) {
    this.delete(key);

    document.cookie = `${key}=${value.toString()}; path=/; domain=${location.hostname};`;
  }

  delete(key: string) {
    const criterion: Array<[string, string | number]> = [
      ['expires', 'Thu, 01 Jan 1970 00:00:01 GMT'],
      ['path', '/'],
      ['domain', location.hostname],
      ['max-age', 0]
    ];

    while (criterion.length > 0) {
      const serialized = criterion.map(([k, v]) => `${k}=${v}`).join('; ');

      document.cookie = `${key}=;${serialized ? ' ' + serialized : String()}`.trim();

      criterion.pop();
    }
  }
}
