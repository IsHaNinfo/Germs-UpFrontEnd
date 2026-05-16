import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const maintenanceAllVehicle  = () => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

    useEffect(() => {
        GetAllMaintenanceVehicleList();
    }, []);

    const GetAllMaintenanceVehicleList = async () => {
        try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Servicing/allVehicleServices`);
        setVehicles(res.data);
        } catch {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle data." });
        }
  };

      //filter vehicles based on search term
    const filteredVehicles = vehicles.filter((v) => {
        const s = searchTerm.toLowerCase();
        return (
        v.chassisNo?.toLowerCase().includes(s) ||
        v.vehicleModel?.modelName?.toLowerCase().includes(s) ||
        v.vehicleModel?.fuelType?.toLowerCase().includes(s) ||
        v.vehicleModel?.vehicleColor?.toLowerCase().includes(s)
        );
    });

    return (
    
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Maintenance Vehicles</h2>
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
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((v, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 text-center">
                  <td className="p-2">{v.civilRegNo}</td>
                  <td className="p-2">{v.chassisNo}</td>
                  <td className="p-2">{v.vehicleModelName}</td>
                  <td className="p-2">{v.mileage} Km</td>
                 
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
              🚗 Vehicle Maintenance Details
            </h2>

            <button
              onClick={() => setIsViewOpen(false)}
              className="text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
          </div>

        {/* Content */}
        <div className="space-y-5 text-sm sticky">

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
                    <span className="font-medium">Vehicle Civil Number:</span>{" "}
                    {selectedVehicle.civilRegNo}
                </p>

                <p>
                    <span className="font-medium">Vehicle Model:</span>{" "}
                    {selectedVehicle.vehicleModelName}
                </p>

                <p>
                  <span className="font-medium">Current Milage:</span>{" "}
                  {selectedVehicle.mileage} Km
                </p>
             
              </div>
            </div>

            {/* Service Record Info */}
            <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                    🚘 Service Record Info
                </h3>

                {selectedVehicle.services &&
                selectedVehicle.services.length > 0 ? (

                    <div className="space-y-4">

                    {selectedVehicle.services.map((service: any, index: number) => (
                        <div
                        key={index}
                        className="bg-white border rounded-lg p-3 shadow-sm"
                        >
                        <p>
                            <span className="font-medium">Service Type:</span>{" "}
                            {service.serviceTypeName}
                        </p>

                        <p>
                            <span className="font-medium">Open Date:</span>{" "}
                            {service.openDate}
                        </p>

                        <p>
                            <span className="font-medium">Close Date:</span>{" "}
                            {service.closeDate || "Not Closed"}
                        </p>

                        {/* Details Loop */}
                        {service.details &&
                        service.details.map((detail: any, i: number) => (
                            <div
                            key={i}
                            className="mt-3 bg-gray-50 border rounded p-2"
                            >

                            <p>
                                <span className="font-medium">Service Done Date:</span>{" "}
                                {detail.serviceDoneAtDate}
                            </p>

                            <p>
                                <span className="font-medium">Mileage:</span>{" "}
                                {detail.serviceDoneAtMileage} Km
                            </p>

                            <p>
                                <span className="font-medium">Next Service Mileage:</span>{" "}
                                {detail.nextServiceMileage} Km
                            </p>

                            </div>
                        ))}

                        </div>
                    ))}

                    </div>

                ) : (
                    <p className="text-gray-500">No service records available</p>
                )}
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
    </div>
  );
}

export default maintenanceAllVehicle;