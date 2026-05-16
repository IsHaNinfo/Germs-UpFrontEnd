import Label from "../form/Label";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import AddFormationModel from "../../pages/Allocation/AddFormationModel";
import AddLocationModel from "../../pages/Allocation/AddLocationModel";

const Allocation = () => {

    const initialState = {
        chassisNo: "",
        locationId: "",
        formationId: "",
        allocationType: "",
        createdBy: "",
        createdIpAddress: "",
    };


    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: status badge set color based on value

    const StatusBadge = ({ value }: any) => (
        <span
            className={`px-2 py-1 rounded text-white text-xs ${value ? "bg-blue-500" : "bg-red-500"
                }`}
        >
            {value ? "Yes" : "No"}
        </span>
    );

    const [formData, setFormData] = useState(initialState);
    const [formationData, setFormationData] = useState<any[]>([]);
    const [locationData, setLocationData] = useState<any[]>([]);
    const [isFormationModalOpen, setAddFormationModalOpen] = useState(false);
    const [isLocationModalOpen, setAddLocationModalOpen] = useState(false);
    const [allocationData, setAllocationData] = useState<any[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch Data on Load

    useEffect(() => {
        fetchLocationData();
        getAllAllocatevehicleData();
    }, []);

 
    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Filter vehicles based on search term

    const filteredVehicles = allocationData.filter((v) => {
        const s = searchTerm.toLowerCase();
        return (
            v.civilRegNo?.toLowerCase().includes(s) ||
            v.stationOrBase?.toLowerCase().includes(s) ||
            v.modelName?.toLowerCase().includes(s) ||
            v.engineNo?.toLowerCase().includes(s) ||
            v.vehicleColor?.toLowerCase().includes(s) ||
            v.fuelType?.toLowerCase().includes(s) ||
            v.chassisNo?.toLowerCase().includes(s) ||
            v.supplierName?.toLowerCase().includes(s)
        );
    });


    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch location data for location dropdown in allocation form

    const fetchLocationData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/Location`,
            );
            const locations = response.data.map((location: any) => ({
                locationId: location.locationId,
                locationName: location.stationOrBase,
            }));
            setLocationData(locations);

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch location data." });
        }
    }

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch allocated vehicle data to display in table and view modal

    const getAllAllocatevehicleData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/VehicleAllocation`
            );

            const data = response.data.map((allocation: any) => ({

                allocationId: allocation.allocationId,

                chassisNo: allocation.chassisNo,

                stationOrBase: allocation.location?.stationOrBase,

                supplierName: allocation.vehicleDetail?.supplier?.supplierName,

                vehicleColor: allocation.vehicleDetail?.vehicleModel?.vehicleColor,

                fuelType: allocation.vehicleDetail?.vehicleModel?.fuelType,

                modelName: allocation.vehicleDetail?.vehicleModel?.modelName,

                engineNo: allocation.vehicleDetail?.engineNo,

                civilRegNo: allocation.vehicleDetail?.civilRegNo,

                milage: allocation.vehicleDetail?.milage,

                horsePower: allocation.vehicleDetail?.vehicleModel?.horsePower,

                allocationDate: allocation.createdDate,

                allocationType: allocation.allocationType,

                location: allocation.location,

                supplier: allocation.vehicleDetail?.supplier?.supplierName,

                purchaseOrderNo: allocation.vehicleDetail?.supplier?.purchaseOrderNo,

                isAllocated: allocation.vehicleDetail?.isAllocated,

                isRegistered: allocation.vehicleDetail?.isRegistered,
            }));

            setAllocationData(data);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch vehicle allocation data."
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const vehicleData = {
            chassisNo: formData.chassisNo,
            locationId: Number(formData.locationId),
            formationId: Number(formData.formationId),
            allocationType: formData.allocationType,
            createdBy: "Admin", // Replace with actual user data
            createdIpAddress: "11.11.111", // Replace with actual IP address
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/vehicleAllocation`, vehicleData);
            Swal.fire({ icon: "success", title: "Success", text: "Vehicle Allocated Successfully!" });

            //RESET FORM
            setFormData(initialState);

        } catch (error: any) {
            const message = error.response?.data?.detail
            error.message ||
                "Failed to allocate vehicle.";
            Swal.fire({ icon: "error", title: "Error", text: message });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch formation data for location dropdown

    const handleLocationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {

        // Update form data with selected vehicle type    
        handleChange(e);
        const locationId = e.target.value;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/Formation/by-location/${locationId}`,
            );
            const FormationData = response.data.map((model: any) => ({
                formationId: model.formationId,
                formationName: model.formation,
            }));
            setFormationData(FormationData);

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch formation data." });
        }
    }

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch formation data for location dropdown

    const refreshFormationData = async () => {
        if (!formData.locationId) return;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/Formation/by-location/${formData.locationId}`
            );

            const FormationData = response.data.map((model: any) => ({
                formationId: model.formationId,
                formationName: model.formation,
            }));

            setFormationData(FormationData);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch formation data."
            });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch allocated vehicle data to display in table and view modal after allocation or on demand from view modal to get latest data of selected vehicle

    return (
        <div>
            <div className="mb-10 border-b pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Vehicle Allocation
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Allocate a vehicle to a specific location and formation
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Label>Chassis No. (චාසිස් අංකය)<span className="text-red-500">*</span></Label>
                        <Input
                            name="chassisNo"
                            value={formData.chassisNo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label>Location (ස්ථානය)<span className="text-red-500">*</span></Label>
                        <div className="flex gap-2">
                            <select name="locationId"
                                value={formData.locationId}
                                onChange={handleLocationChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Location</option>
                                {locationData.map((location) => (
                                    <option key={location.locationId} value={location.locationId}>
                                        {location.locationName}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() => setAddLocationModalOpen(true)}
                                className="px-3 rounded-lg bg-blue-600 text-white font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <Label>Formation (පිහිටුවීම)<span className="text-red-500">*</span></Label>
                        <div className="flex gap-2">
                            <select
                                name="formationId"
                                value={formData.formationId}
                                onChange={handleChange}
                                required
                                disabled={!formationData.length} // Disable if no formations available
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Formation</option>
                                {formationData.map((formation) => (
                                    <option key={formation.formationId} value={formation.formationId}>
                                        {formation.formationName}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() => setAddFormationModalOpen(true)}
                                className="px-3 rounded-lg bg-blue-600 text-white font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <Label>Allocation Type (වෙන් කිරීමේ වර්ගය)<span className="text-red-500">*</span></Label>
                        <select
                            name="allocationType"
                            value={formData.allocationType}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Allocation Type</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Temporary">Temporary</option>
                        </select>
                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-12  pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => (window.location.href = "/germs/induction")}
                    >
                        Back
                    </Button>

                    <Button type="submit" className="px-6">
                        Allocate Vehicle
                    </Button>
                </div>
            </form>

            <div className="overflow-x-auto mt-6 border-t pt-8">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Allocation Vehicle Details</h2>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="border px-3 py-2 rounded-lg w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* <h2 className="text-xl font-bold mb-4">Allocation Vehicle Details</h2> */}
                <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Civil Reg No</th>
                            <th className="p-2 border">Station / Base</th>
                            <th className="p-2 border">Model Name</th>
                            <th className="p-2 border">Engine No</th>
                            <th className="p-2 border">Vehicle Color</th>
                            <th className="p-2 border">Fuel Type</th>
                            <th className="p-2 border">Chassis No</th>
                            <th className="p-2 border">Supplier</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredVehicles.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center p-4">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            filteredVehicles.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-2 border">
                                        {item.civilRegNo}
                                    </td>

                                    <td className="p-2 border">
                                        {item.stationOrBase}
                                    </td>

                                    <td className="p-2 border">
                                        {item.modelName}
                                    </td>

                                    <td className="p-2 border">
                                        {item.engineNo}
                                    </td>

                                    <td className="p-2 border">
                                        {item.vehicleColor}
                                    </td>

                                    <td className="p-2 border">
                                        {item.fuelType}
                                    </td>

                                    <td className="p-2 border font-medium">
                                        {item.chassisNo}
                                    </td>

                                    <td className="p-2 border">
                                        {item.supplierName}
                                    </td>

                                    <td className="flex justify-center gap-3 p-2">
                                        <button className="text-blue-600" onClick={() => {
                                            setSelectedVehicle(item);
                                            setIsViewOpen(true);
                                        }}>
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
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

                        <div className="space-y-5 text-sm">

                            {/* Basic Info */}
                            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">
                                    📌 Basic Info
                                </h3>

                                <div className="grid grid-cols-2 gap-3">
                                    <p><span className="font-medium">Chassis:</span> {selectedVehicle.chassisNo}</p>
                                    <p><span className="font-medium">Engine:</span> {selectedVehicle.engineNo}</p>
                                    <p><span className="font-medium">Milage:</span> {selectedVehicle.milage} Km</p>
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
                                    <p><span className="font-medium">Horse Power:</span> {selectedVehicle.horsePower}</p>
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

                            {/* Supplier Info */}
                            <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                <h3 className="font-semibold text-purple-700 mb-3 border-b pb-1">
                                    🏢 Supplier Details
                                </h3>

                                <div className="grid grid-cols-2 gap-3">
                                    <p>
                                        <span className="font-medium">Supplier Name:</span>{" "}
                                        {selectedVehicle.supplierName}
                                    </p>

                                    <p>
                                        <span className="font-medium">Purchase Order No:</span>{" "}
                                        {selectedVehicle.purchaseOrderNo}
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

            <AddFormationModel
                isOpen={isFormationModalOpen}
                isSetLocationID={formData.locationId} // Pass selected location ID to formation modal
                onClose={() => setAddFormationModalOpen(false)}
                refreshFormationData={refreshFormationData}
            />

            <AddLocationModel
                isOpen={isLocationModalOpen}
                onClose={() => setAddLocationModalOpen(false)}
                fetchLocationData={fetchLocationData}
            />
        </div>
    )
}

export default Allocation;