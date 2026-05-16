import VehicleRegisterAirForceModel from "./VehicleRegisterAirForceModel";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import RegisterVehicleAirForceView from "./RegisterVehicleAirFirceView";
 
const VehicleRegistrationAirForce = () => {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isRegistrationVehicleViewOpen, setRegistrationVehicleViewOpen] = useState(false);
  const [vehicleList, setVehicleList] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [search, setSearch] = useState("");
 
  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Fetch Registered Vehicles in Air Force List from API and Map to Required Format for Display

  const fetchRegisterVehicleAirForceList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/VehicleReg`
      );

      const registeredVehicles = response.data.map((vehicle: any) => ({
        id: vehicle.vehicleRegisterId,
        civilRegNo: vehicle.vehicleDetail?.civilRegNo,
        slafRegNo: vehicle.slafRegNo,
        inventoryNo: vehicle.inventoryNo,
        isActive: vehicle.isActive,
        modelName:vehicle.vehicleDetail?.model?.modelName,
        fuelType:vehicle.vehicleDetail?.model?.fuelType,
        milage:vehicle.vehicleDetail?.milage,
        vehicleColor:vehicle.vehicleDetail?.model?.vehicleColor,
        modelYear:vehicle.vehicleDetail?.model?.modelYear,
        engineNo:vehicle.vehicleDetail?.engineNo,
        isRegistered:vehicle.vehicleDetail?.isRegistered,
        isAllocated:vehicle.vehicleDetail?.isAllocated,
        supplierName:vehicle.vehicleDetail?.supplier?.supplierName,
        purchaseOrderNo:vehicle.vehicleDetail?.supplier?.purchaseOrderNo,

      }));
 
      setVehicleList(registeredVehicles);
 
      } catch (error: any) {
 
        const message = error.response?.data?.detail
        error.message ||
        "Failed to register vehicle in Air Force.";
        Swal.fire({ icon: "error", title: "Error", text: message });
      }
  };
 
  useEffect(() => {
    fetchRegisterVehicleAirForceList();
  }, []);
 
  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Filter Registered Vehicles in Air Force List based on Search Input

  const filteredVehicles = vehicleList.filter((v) =>
    Object.values(v)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
 
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-semibold">
          Vehicle Registration - Air Force
        </h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          />
 
          <button
            onClick={() => setRegistrationModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add New
          </button>
 
        </div>
      </div>
 
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full text-sm">
 
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Civil Reg No</th>
              <th className="p-3">SLAF Reg No</th>
              <th className="p-3">Inventory No</th>
              <th className="p-3">Model Name</th>
              <th className="p-3">Fuel Type</th>
              <th className="p-3">Milage</th>
              <th className="p-3">Vehicle Color</th>
              <th className="p-3">Model Year</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
 
          <tbody>
 
            {filteredVehicles.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-gray-500"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-t hover:bg-gray-50 text-center">
                  <td className="p-2">{vehicle.civilRegNo}</td>
                  <td className="p-2">{vehicle.slafRegNo}</td>
                  <td className="p-2">{vehicle.inventoryNo}</td>
                  <td className="p-2">{vehicle.modelName}</td>
                  <td className="p-2">{vehicle.fuelType}</td>
                  <td className="p-2">{vehicle.milage} Km</td>
                  <td className="p-2">{vehicle.vehicleColor}</td>
                  <td className="p-2">{vehicle.modelYear}</td>
                  <td className="p-2">
                    {vehicle.isActive ? (
                      <span className="text-blue-600 font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        No
                      </span>
                    )}
                  </td>
                  <td className="flex justify-center gap-3 p-2">                  
                    <button className="text-blue-600"
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setRegistrationVehicleViewOpen(true);}}
                      data-vehicle-id={vehicle}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
     
      <VehicleRegisterAirForceModel
        isOpen={isRegistrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        onRegisterVehicleAirForce={
          fetchRegisterVehicleAirForceList
        }
      />
 
      <RegisterVehicleAirForceView
        isOpen={isRegistrationVehicleViewOpen}
        onClose={() => setRegistrationVehicleViewOpen(false)}
        vehicle={selectedVehicle}
      />
    </div>
  );
};
 
export default VehicleRegistrationAirForce;