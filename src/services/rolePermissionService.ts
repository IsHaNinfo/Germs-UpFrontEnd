import axios from "axios";
import { RoleHasPermission } from "../types/rolePermission";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * API Service for Role and Permission management
 */
export const rolePermissionService = {
  /**
   * Bulk update permissions for a role
   */
  updateRolePermissions: async (
  roleId: string | number,
  permissionIds: (string | number)[]
): Promise<RoleHasPermission[]> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/RolePermission/assign-permissions?roleId=${roleId}`,permissionIds
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating permissions for role ${roleId}:`,
      error
    );
    throw error;
  }
},
};
