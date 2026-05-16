// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import EditUserModal from "./EditUserModal";
// import Label from "../form/Label";

// const AllUsers = () => {
//   const [userRoles, setUserRoles] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [userRole,setUserRole] = useState("");
//   const [roles,setRoles] = useState<any[]>([]);

//   useEffect(() => {
//     GetAllUserRoleList();
//     GetAllRolesList();
//   }, []);

    //// Created By: Fg Off YSDU De Silva
    //// Created Date: 13.04.2026
    //// Des: Get all user role list
//   const GetAllUserRoleList = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/User`);
//       setUserRoles(res.data);
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch users data." });
//     }
//   };
  
//   const GetAllRolesList = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Role`);
//       setRoles(res.data);
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch user role data." });
//     }
//   };

//   const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setUserRole(e.target.value);
//     if(e.target.value==="noVal"){
//       GetAllUserRoleList();
//     }else{
//       GetAllUsersByRole(e.target.value);
//     }
//   }

//   const GetAllUsersByRole = async (role:string) => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/User/by-role?roleName=${role}`);
//       setUserRoles(res.data);
//     } catch {
//       setUserRoles([]);
//     }
//   };
    
    //// Created By: Fg Off YSDU De Silva
    //// Created Date: 13.04.2026
    //// Des: Filter user role list based on search term 
    
//   const filteredUserRoles = userRoles.filter((v) => {
//     const s = searchTerm.toLowerCase();
//     return (
//       v.svcNo?.toLowerCase().includes(s) ||
//       v.rank?.toLowerCase().includes(s) ||
//       v.name?.toLowerCase().includes(s)
//     );
//   });


//   const openUserEditModal = (user: any) => {
//     setSelectedUser(user);
//     setIsEditUserModalOpen(true);
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
//         <div className="flex items-center">
//             <Label className="mr-4">Filter by role</Label> 
//             <div className="flex gap-2">
//                 <select
//                   name="userRole"
//                   value={userRole}
//                   onChange={handleRoleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 >
//                 <option value="noVal">Select Role</option>
//                 {roles.map((role) => (
//                   <option key={role.id} value={role.name}>
//                     {role.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//       </div>
      
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3">SVC No</th>
//               <th className="p-3">Rank</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Location</th>
//               <th className="p-3">Formation</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredUserRoles.length > 0 ? (
//               filteredUserRoles.map((v, i) => (
//                 <tr key={i} className="border-t hover:bg-gray-50 text-center">
//                   <td className="p-2">{v.svcNo}</td>
//                   <td className="p-2">{v.rank}</td>
//                   <td className="p-2">{v.name}</td>
//                   <td className="p-2">{v.userLocation}</td>
//                   <td className="p-2">{v.userFormation}</td>
//                   <td className="p-2">{v.role.name}</td>
//                   <td className="flex justify-center gap-3 p-2">
//                     <button className="text-blue-600" onClick={() => {
//                         openUserEditModal(v);
//                       }}>
//                        <i className="fa-solid fa-pen"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={9} className="p-4 text-center text-gray-500">
//                   No users found for this role
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <EditUserModal
//         isOpen={isEditUserModalOpen}
//         onClose={() => setIsEditUserModalOpen(false)}
//         onUserRoleCreated={GetAllUserRoleList}
//         user={selectedUser}
//       />
//     </div>
//   );
// };

// export default AllUsers;