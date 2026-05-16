// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import Switch from "../form/switch/Switch";
// import {
//   Permission,
//   PermissionCategory,
// } from "../../types/rolePermission";
// import { rolePermissionService } from "../../services/rolePermissionService";
// import axios from "axios";
// import { usePermission } from "../../context/PermissionContext";
// import AddPermissionModal from "./AddPermissionModal";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// interface RoleHasPermission {
//   id?: string | number;
//   roleId: string | number;
//   permissionId: string | number;
// }

// type AllPermissionsProps = {
//   userRole?: any;
// };
    
   //// Created By: Fg Off YSDU De Silva
  //// Created Date: 13.04.2026
  //// Des: Set the permissions for a specific user role. Displays all available permissions and allows toggling them on/off for the selected role. Changes can be saved or reset.


// const AllPermissions = ({ userRole }: AllPermissionsProps) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [saving, setSaving] = useState<boolean>(false);
//   const [permissionCategories, setPermissionCategories] = useState<
//     PermissionCategory[]
//   >([]);
//   const [rolePermissions, setRolePermissions] = useState<Set<string | number>>(
//     new Set()
//   );
//   const [changedPermissions, setChangedPermissions] = useState<Set<string | number>>(
//     new Set()
//   );
//   const [userRoleName, setUserRoleName] = useState<string>("");
//   const [isAddPermissionModalOpen, setIsAddPermissionModalOpen] = useState(false);
//   const { hasPermission } = usePermission();

//   // Extract role ID from userRole object
//   const getRoleId = ():string | number | null => {
//     if (!userRole) return null;

//     if (typeof userRole === "string" || typeof userRole === "number")
//       return userRole;
//     if (typeof userRole === "object" && userRole.id) return userRole.id;
//     return null;
//   };

//   const roleId = getRoleId();

//   useEffect(() => {    
//     if (roleId) {
//       getPermissionName();
//       loadPermissions();
//     }
//   }, [roleId]);

     // Created By: Fg Off YSDU De Silva
     // Created Date: 13.04.2026
     // Des: Get the Permission name for the selected user role to display in the header of the Manage Permissions page.

//   const getPermissionName = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/Role/${userRole}`,
//       );
//       setUserRoleName(response.data.name);
//     } catch (error) {
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch user role data." });
//     }
//   };

//   const loadPermissions = async () => {
//     setLoading(true);
//     try {
//       // Fetch all available permissions
//       const roleResponse = await axios.get(`${API_BASE_URL}/Permission`);
//       const allPermissions = roleResponse.data;

//       // Fetch permissions assigned to this role
//       const roleHasPermissionResponse = await axios.get<RoleHasPermission[]>(`${API_BASE_URL}/RolePermission/permissions-by-roleid/${roleId}`);
//       const roleHasPermissionData=roleHasPermissionResponse.data;

//       const assignedIds = new Set(
//         roleHasPermissionData.map((rp) => rp.permissionId)
//       );
//       setRolePermissions(assignedIds);

//       // Group permissions by category
//       const grouped = groupPermissionsByCategory(allPermissions);
//       setPermissionCategories(grouped);
//       console.log("Grouped Permissions:", grouped);
      
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load permissions",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const groupPermissionsByCategory = (
//     permissions: Permission[]
//   ): PermissionCategory[] => {
//     const grouped = permissions.reduce(
//       (acc, perm) => {
//         const category = perm.category || "Other";
//         const existing = acc.find((c) => c.name === category);

//         if (existing) {
//           existing.permissions.push(perm);
//         } else {
//           acc.push({ name: category, permissions: [perm] });
//         }

//         return acc;
//       },
//       [] as PermissionCategory[]
//     );

//     return grouped.sort((a, b) => a.name.localeCompare(b.name));
//   };

//   const handlePermissionToggle = (permissionId: string | number) => {
//     const newPermissions = new Set(rolePermissions);
//     const newChanged = new Set(changedPermissions);

//     if (newPermissions.has(permissionId)) {
//       newPermissions.delete(permissionId);
//     } else {
//       newPermissions.add(permissionId);
//     }

//     newChanged.add(permissionId);
//     setRolePermissions(newPermissions);
//     setChangedPermissions(newChanged);
//   };

//   const handleSavePermissions = async () => {
//     if (changedPermissions.size === 0) {
//       Swal.fire({
//         icon: "info",
//         title: "No Changes",
//         text: "No permissions were modified",
//       });
//       return;
//     }

//     setSaving(true);
//     try {
//       await rolePermissionService.updateRolePermissions(
//         roleId!,
//         Array.from(rolePermissions)
//       );

//       setChangedPermissions(new Set());

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Permissions updated successfully",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update permissions",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };
  //// Created By: Fg Off YSDU De Silva
  //// Created Date: 13.04.2026
  //// Des: Reset any unsaved permission changes
//   const handleResetPermissions = () => {
//     Swal.fire({
//       title: "Reset Changes?",
//       text: "Are you sure you want to discard all changes?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, reset",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         loadPermissions();
//       }
//     });
//   };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
//           <p className="text-gray-600">Loading permissions...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!roleId) {
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <p className="text-red-600 text-lg">No role selected</p>
//       </div>
//     );
//   }
  //// Created By: Fg Off YSDU De Silva
  //// Created Date: 13.04.2026
  //// Des: Manage Permissions page for a specific user role. Displays all available permissions grouped by category, with toggle switches to enable/disable each permission for the selected role.

//   return (
//     <div className="w-full max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-semibold text-gray-800">
//             Manage Permissions
//           </h2>
//           <p className="text-gray-600">
//             Configure permissions for role:{" "}
//             <span className="font-semibold text-gray-800">
//               {userRoleName}
//             </span>
//           </p>
//         </div>
//         <div>
//           {changedPermissions.size > 0 && (
//             <span className="inline-block bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
//               {changedPermissions.size} change{changedPermissions.size !== 1 ? "s" : ""}
//             </span>
//           )}
//         </div>
//         <div>
//           <button
//             hidden={!hasPermission("User Role Management", "Add new Permission (For Developers)")}
//             className="bg-blue-600 text-white px-3 py-2 rounded-lg"
//             onClick={() => setIsAddPermissionModalOpen(true)}
//           >
//             + Add new Permission
//           </button>
//         </div>
//       </div>

//       {/* Permission Categories Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {permissionCategories.map((category) => (
//           <div
//             key={category.name}
//             className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
//           >
//             {/* Category Header */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {category.name}
//               </h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 {category.permissions.length} permission
//                 {category.permissions.length !== 1 ? "s" : ""}
//               </p>
//             </div>

//             {/* Permissions List */}
//             <div className="divide-y divide-gray-100">
//               {category.permissions.map((permission) => (
//                 <div
//                   key={permission.permissionId}
//                   className="px-6 py-4 flex items-start justify-between hover:bg-gray-50 transition-colors group"
//                 >
//                   {/* Toggle Switch */}
//                   <div className="flex-shrink-0">
//                     <Switch
//                         label={permission.name}
//                         defaultChecked={rolePermissions.has(permission.permissionId)}
//                         onChange={() => handlePermissionToggle(permission.permissionId)}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {permissionCategories.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No permissions available</p>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-4 justify-end border-t border-gray-200 pt-6 mt-8">
//         <button
//           onClick={handleResetPermissions}
//           disabled={saving || changedPermissions.size === 0}
//           className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Reset Changes
//         </button>
//         <button
//           onClick={handleSavePermissions}
//           disabled={saving || changedPermissions.size === 0}
//           className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//         >
//           {saving ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
//               Saving...
//             </>
//           ) : (
//             <>
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               Save Permissions
//             </>
//           )}
//         </button>
//       </div>

//       <AddPermissionModal
//         isOpen={isAddPermissionModalOpen}
//         onClose={() => setIsAddPermissionModalOpen(false)}
//         onPermissionCreated={loadPermissions}
//       />

//     </div>
//   );
// };

// export default AllPermissions;
