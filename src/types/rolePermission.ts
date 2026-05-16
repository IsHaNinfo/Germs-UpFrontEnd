/**
 * Type definitions for Role and Permission management system
 * Aligns with backend tables: Role, Permissions, RoleHasPermissions
 */

export interface Role {
  id: string | number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Permission {
  name: string;
}

export interface RoleHasPermission {
  id?: string | number;
  roleId: string | number;
  permissionId: string | number;
  createdAt?: string;
}

export interface PermissionCategory {
  name: string;
  permissions: Permission[];
}

export interface RolePermissionState {
  roleId: string | number;
  permissions: Record<string | number, boolean>; // permissionId -> enabled state
}
