 
interface Props {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
}
 
const RegisterVehicleAirForceView : React.FC<Props> = ({ isOpen, onClose, vehicle }) => {

    const vehicleData = {
    id: vehicle?.id,
    civilRegNo: vehicle?.civilRegNo,
    slafRegNo: vehicle?.slafRegNo,
    inventoryNo: vehicle?.inventoryNo,
    isActive: vehicle?.isActive,
    modelName: vehicle?.modelName,
    fuelType: vehicle?.fuelType,
    milage: vehicle?.milage,
    vehicleColor: vehicle?.vehicleColor,
    modelYear: vehicle?.modelYear,
    engineNo: vehicle?.engineNo,
    isRegistered: vehicle?.isRegistered,
    isAllocated: vehicle?.isAllocated,
    supplierName: vehicle?.supplierName,
    purchaseOrderNo: vehicle?.purchaseOrderNo,
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Display Status badge with different colors for Yes/No values

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
    // Des: Register Vehicle in Air Force Modal - Display Vehicle Details in a Modal

    if (!isOpen) return null;
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-[99999]">
                <div className="bg-white rounded-2xl p-6 w-[750px] max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 border-b pb-3">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        🚗 Vehicle Details
                        </h2>

                        <button
                        onClick={() => onClose()}
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
                                <p><span className="font-medium">Civil Reg No:</span> {vehicleData.civilRegNo}</p>
                                <p><span className="font-medium">SLAF Reg No:</span> {vehicleData.slafRegNo}</p>
                                <p><span className="font-medium">Inventory No:</span> {vehicleData.inventoryNo}</p>
                                <p><span className="font-medium">Engine No:</span> {vehicleData.engineNo}</p> 
                                <p><span className="font-medium">Milage:</span> {vehicleData.milage} Km</p>
                            </div>
                        </div>

                        {/* Model Info */}
                        <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                            🚘 Model Info
                        </h3>

                            <div className="grid grid-cols-2 gap-3">
                                <p><span className="font-medium">Model:</span> {vehicleData.modelName}</p>
                                <p><span className="font-medium">Fuel:</span> {vehicleData.fuelType}</p>
                                <p><span className="font-medium">Color:</span> {vehicleData.vehicleColor}</p>
                                {/* <p><span className="font-medium">Horse Power:</span> {vehicleData.horsePower}</p> */}
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
                                <StatusBadge value={vehicleData.isAllocated} />
                                </p>

                                <p>
                                <span className="font-medium">Registered:</span>{" "}
                                <StatusBadge value={vehicleData.isRegistered} />
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
                            {/* {selectedVehicle.supplierName} */}
                            </p>

                            <p>
                            <span className="font-medium">Purchase Order No:</span>{" "}
                            {/* {selectedVehicle.purchaseOrderNo} */}
                            </p>
                        </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end mt-6 border-t pt-3">
                        <button
                        onClick={() => onClose()}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
                        >
                        Close
                        </button>
                    </div>

                </div>
            </div>
        );
    };
 
export default RegisterVehicleAirForceView;