import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StatusBadge from "./StatusBadge";
import axios from "axios";
import AddService from "./AddServiceModal"
import { useNavigate } from "react-router";
import { useUserContext } from "../../../context/UserContext";

const Service = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [serviceData, setServiceData] = useState<any[]>([]);
    const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    // const [selectedVehicle] = useState<any>(null);
    const { hasPermission } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasPermission("maintenance/view_servicing")) {
            navigate("/germs/");
        }
    }, [hasPermission, navigate]);

    // Fetch Data on Load
    useEffect(() => {
        fetchServiceData();
    }, []);

    const fetchServiceData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/Servicing/getServicingVehicles`
            );
            const data = response.data.map((data: any) => ({
                civilRegNo: data.civilRegNo,
                chassisNo: data.chassisNo,
                modelName: data.vehicleModel?.modelName,
                engineNo: data.engineNo,
                inductionType: data.inductionType,
                currentMileage: data.currentMileage,
                vehicleConditonStatus: data.vehicleServiceStatusId,
                vehicleConditionId: data.vehicleServiceStatusId,
                serviceType: data.status,
                mileageDifference: data.mileageDifference,
                fuelType: data.vehicleModel?.fuelType,
                vehicleColor: data.vehicleModel?.vehicleColor,
                pendingServices: data.pendingServices || []
            }));

            setServiceData(data);
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch Service data." });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: filter vehicles based on search term

    const filteredServiceVehicles = serviceData.filter((v) => {
        const s = searchTerm.toLowerCase();
        return (
            v.civilRegNo.toLowerCase().includes(s) ||
            v.modelName.toLowerCase().includes(s) ||
            v.engineNo.toLowerCase().includes(s) ||
            v.chassisNo.toLowerCase().includes(s) ||
            v.inductionType.toLowerCase().includes(s) ||
            v.currentMileage.toString().includes(s) ||
            v.vehicleConditionId.toString().includes(s)
        );
    });

    // const openCloseServiceModal = async (serviceId: number) => {
    //     const result = await Swal.fire({
    //         title: "Do you want to close this service?",
    //         text: "You won't be able to undo this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "rgb(9, 156, 17)",
    //         cancelButtonColor: "#6b7280",
    //         confirmButtonText: "Yes, close it!",
    //     });

    //     if (result.isConfirmed) {
    //         try {
    //             await axios.put(`${import.meta.env.VITE_API_BASE_URL}/Servicing/${serviceId}/closeService`);
    //             fetchServiceData();
    //             Swal.fire({
    //                 title: "Closed!",
    //                 text: "Service has been closed.",
    //                 icon: "success",
    //             });
    //         } catch (error) {
    //             Swal.fire({
    //                 title: "Error!",
    //                 text: "Something went wrong.",
    //                 icon: "error",
    //             });
    //         }
    //     }
    // }

    const goToServiceRules = () => {
        window.location.href = "/germs/maintenance/service-rules";
    };

    if (hasPermission("maintenance/view_servicing")) {
        return (
            <div className="overflow-x-auto mt-6 border-t pt-8">

                <div className="flex justify-between items-center mb-4 ">
                    <h1 className="text-2xl font-semibold">
                        Service Vehicle Details
                    </h1>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border px-3 py-2 rounded-lg"
                        />

                        <button
                            hidden={!hasPermission("maintenance/add_new_service")}
                            onClick={() => setAddServiceModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            + Add New Service
                        </button>

                        <button hidden={!hasPermission("maintenance/view_service_rule_settings")}
                                className="relative flex items-center justify-center text-gray-500 transition-colors
                                bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11
                                hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800
                                dark:hover:text-white" onClick={() => goToServiceRules()}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.14 12.94C19.19 12.64 19.22 12.32 19.22 12C19.22 11.68 19.19 11.36 19.14 11.06L21.19 9.47C21.37 9.33 21.42 9.08 21.31 8.87L19.31 5.13C19.2 4.92 18.95 4.84 18.73 4.9L16.3 5.65C15.83 5.3 15.31 5.02 14.75 4.82L14.39 2.25C14.36 2.03 14.17 1.87 13.95 1.87H10.05C9.83 1.87 9.64 2.03 9.61 2.25L9.25 4.82C8.69 5.02 8.17 5.3 7.7 5.65L5.27 4.9C5.05 4.84 4.8 4.92 4.69 5.13L2.69 8.87C2.58 9.08 2.63 9.33 2.81 9.47L4.86 11.06C4.81 11.36 4.78 11.68 4.78 12C4.78 12.32 4.81 12.64 4.86 12.94L2.81 14.53C2.63 14.67 2.58 14.92 2.69 15.13L4.69 18.87C4.8 19.08 5.05 19.16 5.27 19.1L7.7 18.35C8.17 18.7 8.69 18.98 9.25 19.18L9.61 21.75C9.64 21.97 9.83 22.13 10.05 22.13H13.95C14.17 22.13 14.36 21.97 14.39 21.75L14.75 19.18C15.31 18.98 15.83 18.7 16.3 18.35L18.73 19.1C18.95 19.16 19.2 19.08 19.31 18.87L21.31 15.13C21.42 14.92 21.37 14.67 21.19 14.53L19.14 12.94ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>

                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3">Civil Reg No</th>
                                <th className="p-3">Model Name</th>
                                <th className="p-3">Engine No</th>
                                <th className="p-3">Chassis No</th>
                                <th className="p-3">Induction Type</th>
                                <th className="p-3">Current Mileage</th>
                                <th className="p-3">Vehicle Condition Status</th>
                                <th className="p-3">Pending Services</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredServiceVehicles.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center p-4">No data found</td>
                                </tr>
                            ) : (
                                filteredServiceVehicles.map((item, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50 text-center">
                                        <td className="p-2">{item.civilRegNo}</td>
                                        <td className="p-2">{item.modelName}</td>
                                        <td className="p-2">{item.engineNo}</td>
                                        <td className="p-2">{item.chassisNo}</td>
                                        <td className="p-2">{item.inductionType}</td>
                                        <td className="p-2">{item.currentMileage}Km</td>
                                        <td className="p-2"><StatusBadge status={item.vehicleConditonStatus} /></td>
                                        <td className="p-2">
                                            {Array.isArray(item.pendingServices) && item.pendingServices.length > 0 ? (
                                                item.pendingServices.map((service: any) => (
                                                    <div
                                                        key={service.serviceId}
                                                        className="flex justify-between items-center gap-2 py-1"
                                                    >
                                                        <span>{service.serviceName}</span>
                                                        {/* <button
                                                            title="Close Service"
                                                            onClick={() => openCloseServiceModal(service.serviceId)}
                                                        >
                                                            <i className="fa-solid fa-eye"></i>
                                                        </button> */}
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400">No pending</span>
                                            )}
                                        </td>
                                        <td>
                                            
                                            <button
                                                title="View Details"
                                                onClick={() => {
                                                    setSelectedVehicle(item);
                                                    setIsViewOpen(true);
                                                }}
                                            >
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <AddService
                    isOpen={isAddServiceModalOpen}
                    onClose={() => setAddServiceModalOpen(false)}
                    onFetchServiceData={fetchServiceData
                    } />

                {isViewOpen && selectedVehicle && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-[99999]">
                        <div className="bg-white rounded-2xl p-6 w-[750px] max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 border-b pb-3">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    🚗 Servicing Vehicle Details
                                </h2>

                                <button
                                    onClick={() => setIsViewOpen(false)}
                                    className="text-gray-500 hover:text-red-500 text-lg font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-5 text-sm">

                                {/* Basic Info */}
                                <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                                    <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">
                                        📌 Basic Info
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3">
                                        <p><span className="font-medium">Civil Reg No:</span> {selectedVehicle.civilRegNo}</p>
                                        <p><span className="font-medium">Chassis No:</span> {selectedVehicle.chassisNo}</p>
                                        <p><span className="font-medium">Induction Type:</span> {selectedVehicle.inductionType}</p>
                                        <p><span className="font-medium">Engine No:</span> {selectedVehicle.engineNo}</p>
                                    </div>
                                </div>

                                {/* Model Info */}
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                                        🚘 Model Info
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3">
                                        <p><span className="font-medium">Model:</span> {selectedVehicle.modelName}</p>
                                        <p><span className="font-medium">Fuel:</span> {selectedVehicle.fuelType}</p>
                                        <p><span className="font-medium">Color:</span> {selectedVehicle.vehicleColor}</p>
                                    </div>
                                </div>


                                {/* Supplier Info */}
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <h3 className="font-semibold text-purple-700 mb-3 border-b pb-1">
                                        🏢 Service Details
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3">
                                        <p>
                                            <span className="font-medium">ServiceType:</span>{" "}
                                            <StatusBadge status={selectedVehicle.vehicleConditionId} />
                                        </p>

                                        {/* <p>
                                        <span className="font-medium">Mileage Difference:</span>{" "}
                                        {selectedVehicle.mileageDifference}Km
                                        </p> */}

                                        <p><span className="font-medium">Current Milage:</span>{" "}
                                            {selectedVehicle.currentMileage} Km</p>
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
            </div>
        );
    } else {
        navigate("/germs/");
    }
};

export default Service;