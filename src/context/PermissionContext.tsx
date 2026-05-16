// import { createContext, useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Permission } from "../types/rolePermission";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// interface PermissionContextType {
//   permissions: Permission[];
//   loading: boolean;
//   hasPermission: (category: string, name: string) => boolean;
//   hasCategoryPermission: (category: string) => boolean;
//   refreshPermissions: () => Promise<void>;
// }

// const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

// export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [loading, setLoading] = useState(true);

//   const getPermissions = async (roleId: string | number) => {
//     const res = await axios.get(
//       `${API_BASE_URL}/RolePermission/permissions-by-roleid/${roleId}`
//     );
//     return res.data;
//   };

//   const loadPermissions = useCallback(async () => {
//     try {
//       setLoading(true);
//       const user = localStorage.getItem("userDetails");
//       if (!user) {
//         setPermissions([]);
//         return;
//       }

//       const userData = JSON.parse(user);
//       const data = await getPermissions(userData.roleId);

//       setPermissions(data);
//     } catch (err) {
//       console.error("Permission load error:", err);
//       setPermissions([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadPermissions();
//   }, [loadPermissions]);

//   const hasPermission = useCallback(
//     (category: string, name: string) => {
//       return permissions.some(
//         (p) => p.category === category && p.name === name
//       );
//     },
//     [permissions]
//   );

//   const hasCategoryPermission = useCallback(
//     (category: string) => {
//       return permissions.some((p) => p.category === category);
//     },
//     [permissions]
//   );

//   return (
//     <PermissionContext.Provider
//       value={{
//         permissions,
//         loading,
//         hasPermission,
//         hasCategoryPermission,
//         refreshPermissions: loadPermissions,
//       }}
//     >
//       {children}
//     </PermissionContext.Provider>
//   );
// };

// export const usePermission = () => {
//   const context = useContext(PermissionContext);
//   if (!context) {
//     throw new Error("usePermission must be used inside PermissionProvider");
//   }
//   return context;
// };