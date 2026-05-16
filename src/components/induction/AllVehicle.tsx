import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllVehicle = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);

  useEffect(() => {
    GetAllVehicleList();
  }, []);

  const GetAllVehicleList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/vehicle`);
      setVehicles(res.data);
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle data." });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: filter vehicles based on search term

  const filteredVehicles = vehicles.filter((v) => {
    const s = searchTerm.toLowerCase();
    return (
      v.chassisNo?.toLowerCase().includes(s) ||
      v.vehicleModel?.modelName?.toLowerCase().includes(s) ||
      v.vehicleModel?.fuelType?.toLowerCase().includes(s) ||
      v.vehicleModel?.vehicleColor?.toLowerCase().includes(s)
    );
  });

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: delete vehicle

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/vehicle/${deleteId}`);
      Swal.fire({ icon: "success", title: "Deleted", text: "Vehicle deleted successfully." });
      setDeleteId(null);
      GetAllVehicleList();
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Delete failed." });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: status badge component

  const StatusBadge = ({ value }: any) => (
    <span
      className={`px-2 py-1 rounded text-white text-xs ${
        value ? "bg-blue-500" : "bg-red-500"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  );

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: view vehicle details in a modal
  
  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Vehicles</h2>

        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Civil Reg No</th>
              <th className="p-3">Chassis No</th>
              <th className="p-3">Model</th>
              <th className="p-3">Mileage</th>
              <th className="p-3">Fuel</th>
              <th className="p-3">Color</th>
              <th className="p-3">Year</th>
              <th className="p-3">Allocated</th>
              <th className="p-3">Registered</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((v, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 text-center">
                  <td className="p-2">{v.civilRegNo}</td>
                  <td className="p-2">{v.chassisNo}</td>
                  <td className="p-2">{v.vehicleModel?.modelName}</td>
                  <td className="p-2">{v.milage} Km</td>
                  <td className="p-2">{v.vehicleModel?.fuelType}</td>
                  <td className="p-2">{v.vehicleModel?.vehicleColor}</td>
                  <td className="p-2">
                    {v.vehicleModel?.modelYear
                      ? new Date(v.vehicleModel.modelYear).toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>

                  <td><StatusBadge value={v.isAllocated} /></td>
                  <td><StatusBadge value={v.isRegistered} /></td>
                 
                  <td className="flex justify-center gap-3 p-2">
                  
                    <button className="text-blue-600"   onClick={() => {
                        setSelectedVehicle(v);
                        setIsViewOpen(true);
                      }}>
                       <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No vehicles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {isViewOpen && selectedVehicle && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-[99999]">
        <div className="bg-white rounded-2xl p-6 w-[750px] max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">

          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              🚗 Vehicle Details
            </h2>

            <button
              onClick={() => setIsViewOpen(false)}
              className="text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-5 text-sm">

            {/* Basic Info */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">
                📌 Basic Info
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <p>
                  <span className="font-medium">Chassis:</span>{" "}
                  {selectedVehicle.chassisNo}
                </p>

                <p>
                  <span className="font-medium">Engine:</span>{" "}
                  {selectedVehicle.engineNo}
                </p>

                <p>
                  <span className="font-medium">Milage:</span>{" "}
                  {selectedVehicle.milage} Km
                </p>
              </div>
            </div>

            {/* Model Info */}
            <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                🚘 Model Info
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <p>
                  <span className="font-medium">Model:</span>{" "}
                  {selectedVehicle.vehicleModel?.modelName}
                </p>

                <p>
                  <span className="font-medium">Fuel:</span>{" "}
                  {selectedVehicle.vehicleModel?.fuelType}
                </p>

                <p>
                  <span className="font-medium">Color:</span>{" "}
                  {selectedVehicle.vehicleModel?.vehicleColor}
                </p>

                <p>
                  <span className="font-medium">Horse Power:</span>{" "}
                  {selectedVehicle.vehicleModel?.horsePower}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="bg-green-50 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                📊 Status
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <p>
                  <span className="font-medium">Allocated:</span>{" "}
                  <StatusBadge value={selectedVehicle.isAllocated} />
                </p>

                <p>
                  <span className="font-medium">Registered:</span>{" "}
                  <StatusBadge value={selectedVehicle.isRegistered} />
                </p>
              </div>
            </div>

            {/* Supplier */}
            <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-purple-700 mb-3 border-b pb-1">
                🏢 Supplier Details
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <p>
                  <span className="font-medium">Supplier Name:</span>{" "}
                  {selectedVehicle.supplier?.supplierName}
                </p>

                <p>
                  <span className="font-medium">Purchase Order No:</span>{" "}
                  {selectedVehicle.supplier?.purchaseOrderNo}
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end mt-6 border-t pt-3">
            <button
              onClick={() => setIsViewOpen(false)}
              className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    )}


      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-100000">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
            <p className="mb-4">Are you sure you want to delete?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllVehicle;