import { PLATFORM_PROVIDERS } from "./platform/browser";
import { ENV_PROVIDERS } from "./platform/environment";
import { APP_PROVIDERS } from './app';

export const GLOBAL_PROVIDERS = [
  ...PLATFORM_PROVIDERS,
  ...ENV_PROVIDERS,
  ...APP_PROVIDERS
];
