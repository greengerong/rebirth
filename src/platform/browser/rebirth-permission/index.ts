export * from './Authorization.service';
export * from './AuthRolePermission';
export * from './RebirthRole.directive';
export * from './PermissionConfig';

import { AuthorizationService } from './Authorization.service';
import { AuthRolePermission } from './AuthRolePermission';
import { PermissionConfig } from './PermissionConfig';
import { RebirthRoleDirective } from './RebirthRole.directive';
import { REBIRTH_STORAGE_PROVIDERS } from 'rebirth-storage';

export const AUTH_ROLE_PERMISSIONS_DIRECTIVE: any[] = [
  RebirthRoleDirective
];

const AUTH_ROLE_PERMISSIONS_PROVIDERS: any[] = [
  REBIRTH_STORAGE_PROVIDERS,
  AuthorizationService,
  AuthRolePermission
];

export function providePermission(permissionConfig: PermissionConfig): any[] {
  return [
    ...AUTH_ROLE_PERMISSIONS_PROVIDERS,
    { provide: PermissionConfig, useValue: permissionConfig }
  ];
};
