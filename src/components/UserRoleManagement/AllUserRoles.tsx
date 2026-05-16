// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import AddUserRoleModal from "./AddUserRoleModal";
// import { useNavigate } from "react-router-dom";
// import { useUserContext } from "../../context/UserContext";

// const AllUserRoles = () => {
//   const [userRoles, setUserRoles] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [isAddUserRoleModalOpen, setIsAddUserRoleModalOpen] = useState(false);
//   const { hasPermission } = useUserContext();
  
//   useEffect(() => {
//     GetAllUserRoleList();
//   }, []);
  
    //// Created By: Fg Off YSDU De Silva
    //// Created Date: 13.04.2026
    //// Des: Get all user role list
  
//   const GetAllUserRoleList = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Role`);
//       setUserRoles(res.data);
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch user role data." });
//     }
//   };
  
      //// Created By: Fg Off YSDU De Silva
      //// Created Date: 13.04.2026
     //// Des: Filter user role list based on search term 
//   const filteredUserRoles = userRoles.filter((v) => {
//     const s = searchTerm.toLowerCase();
//     return (
//       v.name?.toLowerCase().includes(s)
//     );
//   })
//   .sort((a, b) => a.name.localeCompare(b.name));


//   const goToPermissionViewPage = (userRole: any) => {
//     navigate(`/germs/user-role-management/permissions/${userRole}`);
//   }

//   return (
//     <div className="p-6 pt-0">

//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-3 py-2 rounded-lg w-64"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//           <button
//             hidden={!hasPermission("User Role Management-Add User Role")}
//             className="bg-blue-600 text-white px-3 py-2 rounded-lg"
//             onClick={() => setIsAddUserRoleModalOpen(true)}
//           >
//             + Add new User Role
//           </button>
//       </div>
      
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3">User Role</th>
//               <th className="p-3" hidden={!hasPermission("User Role Management-Edit User Role")}>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredUserRoles.length > 0 ? (
//               filteredUserRoles.map((v, i) => (
//                 <tr key={i} className="border-t hover:bg-gray-50 text-center">
//                   <td className="p-2">{v.name}</td>
//                   <td className="flex justify-center gap-3 p-2" hidden={!hasPermission("User Role Management-Edit User Role")}>
//                     <button className="text-blue-600"   onClick={() => {
//                         goToPermissionViewPage(v.roleId);
//                       }}>
//                        <i className="fa-solid fa-pen"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={2} className="p-4 text-center text-gray-500">
//                   No user roles found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <AddUserRoleModal
//         isOpen={isAddUserRoleModalOpen}
//         onClose={() => setIsAddUserRoleModalOpen(false)}
//         onUserRoleCreated={GetAllUserRoleList}
//       />

//     </div>
//   );
// };

// export default AllUserRoles;