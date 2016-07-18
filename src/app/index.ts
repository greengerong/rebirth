// App
export * from './app.component';
import { providePermission } from './permissions';

const permissionConfig = { loginPage: '/manage/login' };

// Application wide providers
export const APP_PROVIDERS = [
  ...providePermission(permissionConfig)
];
