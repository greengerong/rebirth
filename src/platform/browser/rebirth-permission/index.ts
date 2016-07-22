export * from './User';
export * from './Authorization.service';
export * from './AuthRolePermission';
export * from './RebirthRole.directive';
export * from './PermissionConfig';

import { AuthorizationService } from './Authorization.service';
import { AuthRolePermission } from './AuthRolePermission';
import { PermissionConfig } from './PermissionConfig';
import { RebirthRoleDirective } from './RebirthRole.directive';
import { PLATFORM_DIRECTIVES } from '@angular/core';

const AUTH_ROLE_PERMISSIONS_PROVIDERS: any[] = [
  AuthorizationService,
  AuthRolePermission,
  { provide: PLATFORM_DIRECTIVES, multi: true, useValue: RebirthRoleDirective }
];

export function providePermission(permissionConfig: PermissionConfig): any[] {
  return [
    ...AUTH_ROLE_PERMISSIONS_PROVIDERS,
    { provide: PermissionConfig, useValue: permissionConfig }
  ];
};
