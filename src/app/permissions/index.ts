export * from './CurrentUser';
export * from './Authorization.service';
export * from './AuthRolePermission';
export * from './RebirthRole.directive';
export * from './PermissionConfig';

import { AuthorizationService } from './Authorization.service';
import { AuthRolePermission } from './AuthRolePermission';
import { PermissionConfig } from './PermissionConfig';


const AUTH_ROLE_PERMISSIONS_PROVIDERS: any[] = [
  AuthorizationService,
  AuthRolePermission
];

export function providePermission(permissionConfig: PermissionConfig): any[] {
  return [
    ...AUTH_ROLE_PERMISSIONS_PROVIDERS,
    { provide: PermissionConfig, useValue: permissionConfig }
  ];
};
