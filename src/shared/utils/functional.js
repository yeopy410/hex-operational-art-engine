"use strict";

/**
 * @template T
 * @param {T | undefined | null} result
 */
export function maybe(result) {
  const api = {
    /** @param {(result: T) => void} func */
    ifSome: func => {
      if (result != null) func(result);
      return api;
    },

    /** @param {() => void} func */
    ifNone: func => {
      if (result == null) func();
      return api;
    }
  };
  return api;
}