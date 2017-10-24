// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

// declare var System: any;
// support NodeJS modules without type definitions


// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare const ENV: string;
declare const HMR: boolean;
declare const System: SystemJS;
declare const require: any;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}

declare module 'markdown-it' {
  function markdownit(option: any): any;

  export default markdownit;
}

