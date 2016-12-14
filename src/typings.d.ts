// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

// declare var System: any;
// support NodeJS modules without type definitions

/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var HMR: boolean;
declare var System: SystemJS;
declare var require: (module: string) => any;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}

declare module 'markdown-it' {
  function markdownit(option: any): any;

  export default markdownit;
}

declare module 'highlight.js' {
  export function getLanguage(lang: string): string;

  export function highlight(lang: string, code: string): any;
}

