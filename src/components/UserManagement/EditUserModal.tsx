// import React, { useEffect, useState } from "react";
// import Button from "../ui/button/Button";
// import Input from "../form/input/InputField";
// import Label from "../form/Label";
// import axios from "axios";
// import Swal from "sweetalert2";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onUserRoleCreated: () => void;
//   user: any;
// }

// const initialState = {
//   roleId: "",
// };

// const EditUserModal: React.FC<Props> = ({ isOpen, onClose, onUserRoleCreated, user }) => {
//   const [userRole, setUserRole] = useState<any[]>([]);
//   const [formData, setFormData] = useState(initialState);
  
//   useEffect(() => {
//     fetchUserRoleData();
//     if (user) {
//       setFormData({
//         roleId: user.roleId || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
  //// Created By: Fg Off YSDU De Silva
  //// Created Date: 13.04.2026
  //// Des: Fetch user role data to show in the dropdown
//   const fetchUserRoleData = async () => {  
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/Role`,
//       );
//       const userRoleData = response.data.map((role: any) => ({
//         roleId: role.roleId,
//         name: role.name,
//       }));
//       setUserRole(userRoleData);

//     } catch (error) {
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch user role data." });
//     }
//   }
    
  //// Created By: Fg Off YSDU De Silva
  //// Created Date: 13.04.2026
  //// Des: Handle form submission to update user role
    
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const data = {
//       roleId: formData.roleId,
//     };

//      try {
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/User/${user.userId}`,
//         data
//       );
//       Swal.fire({ icon: "success", title: "Success", text: "User Updated Successfully!" });
//       onUserRoleCreated();
//       onClose();
     
//     } catch (error: any) {
//       const message = error.response?.data?.detail || error.message || "Failed to update user.";
//       Swal.fire({ icon: "error", title: "Error", text: message });
//     }
//   };
    
  //// Created By: Fg Off YSDU De Silva
  //// Created Date: 13.04.2026
  //// Des: Edit user modal component to update user role
    
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-100000">
      
//     <div
//       className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//       onClick={onClose}
//     ></div>
    
//       <div className="relative bg-white overflow-y-auto rounded-lg p-6 shadow-2xl animate-fadeIn w-[800px] ">

//         <div className="flex justify-between items-center mb-6 border-b pb-3">
//             <h2 className="text-2xl font-semibold">
//             Edit User - {user.name}
//             </h2>
//             <button
//                 onClick={onClose}
//                 className="text-xl font-bold hover:opacity-70"> ✕
//             </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <Label>Service No. (සේවා අංකය)</Label>
//               <Input
//                 disabled
//                 value={user.svcNo}
//               />
//             </div>

//             <div>
//               <Label>Rank (නිලය)</Label>
//               <Input
//                 disabled
//                 value={user.rank}
//               />
//             </div>

//             <div>
//               <Label>Name (නම)</Label>
//               <Input
//                 disabled
//                 value={user.name}
//               />
//             </div>

//             <div>
//               <Label>Location (ස්ථානය)</Label>
//               <Input
//                 disabled
//                 value={user.userLocation}
//               />
//             </div>

//             <div>
//               <Label>Formation (අංශය)</Label>
//               <Input
//                 disabled
//                 value={user.userFormation}
//               />
//             </div>

//             <div>
//               <Label>Role (භූමිකාව)</Label>
//               <select
//                 name="roleId"
//                 value={formData.roleId}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-lg p-2"
//               >
//                 <option value="">Select Role</option>
//                 {userRole.map((role) => (
//                   <option key={role.roleId} value={role.roleId}>
//                     {role.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end gap-3 pt-4">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>

//             <Button type="submit">
//               Save
//             </Button>
//           </div>

//         </form>
//       </div>

//     </div>
//   );
// };

// export default EditUserModal;
