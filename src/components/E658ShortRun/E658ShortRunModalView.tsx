import React from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedShortRunVehicle: any;
}

const E658ShortRunModalView: React.FC<Props> = ({
    isOpen,
    onClose,
    selectedShortRunVehicle,
}) => {
    if (!isOpen || !selectedShortRunVehicle) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-[99999]">
            <div className="bg-white rounded-2xl p-6 w-[750px] max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        🚗 Short Run Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 text-lg font-bold">
                        ✕
                    </button>
                </div>

                <div className="space-y-5 text-sm">

                    {/* Created User Details */}
                    <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">
                            👤 Created User Details
                        </h3>

                        <div className="grid grid-cols-2 gap-3">

                            <p>
                                <span className="font-medium">
                                    Service No:
                                </span>{" "}
                                {selectedShortRunVehicle.staffServiceNo}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Name:
                                </span>{" "}
                                {selectedShortRunVehicle.staffName}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Rank:
                                </span>{" "}
                                {selectedShortRunVehicle.staffRank}
                            </p>

                        </div>
                    </div>

                    {/* Officer IC Details */}
                    <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-indigo-700 mb-3 border-b pb-1">
                            🎖 Officer IC Details
                        </h3>

                        <div className="grid grid-cols-2 gap-3">

                            <p>
                                <span className="font-medium">
                                    Service No:
                                </span>{" "}
                                {selectedShortRunVehicle.oicServiceNo}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Name:
                                </span>{" "}
                                {selectedShortRunVehicle.oicName}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Rank:
                                </span>{" "}
                                {selectedShortRunVehicle.oicRank}
                            </p>

                        </div>
                    </div>

                    {/* Short Run Details */}
                    <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-blue-700 mb-3 border-b pb-1">
                            🚘 Short Run Details
                        </h3>

                        <div className="grid grid-cols-2 gap-3">

                            <p>
                                <span className="font-medium">
                                    From:
                                </span>{" "}
                                {selectedShortRunVehicle.destinationFrom}
                            </p>

                            <p>
                                <span className="font-medium">
                                    To:
                                </span>{" "}
                                {selectedShortRunVehicle.destinationTo}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Departure Date:
                                </span>{" "}
                                {selectedShortRunVehicle.departureDate}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Return Date:
                                </span>{" "}
                                {selectedShortRunVehicle.returnDate}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Run Type:
                                </span>{" "}
                                {selectedShortRunVehicle.runType}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Purpose:
                                </span>{" "}
                                {selectedShortRunVehicle.purpose}
                            </p>

                        </div>
                    </div>

                    {/* Vehicle Section */}
                    <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-yellow-700 mb-3 border-b pb-1">
                            🚗 Vehicle Details
                        </h3>

                        <div className="grid grid-cols-2 gap-3">

                            {selectedShortRunVehicle.isVehicleAssignfromMT ? (
                                <p className="col-span-2 font-semibold text-blue-600">
                                    Assigned from MT Section
                                </p>
                            ) : (
                                <p>
                                    <span className="font-medium">
                                        Vehicle Number:
                                    </span>{" "}
                                    ගුවන්-{selectedShortRunVehicle.slafRegNo ||
                                        "Not Assigned"}
                                </p>
                            )}

                        </div>
                    </div>

                    {/* OMT Section */}
                    <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-purple-700 mb-3 border-b pb-1">
                            🏢 OMT Details
                        </h3>

                        <div className="grid grid-cols-2 gap-3">

                            {selectedShortRunVehicle.isOmtAssignfromMT ? (
                                <p className="col-span-2 font-semibold text-blue-600">
                                    Assigned from MT Section
                                </p>
                            ) : (
                                <>
                                    <p>
                                        <span className="font-medium">
                                            OMT Service No:
                                        </span>{" "}
                                        {selectedShortRunVehicle.omtServiceNo ||
                                            "Not Assigned"}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            OMT Name:
                                        </span>{" "}
                                        {selectedShortRunVehicle.omtName || "Not Assigned"}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            OMT Rank:
                                        </span>{" "}
                                        {selectedShortRunVehicle.omtRank || "Not Assigned"}
                                    </p>
                                </>
                            )}

                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-green-50 rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-green-700 mb-3 border-b pb-1">
                            📊 Status
                        </h3>

                        <div className="grid grid-cols-2 gap-3">

                            <p className="font-semibold text-blue-600">
                                <span className="font-medium">
                                    Status:
                                </span>{" "}
                                {selectedShortRunVehicle.status}
                            </p>

                        </div>
                    </div>




                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6 border-t pt-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default E658ShortRunModalView;