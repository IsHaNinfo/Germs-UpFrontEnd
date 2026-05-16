// import { useState } from "react";
// import axios from "axios";
// import { Modal } from "../ui/modal";
// import Button from "../ui/button/Button";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";

// export default function AddVehicleModal({
//   onAdded,
// }: {
//   onAdded: (v: Vehicle) => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [vehicle, setVehicle] = useState<Vehicle>({
//     chassisNo: "",
//     modalName: "",
//     engineNo: "",
//     slafRegNo: "",
//     civilRegNo: "",
//     inventoryNo: "",
//     typeID: "",
//     modelID: "",
//     typeOfInduction: "",
//     inductionDate: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setVehicle({ ...vehicle, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await axios.post(
//       "https://localhost:7271/api/Vehicle",
//       vehicle
//     );

//     onAdded(res.data);
//     setOpen(false);
//     setVehicle({
//       chassisNo: "",
//       modalName: "",
//       engineNo: "",
//       slafRegNo: "",
//       civilRegNo: "",
//       inventoryNo: "",
//       typeID: "",
//       modelID: "",
//       typeOfInduction: "",
//       inductionDate: "",
//     });
//     setLoading(false);
//   };

//   return (
//     <>
//       <div className="flex justify-end mb-6">
//         <div className="flex gap-3">
//           <Input
//             type="text"
//             placeholder="Search vehicle..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-64"
//           />
//           <Button size="sm">
//             Search
//           </Button>
//         </div>
//       </div>

//       <Modal isOpen={open} onClose={() => setOpen(false)} className="max-w-[700px]">
//         <div className="p-6 bg-white rounded-3xl">
//           <h3 className="text-xl font-semibold mb-4">Add Vehicle</h3>

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             {[
//               ["modalName", "Modal Name"],
//               ["chassisNo", "Chassis No"],
//               ["engineNo", "Engine No"],
//               ["slafRegNo", "SLAF Reg No"],
//               ["civilRegNo", "Civil Reg No"],
//               ["inventoryNo", "Inventory No"],
//               ["typeID", "Type ID"],
//               ["modelID", "Model ID"],
//               ["typeOfInduction", "Type Of Induction"],
//             ].map(([name, label]) => (
//               <div key={name}>
//                 <Label>{label}</Label>
//                 <Input name={name} value={(vehicle as any)[name]} onChange={handleChange} />
//               </div>
//             ))}

//             <div>
//               <Label>Induction Date</Label>
//               <Input
//                 type="date"
//                 name="inductionDate"
//                 value={vehicle.inductionDate}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-span-2 flex justify-end gap-3 mt-4">
//               <Button variant="outline" onClick={() => setOpen(false)}>
//                 Cancel
//               </Button>
//               <Button disabled={loading}>
//                 {loading ? "Saving..." : "Save"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </>
//   );
// }