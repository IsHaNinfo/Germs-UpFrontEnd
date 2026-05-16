import Button from "../ui/button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import E658AddRunTypeModal from "./E658RunTypeModal";
import DatePicker from "../../components/form/date-picker.tsx";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onfetchDataList: () => void;
}

const E658ShortRunModal: React.FC<Props> = ({ isOpen, onClose, onfetchDataList }) => {

    const initialState = {
        serviceNo: '',
        name: '',
        userLocation: '',
        userFormation: '',
        rank: '',
        destinationFrom: '',
        destinationTo: '',
        departureDate: '',
        returnDate: '',
        runType: '',
        status: '',
        createdBy: 'Admin',

        // Step 2
        route: "",
        purpose: '',

        // STEP 3
        oicServiceNo: "",
        oicName: "",
        oicRank: "",
        isOmtAssignfromMT: true,
        omtServiceNo: "",
        omtName: "",
        omtRank: "",
        isVehicleAssignfromMT: true,
        slafRegNo: "",
        chassisNo: ""
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch Data on Load

    useEffect(() => {
        fetchRunTypeData();
        fetchLocationData();
    }, []);

    const [formData, setFormData] = useState(initialState);
    const [runTypeData, setRunTypeData] = useState<any[]>([]);
    const [locationData, setLocationData] = useState<any[]>([]);
    const [step, setStep] = useState(1);
    const [isRunTypeModalOpen, addRunTypeModalOpen] = useState(false);

    type FormElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

    const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

    // Next Step
    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    // Back Step
    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const formatDate = (date: string) => {
        return new Date(date).toISOString().split("T")[0];
    };


    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Submit Form Data

    const handleSubmit = async (e: React.FormEvent) => {

        console.log("FormData:", formData);
        e.preventDefault();

        if (step !== 3) return;

        e.preventDefault();

        const vehicleData = {

            runTypeID: Number(formData.runType),
            staffServiceNo: formData.serviceNo,
            currentLocation: formData.userLocation,
            currentDivision: formData.userFormation,
            destinationFrom: formData.destinationFrom,
            destinationTo: formData.destinationTo,
            departureDate: formatDate(formData.departureDate),
            returnDate: formatDate(formData.returnDate),
            oicServiceNo: formData.oicServiceNo,
            purpose: formData.purpose,
            route: formData.route,
            isOmtAssignfromMT: formData.isOmtAssignfromMT,
            omtServiceNo: formData.omtServiceNo,
            slafRegNo: formData.slafRegNo,
            isVehicleAssignfromMT: formData.isVehicleAssignfromMT
        };

        try {
            console.log("Submitting Vehicle Data:", vehicleData);
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/E658CreatedDetails`, vehicleData);
            setFormData(initialState);
            onfetchDataList();
            onClose();
            Swal.fire({ icon: "success", title: "Success", text: "Create Short Run Successfully!" });

            onClose();
        } catch (error: any) {
            const message = error.response?.data?.detail
            error.message ||
                "Failed to register vehicle in Air Force.";
            Swal.fire({ icon: "error", title: "Error", text: message });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch Officer Details

    const getOfficerDetails = async (e: any) => {
        handleChange(e);

        const serviceNo = e.target.value;

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/User/getbysvcno?SvcNo=${serviceNo}`
            );

            setFormData((prev) => ({
                ...prev,
                oicName: response.data.name,
                oicRank: response.data.rank,
            }));

        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch officer data."
            });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch OMT Details

    const getOMTDetails = async (e: any) => {
        handleChange(e);

        const serviceNo = e.target.value;

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/User/getbysvcno?SvcNo=${serviceNo}`
            );

            setFormData((prev) => ({
                ...prev,
                omtName: response.data.name,
                omtRank: response.data.rank,
            }));

        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch OMT data."
            });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch User Details

    const getUserDetails = async (e: any) => {
        handleChange(e);
        const serviceNo = e.target.value;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/User/getbysvcno?SvcNo=${serviceNo}`,
            );

            setFormData((prevFormData) => ({
                ...prevFormData,
                name: response.data.name,
                userLocation: response.data.userLocation,
                userFormation: response.data.division,
                rank: response.data.rank,
            }));

        } catch (error: any) {
            const message = error.response?.data?.detail
            error.message ||
                "Failed to fetch user data.";
            Swal.fire({ icon: "error", title: "Error", text: message });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch Run Type Data

    const fetchRunTypeData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/E658RunType`);
            const runTypeData = response.data.map((type: any) => ({
                runTypeID: type.runTypeID,
                runType: type.runType
            }));
            setRunTypeData(runTypeData);
        } catch (error: any) {
            const message = error.response?.data?.detail
            error.message ||
                "Failed to fetch Run type data.";
            Swal.fire({ icon: "error", title: "Error", text: message });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch Location Data

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

        } catch (error: any) {
            const message = error.response?.data?.detail
            error.message ||
                "Failed to fetch location data.";
            Swal.fire({ icon: "error", title: "Error", text: message });
        }
    }

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Fetch Vehicle Details

    const getVehicleDetails = async (e: any) => {
        handleChange(e);

        const regNo = "ගුවන්-" + e.target.value;

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/VehicleReg/${regNo}`
            );

            setFormData((prev) => ({
                ...prev,
                chassisNo: response.data.vehicleDetail.chassisNo,
            }));

        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch vehicle data."
            });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Validate required fields per step

    const isStepValid = () => {
        if (step === 1) {
            return (
                formData.serviceNo.trim() !== ""
            );
        }

        if (step === 2) {
            return (
                formData.destinationFrom !== "" &&
                formData.destinationTo !== "" &&
                formData.departureDate !== "" &&
                formData.returnDate !== "" &&
                formData.runType !== "" &&
                formData.purpose.trim() !== ""
            );
        }

        if (step === 3) {
            if (!formData.isOmtAssignfromMT) {
                if (formData.omtServiceNo.trim() === "") return false;
            }

            if (!formData.isVehicleAssignfromMT) {
                if (formData.slafRegNo.trim() === "") return false;
            }

            return formData.oicServiceNo.trim() !== "";
        }

        return false;
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Clear Form

    const handleClear = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will clear all entered data.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Clear",
        }).then((result) => {
            if (result.isConfirmed) {
                setFormData(initialState);
                setStep(1);

                Swal.fire({
                    icon: "success",
                    title: "Cleared",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: Create E658 ShortRun Create 

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100000]">
            {/* Background */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white overflow-y-auto rounded-lg p-6 shadow-2xl animate-fadeIn w-[1000px] max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-semibold">
                        E658 Short Run Create Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl font-bold hover:opacity-70"
                    >
                        ✕
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="text-center font-semibold mb-6">
                    Step {step} of 3
                </div>

                <form onSubmit={handleSubmit}>
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label>
                                    Service No (සේවා අංකය)
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    name="serviceNo"
                                    value={formData.serviceNo}
                                    onBlur={getUserDetails}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label>
                                    Name (නම)
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>
                                    User Location (පරිශීලක ස්ථානය)
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    name="userLocation"
                                    value={formData.userLocation}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>
                                    User Formation (ස්ථානය)
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    name="userFormation"
                                    value={formData.userFormation}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>
                                    Rank (නිලය)
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    name="rank"
                                    value={formData.rank}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label>
                                    Destination From (ගමනාන්තය සිට)
                                    <span className="text-red-500">*</span>
                                </Label>

                                <select
                                    name="destinationFrom"
                                    value={formData.destinationFrom}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="">Select Location</option>

                                    {locationData.map((location) => (
                                        <option
                                            key={location.locationId}
                                            value={location.locationName}
                                        >
                                            {location.locationName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label>
                                    Destination To (ගමනාන්තය දක්වා)
                                    <span className="text-red-500">*</span>
                                </Label>

                                <select
                                    name="destinationTo"
                                    value={formData.destinationTo}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="">Select Location</option>

                                    {locationData.map((location) => (
                                        <option
                                            key={location.locationId}
                                            value={location.locationName}
                                        >
                                            {location.locationName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label>Departure Date (පිටත්වීමේ දිනය)<span className="text-red-500">*</span></Label>
                                <DatePicker id="departure-date-picker"
                                    placeholder="Select a date"
                                    onChange={(_dates, currentDateString) => {
                                        setFormData({
                                            ...formData,
                                            departureDate: currentDateString,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Return Date (ආපසු පැමිණීමේ දිනය)<span className="text-red-500">*</span></Label>
                                <DatePicker id="return-date-picker"
                                    placeholder="Select a date"
                                    onChange={(_dates, currentDateString) => {
                                        setFormData({
                                            ...formData,
                                            returnDate: currentDateString,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Run Type (ධාවන වර්ගය)<span className="text-red-500">*</span></Label>
                                <div className="flex gap-2">
                                    <select
                                        name="runType"
                                        value={formData.runType}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                    >
                                        <option value="">Select Type</option>
                                        {runTypeData.map((runType) => (
                                            <option key={runType.runTypeID} value={runType.runTypeID}>
                                                {runType.runType}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        onClick={() => addRunTypeModalOpen(true)}
                                        className="px-3 rounded-lg bg-blue-600 text-white font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <br></br>
                            <div>
                                <Label>
                                    Purpose (අරමුණ)
                                    <span className="text-red-500">*</span>
                                </Label>
                                <textarea
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    required
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                            </div>

                            <div>
                                <Label>
                                    Route (මාර්ගය)
                                </Label>
                                <textarea
                                    name="route"
                                    value={formData.route}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* APPROVING OFFICER */}

                            <div className="col-span-2 font-semibold text-lg border-b pb-2">
                                Approving Officer Section
                            </div>

                            <div>
                                <Label>
                                    Officer Service No (නිලධාරි සේවා අංකය)
                                    <span className="text-red-500">*</span>
                                </Label>

                                <Input
                                    name="oicServiceNo"
                                    value={formData.oicServiceNo}
                                    onBlur={getOfficerDetails}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Officer Name (නිලධාරි නම)</Label>

                                <Input
                                    value={formData.oicName}
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>Rank (නිලය)</Label>

                                <Input
                                    value={formData.oicRank}
                                    disabled
                                />
                            </div>

                            {/* OMT SECTION */}

                            <div className="col-span-2 font-semibold text-lg border-b pt-6 pb-2">
                                OMT Selection Section
                            </div>

                            <div className="col-span-2">

                                <Label>
                                    OMT is nominated from the section (OMT අංශයෙන් නම් කළ යුතුය)
                                </Label>

                                <div className="flex gap-6 mt-2">

                                    <label>
                                        <input
                                            type="radio"
                                            name="isOmtAssignfromMT"
                                            checked={formData.isOmtAssignfromMT === true}
                                            onChange={() =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    isOmtAssignfromMT: true
                                                }))
                                            }
                                        />
                                        Yes
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="isOmtAssignfromMT"
                                            checked={formData.isOmtAssignfromMT === false}
                                            onChange={() =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    isOmtAssignfromMT: false
                                                }))
                                            }
                                        />
                                        No
                                    </label>
                                </div>
                            </div>

                            {!formData.isOmtAssignfromMT && (

                                <>
                                    <div>
                                        <Label>OMT Service No (OMT සේවා අංකය)</Label>

                                        <Input
                                            name="omtServiceNo"
                                            value={formData.omtServiceNo}
                                            onBlur={getOMTDetails}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <Label>Name (නම)</Label>

                                        <Input
                                            value={formData.omtName}
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <Label>Rank (නිලය)</Label>

                                        <Input
                                            value={formData.omtRank}
                                            disabled
                                        />
                                    </div>
                                </>
                            )}

                            {/* VEHICLE SECTION */}

                            <div className="col-span-2 font-semibold text-lg border-b pt-6 pb-2">
                                Vehicle Selection Section
                            </div>

                            <div className="col-span-2">

                                <Label>
                                    The vehicle is to be detailed from MT section (වාහනය MT අංශයෙන් විස්තර කළ යුතුය.)
                                </Label>

                                <div className="flex gap-6 mt-2">

                                    <label>
                                        <input
                                            type="radio"
                                            checked={formData.isVehicleAssignfromMT === true}
                                            onChange={() =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    isVehicleAssignfromMT: true
                                                }))
                                            }
                                        />
                                        Yes
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            checked={formData.isVehicleAssignfromMT === false}
                                            onChange={() =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    isVehicleAssignfromMT: false
                                                }))
                                            }
                                        />

                                        No
                                    </label>
                                </div>
                            </div>

                            {!formData.isVehicleAssignfromMT && (

                                <>
                                    <div>
                                        <Label>G Number (ගුවන් අංකය)</Label>

                                        <Input
                                            name="slafRegNo"
                                            value={formData.slafRegNo}
                                            onBlur={getVehicleDetails}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <Label>Chassis Number (චාසිස් අංකය)</Label>

                                        <Input
                                            value={formData.chassisNo}
                                            disabled
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                    )}

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-12 border-t pt-6">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClear}
                            className="px-6 text-red-600 border-red-600 hover:bg-red-50"
                        >
                            Clear
                        </Button>
                        {step > 1 && (
                            <Button type="button" variant="outline" onClick={handleBack}>
                                Back
                            </Button>
                        )}

                        {step < 3 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                className={`px-6 ${!isStepValid() ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={!isStepValid()}
                                className={`px-6 ${!isStepValid() ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                Forward
                            </Button>
                        )}

                        {step == 1 && (
                            <Button type="button" variant="outline" onClick={onClose}>
                                Close
                            </Button>
                        )}

                    </div>
                </form>
            </div>
            <E658AddRunTypeModal
                isOpen={isRunTypeModalOpen}
                onClose={() => addRunTypeModalOpen(false)}
                onfetchRunTypeData={fetchRunTypeData}
            />
        </div>
    );
}
export default E658ShortRunModal;