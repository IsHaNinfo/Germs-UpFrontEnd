// import { useState, useCallback } from "react";
// import {
//   Permission,
//   PermissionCategory,
//   RoleHasPermission,
// } from "../types/rolePermission";

// /**
//  * Custom hook for managing role permissions
//  */
// export const useRolePermissions = () => {
//   const [permissions, setPermissions] = useState<Set<string | number>>(
//     new Set()
//   );
//   const [modified, setModified] = useState<Set<string | number>>(new Set());

//   const togglePermission = useCallback(
//     (permissionId: string | number) => {
//       setPermissions((prev) => {
//         const updated = new Set(prev);
//         if (updated.has(permissionId)) {
//           updated.delete(permissionId);
//         } else {
//           updated.add(permissionId);
//         }
//         return updated;
//       });

//       setModified((prev) => new Set(prev).add(permissionId));
//     },
//     []
//   );

//   const hasPermission = useCallback(
//     (permissionId: string | number): boolean => {
//       return permissions.has(permissionId);
//     },
//     [permissions]
//   );

//   const setPermissionState = useCallback(
//     (permissionMap: Record<string | number, boolean>) => {
//       const enabled = new Set<string | number>();
//       Object.entries(permissionMap).forEach(([id, isEnabled]) => {
//         if (isEnabled) {
//           enabled.add(isNaN(Number(id)) ? id : Number(id));
//         }
//       });
//       setPermissions(enabled);
//       setModified(new Set());
//     },
//     []
//   );

//   const resetModified = useCallback(() => {
//     setModified(new Set());
//   }, []);

//   const getModifiedPermissions = useCallback((): (string | number)[] => {
//     return Array.from(modified);
//   }, [modified]);

//   return {
//     permissions,
//     modified,
//     togglePermission,
//     hasPermission,
//     setPermissionState,
//     resetModified,
//     getModifiedPermissions,
//   };
// };

// /**
//  * Helper function to group permissions by category
//  */
// export const groupByCategory = (
//   permissions: Permission[]
// ): PermissionCategory[] => {
//   const grouped = permissions.reduce(
//     (acc, perm) => {
//       const category = perm.category || "Other";
//       const existing = acc.find((c) => c.name === category);

//       if (existing) {
//         existing.permissions.push(perm);
//       } else {
//         acc.push({ name: category, permissions: [perm] });
//       }

//       return acc;
//     },
//     [] as PermissionCategory[]
//   );

//   return grouped.sort((a, b) => a.name.localeCompare(b.name));
// };

// /**
//  * Helper function to convert RoleHasPermission array to permission ID set
//  */
// export const rolePermissionsToSet = (
//   rolePermissions: RoleHasPermission[]
// ): Set<string | number> => {
//   return new Set(rolePermissions.map((rp) => rp.permissionId));
// };

// /**
//  * Helper function to check if role has specific permission
//  */
// export const roleHasPermission = (
//   rolePermissions: RoleHasPermission[] | Set<string | number>,
//   permissionId: string | number
// ): boolean => {
//   if (rolePermissions instanceof Set) {
//     return rolePermissions.has(permissionId);
//   }
//   return rolePermissions.some((rp) => rp.permissionId === permissionId);
// };