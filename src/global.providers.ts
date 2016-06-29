import { DIRECTIVES, PIPES, PROVIDERS } from "./platform/browser";
import { ENV_PROVIDERS } from "./platform/environment";
import { APP_PROVIDERS } from './app';

export const GLOBAL_PROVIDERS =[
  ...PROVIDERS,
  ...ENV_PROVIDERS,
  ...DIRECTIVES,
  ...PIPES,
  ...APP_PROVIDERS
];
