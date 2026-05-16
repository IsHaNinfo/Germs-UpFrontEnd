/**
 * Permission and Role related constants and utilities
 */

/**
 * Common permission categories used in the system
 */
export const PERMISSION_CATEGORIES = {
  VEHICLE_INDUCTION: "Vehicle Induction",
  AIRFORCE_REGISTRATION: "AirForce Registration",
  ALLOCATION: "Allocation",
  USER_MANAGEMENT: "User Management",
  REPORTING: "Reporting",
  MAINTENANCE: "Maintenance",
  OPERATIONS: "Operations",
} as const;

/**
 * Common permission types (CRUD operations)
 */
export const PERMISSION_TYPES = {
  CREATE: "Create",
  READ: "Read",
  UPDATE: "Update",
  DELETE: "Delete",
  EXPORT: "Export",
  IMPORT: "Import",
  APPROVE: "Approve",
  REJECT: "Reject",
} as const;

/**
 * Common role types in the system
 */
export const ROLES = {
  ADMIN: { id: 1, name: "Admin" },
  MANAGER: { id: 2, name: "Manager" },
  STAFF: { id: 3, name: "Staff" },
  VIEWER: { id: 4, name: "Viewer" },
} as const;

/**
 * Permission slug generators for common patterns
 */
export const generatePermissionSlug = (
  action: string,
  resource: string
): string => {
  return `${action.toLowerCase()}_${resource.toLowerCase()}`.replace(/\s+/g, "_");
};

/**
 * Format permission label from slug
 */
export const formatPermissionLabel = (slug: string): string => {
  return slug
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Check if a user has multiple permissions
 */
export const hasAllPermissions = (
  userPermissions: Set<string | number>,
  requiredPermissions: (string | number)[]
): boolean => {
  return requiredPermissions.every((perm) => userPermissions.has(perm));
};

/**
 * Check if a user has any of the permissions
 */
export const hasAnyPermission = (
  userPermissions: Set<string | number>,
  requiredPermissions: (string | number)[]
): boolean => {
  return requiredPermissions.some((perm) => userPermissions.has(perm));
};

/**
 * Get permission icon based on category
 */
export const getPermissionIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    [PERMISSION_CATEGORIES.VEHICLE_INDUCTION]: "🚗",
    [PERMISSION_CATEGORIES.AIRFORCE_REGISTRATION]: "✈️",
    [PERMISSION_CATEGORIES.ALLOCATION]: "📦",
    [PERMISSION_CATEGORIES.USER_MANAGEMENT]: "👥",
    [PERMISSION_CATEGORIES.REPORTING]: "📊",
    [PERMISSION_CATEGORIES.MAINTENANCE]: "🔧",
    [PERMISSION_CATEGORIES.OPERATIONS]: "⚙️",
  };
  return iconMap[category] || "🔐";
};

/**
 * Get badge color for category
 */
export const getCategoryColor = (
  category: string
): "blue" | "purple" | "green" | "red" | "yellow" | "indigo" | "pink" => {
  const colorMap: Record<
    string,
    "blue" | "purple" | "green" | "red" | "yellow" | "indigo" | "pink"
  > = {
    [PERMISSION_CATEGORIES.VEHICLE_INDUCTION]: "blue",
    [PERMISSION_CATEGORIES.AIRFORCE_REGISTRATION]: "purple",
    [PERMISSION_CATEGORIES.ALLOCATION]: "green",
    [PERMISSION_CATEGORIES.USER_MANAGEMENT]: "red",
    [PERMISSION_CATEGORIES.REPORTING]: "yellow",
    [PERMISSION_CATEGORIES.MAINTENANCE]: "indigo",
    [PERMISSION_CATEGORIES.OPERATIONS]: "pink",
  };
  return colorMap[category] || "blue";
};

/**
 * Default permissions for each role
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<string | number, (string | number)[]> = {
  [ROLES.ADMIN.id]: [], // Admin gets all permissions
  [ROLES.MANAGER.id]: [1, 2, 3, 5, 6], // Manager-level permissions
  [ROLES.STAFF.id]: [1, 2], // Staff can only view and create
  [ROLES.VIEWER.id]: [1], // Viewer can only view
};

/**
 * Check if permission is restricted based on role type
 */
export const isPermissionRestricted = (
  roleId: string | number,
  permissionId: string | number,
  restrictions?: Record<string | number, (string | number)[]>
): boolean => {
  if (!restrictions) return false;
  const restrictedList = restrictions[roleId];
  return restrictedList ? !restrictedList.includes(permissionId) : false;
};
