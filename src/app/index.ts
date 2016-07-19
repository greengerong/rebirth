// App
export * from './app.component';
import { providePermission, PermissionConfig } from './permissions';

const permissionConfig: PermissionConfig = { loginPage: '/manage/login' };

// Application wide providers
export const APP_PROVIDERS = [
  ...providePermission(permissionConfig)
];
