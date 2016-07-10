// App
export * from './app.component';
import { PERMISSIONS_PROVIDERS } from './manage-app';

// Application wide providers
export const APP_PROVIDERS = [
  ...PERMISSIONS_PROVIDERS
];
