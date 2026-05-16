import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import DatePicker from "../form/date-picker";

const RequestAuthority = () => {
    const navigate = useNavigate();

    const initialState = {

        // Step 1
        serviceNo: "",
        name: "",
        rank: "",
        baseOrFormation: "Base",
        originationLocation: "",
        originationSection: "",
        userLocation: "",

        // Step 2
        destinationToLocation: "",
        requestCategory: "",
        departureDate: "",
        departureTime: "",
        returnDate: "",
        purpose: "",
        route: "",
        omtServiceNo: "",
        omtName: "",
        omtRank: "",
        vehicleRegNo: "",
        vehicleChassisNo: "",
        requestingOfficerServiceNo: "",
        requestingOfficerName: "",
        requestingOfficerRank: "",
        nightParkingRequest: "NO",
        nightParkingLocation: "",
        additionalDutiesRequest: "NO",
        additionalDutiesLocation: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [locationData, setLocationData] = useState<any[]>([]);
    const [formationData, setFormationData] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [step, setStep] = useState(1);
    const [additionalDuties, setAdditionalDuties] = useState<any[]>([]);
    const [showDutyModal, setShowDutyModal] = useState(false);
    const [dutyForm, setDutyForm] = useState({ date: "", route: "", purpose: "" });

    const handleDutyChange = (e: any) => {
        setDutyForm({
            ...dutyForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddDuty = () => {
        if (!dutyForm.date || !dutyForm.route || !dutyForm.purpose) {
            Swal.fire({ icon: "warning", title: "Required", text: "Please fill all fields in the duty form." });
            return;
        }
        setAdditionalDuties([...additionalDuties, dutyForm]);
        setDutyForm({ date: "", route: "", purpose: "" });
        setShowDutyModal(false);
    };

    const handleRemoveDuty = (index: number) => {
        const newDuties = [...additionalDuties];
        newDuties.splice(index, 1);
        setAdditionalDuties(newDuties);
    };

    useEffect(() => {
        fetchLocationData();
        fetchCategoryData();
    }, []);

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchLocationData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/Location`
            );
            const locations = response.data.map((location: any) => ({
                locationId: location.locationId,
                locationName: location.stationOrBase,
            }));
            setLocationData(locations);
        } catch (error: any) {
            Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch location data." });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to fetch the Category Data for the Request Authority form.

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/E658LrRequestCategory`
            );
            setCategoryData(response.data);
        } catch (error: any) {
            console.error("Failed to fetch category data", error);
            // Non-critical for UI render if API is missing
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to fetch the Formation Data based on the selected Location in the form. When a user selects a location, this function makes an API call to retrieve the formations associated with that location and updates the formationData state, which is then used to populate the section dropdown in the form. If no location is selected, it clears the formation data to prevent invalid selections. 

    const handleLocationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange(e);
        const locationId = e.target.value;
        if (!locationId) {
            setFormationData([]);
            return;
        }
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/Formation/by-location/${locationId}`
            );
            const data = response.data.map((model: any) => ({
                formationId: model.formationId,
                formationName: model.formation,
            }));
            setFormationData(data);
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch formation data." });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: This function fetches user details based on the provided service number and updates the form data with the retrieved name and rank. It is used for both the requester and OMT details sections to auto-populate the corresponding fields when a valid service number is entered. 

    const fetchUserDetails = async (serviceNo: string, nameField: string, rankField: string) => {
        if (serviceNo === "") return;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/User/getbysvcno?SvcNo=${serviceNo}`
            );
            setFormData((prevFormData) => ({
                ...prevFormData,
                [nameField]: response.data.name,
                [rankField]: response.data.rank,
            }));
        } catch (error: any) {
            Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch user data." });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to fetch the User Details 

    const getUserDetails = (e: any) => {
        handleChange(e);
        fetchUserDetails(e.target.value, "name", "rank");
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to fetch the OMT Details 

    const getOmtDetails = (e: any) => {
        handleChange(e);
        fetchUserDetails(e.target.value, "omtName", "omtRank");
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to fetch the Requesting Officer Details 

    const getRequestingOfficerDetails = (e: any) => {
        handleChange(e);
        fetchUserDetails(e.target.value, "requestingOfficerName", "requestingOfficerRank");
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to fetch the Vehicle Details 

    const getVehicleDetails = async (e: any) => {
        handleChange(e);

        const regNo = "ගුවන්-" + e.target.value;

        if (regNo === "") return;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/VehicleReg/${regNo}`
            );

            setFormData((prev) => ({
                ...prev,
                vehicleChassisNo: response.data.vehicleDetail.chassisNo,
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
    // Created Date: 14.04.2026
    // Des: This function is use to validate the form data and move to the next step if validation is successful. It checks for the presence of all required fields in the first step and displays a warning message if any field is missing. If all fields are filled, it advances the user to the second step of the form.

    const handleNext = (e: any) => {
        e.preventDefault();
        if (
            !formData.serviceNo ||
            !formData.name ||
            !formData.rank ||
            !formData.originationLocation ||
            !formData.originationSection ||
            !formData.userLocation
        ) {
            Swal.fire({ icon: "warning", title: "Required", text: "Please fill all the required fields." });
            return;
        }
        setStep(2);
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 13.04.2026
    // Des: submits the form data to the backend API to create a new E658 Long Run request. It constructs the payload based on the form data, including handling conditional fields for night parking and additional duties. Upon successful submission, it shows a success message and navigates back to the main page after a short delay. If the submission fails, it displays an error message to the user.

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            staffServiceNo: formData.serviceNo,
            userLocationId: parseInt(formData.userLocation) || 0,
            e658LrLocationId: parseInt(formData.originationLocation) || 0,
            e658LrSectionId: parseInt(formData.originationSection) || 0,
            requestCategoryId: parseInt(formData.requestCategory) || 0,
            fromLocationId: parseInt(formData.originationLocation) || 0,
            toLocationId: parseInt(formData.destinationToLocation) || 0,
            departureDate: formData.departureDate,
            departureTime: formData.departureTime,
            returnDate: formData.returnDate,
            purpose: formData.purpose,
            route: formData.route,
            omtServiceNo: formData.omtServiceNo,
            slafRegNo: formData.vehicleRegNo,
            isNightParkRequested: formData.nightParkingRequest === "YES",
            nightParkLocation: formData.nightParkingRequest === "YES" ? formData.nightParkingLocation : "",
            isAdditionalDutyRequested: formData.additionalDutiesRequest === "YES",
            oicServiceNo: formData.requestingOfficerServiceNo,
            additionalDuties: formData.additionalDutiesRequest === "YES" ? additionalDuties.map(d => ({
                dutyDate: d.date ? new Date(d.date).toISOString() : new Date().toISOString(),
                purpose: d.purpose,
                route: d.route
            })) : []
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/E658LongRun`, payload);
            Swal.fire({ icon: "success", title: "Success", text: "Request Submitted Successfully!" });
            //wait for 2 seconds to show the success message before navigating back
            setTimeout(() => {
                navigate("/germs/e-658/long-run");
            }, 2000);

        } catch (error: any) {
            console.error("Submission failed:", error);
            Swal.fire({ icon: "error", title: "Error", text: "Failed to submit request." });
        }
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to clear the form

    const handleClear = () => {
        setFormData(initialState);
        setStep(1);
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to get the Location Name 

    const getLocationName = (id: string) => {
        const location = locationData.find(loc => loc.locationId == id);
        return location ? location.locationName : "";
    };

    // Created By: Flt Lt RJ Palihawadana
    // Created Date: 14.04.2026
    // Des: This function is use to get the Formation Name based on the selected Location

    const getFormationName = (id: string) => {
        const formation = formationData.find(form => form.formationId == id);
        return formation ? formation.formationName : "";
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 px-8 py-10">
            <div className="mb-10 border-b pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {step === 1 ? "Request Creator Info" : "Request Authority Details"}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {step === 1 
                            ? "Please provide the details to proceed with the E658 Long Run Request Authority."
                            : "Please fill the additional details required for the request."}
                    </p>
                </div>
            </div>

            {step === 1 && (
                <form onSubmit={handleNext}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Label>Service No (සේවා අංකය)<span className="text-red-500">*</span></Label>
                            <Input
                                name="serviceNo"
                                value={formData.serviceNo}
                                onChange={handleChange}
                                onBlur={getUserDetails}
                                required
                            />
                        </div>

                        <div>
                            <Label>Name (නම)<span className="text-red-500">*</span></Label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </div>

                        <div>
                            <Label>Rank (නිලය)<span className="text-red-500">*</span></Label>
                            <Input
                                name="rank"
                                value={formData.rank}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </div>
                        <div></div>

                        <div>
                            <Label>E658 Origination Location<span className="text-red-500">*</span></Label>
                            <select
                                name="originationLocation"
                                value={formData.originationLocation}
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
                        </div>

                        <div>
                            <Label>Section (අංශය)<span className="text-red-500">*</span></Label>
                            <select
                                name="originationSection"
                                value={formData.originationSection}
                                onChange={handleChange}
                                required
                                disabled={!formationData.length}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Section</option>
                                {formationData.map((formation) => (
                                    <option key={formation.formationId} value={formation.formationId}>
                                        {formation.formationName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Base or Formation<span className="text-red-500">*</span></Label>
                            <div className="flex gap-6 mt-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="baseOrFormation"
                                        value="Base"
                                        checked={formData.baseOrFormation === "Base"}
                                        onChange={handleChange}
                                    />
                                    Base/Station
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="baseOrFormation"
                                        value="Formation"
                                        checked={formData.baseOrFormation === "Formation"}
                                        onChange={handleChange}
                                    />
                                    Formation
                                </label>
                            </div>
                        </div>
                        <div></div>

                        <div>
                            <Label>User Location (පරිශීලක ස්ථානය)<span className="text-red-500">*</span></Label>
                            <select
                                name="userLocation"
                                value={formData.userLocation}
                                onChange={handleChange}
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
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-12 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/germs/e-658/long-run")}
                        >
                            Back
                        </Button>

                        <Button type="submit" className="px-6">
                            Next
                        </Button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Label>Destination From</Label>
                            <Input
                                value={getLocationName(formData.originationLocation)}
                                disabled
                                readOnly
                            />
                        </div>

                        <div>
                            <Label>Destination To<span className="text-red-500">*</span></Label>
                            <select
                                name="destinationToLocation"
                                value={formData.destinationToLocation}
                                onChange={handleChange}
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
                        </div>

                        <div>
                            <Label>Request Section</Label>
                            <Input
                                value={getFormationName(formData.originationSection)}
                                disabled
                                readOnly
                            />
                        </div>

                        <div>
                            <Label>Request Category<span className="text-red-500">*</span></Label>
                            <select
                                name="requestCategory"
                                value={formData.requestCategory}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Category</option>
                                {categoryData.map((category: any, index: number) => (
                                    <option key={index} value={category.requestCategoryID}>
                                        {category.requestCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Departure Date<span className="text-red-500">*</span></Label>
                            <DatePicker
                                id="departureDate"
                                defaultDate={formData.departureDate}
                                onChange={(_: any, dateStr: string) => {
                                    setFormData((prev: any) => ({ ...prev, departureDate: dateStr }));
                                }}
                            />
                        </div>

                        <div>
                            <Label>Departure Time<span className="text-red-500">*</span></Label>
                            <DatePicker
                                id="departureTime"
                                mode="time"
                                defaultDate={formData.departureTime}
                                onChange={(_: any, dateStr: string) => {
                                    setFormData((prev: any) => ({ ...prev, departureTime: dateStr }));
                                }}
                            />
                        </div>

                        <div>
                            <Label>Return Date<span className="text-red-500">*</span></Label>
                            <DatePicker
                                id="returnDate"
                                defaultDate={formData.returnDate}
                                minDate={formData.departureDate}
                                disabled={!formData.departureDate}
                                onChange={(_: any, dateStr: string) => {
                                    setFormData((prev: any) => ({ ...prev, returnDate: dateStr }));
                                }}
                            />
                        </div>

                        <div>
                            <Label>Purpose<span className="text-red-500">*</span></Label>
                            <textarea
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                rows={2}
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <Label>Route<span className="text-red-500">*</span></Label>
                            <textarea
                                name="route"
                                value={formData.route}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                rows={2}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-10 mb-6 border-b pb-2">
                        <h2 className="text-xl font-semibold text-gray-800">Please Fill OMT Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <Label>Service Number<span className="text-red-500">*</span></Label>
                            <Input
                                name="omtServiceNo"
                                value={formData.omtServiceNo}
                                onChange={handleChange}
                                onBlur={getOmtDetails}
                                required
                            />
                        </div>
                        <div>
                            <Label>Name</Label>
                            <Input value={formData.omtName} disabled readOnly />
                        </div>
                        <div>
                            <Label>Rank</Label>
                            <Input value={formData.omtRank} disabled readOnly />
                        </div>
                    </div>

                    <div className="mt-10 mb-6 border-b pb-2">
                        <h2 className="text-xl font-semibold text-gray-800">Please Fill Vehicle Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Label>Vehicle Reg No<span className="text-red-500">*</span></Label>
                            <div className="flex items-center gap-2">
                                <div>ගුවන් -</div>
                                <Input
                                    name="vehicleRegNo"
                                      type="number"
                                    value={formData.vehicleRegNo}
                                    onChange={handleChange}
                                    onBlur={getVehicleDetails}
                                    required
                                    />
                            </div>
                        </div>
                        <div>
                            <Label>Vehicle Chassis Number</Label>
                            <Input value={formData.vehicleChassisNo} disabled readOnly />
                        </div>
                    </div>

                    <div className="mt-10 mb-6 border-b pb-2">
                        <h2 className="text-xl font-semibold text-gray-800">Service Number of the requesting officer</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <Label>Service Number<span className="text-red-500">*</span></Label>
                            <Input
                                name="requestingOfficerServiceNo"
                                value={formData.requestingOfficerServiceNo}
                                onChange={handleChange}
                                onBlur={getRequestingOfficerDetails}
                                required
                            />
                        </div>
                        <div>
                            <Label>Name</Label>
                            <Input value={formData.requestingOfficerName} disabled readOnly />
                        </div>
                        <div>
                            <Label>Rank</Label>
                            <Input value={formData.requestingOfficerRank} disabled readOnly />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        <div>
                            <div className="mb-4">
                                <Label>Night Parking Request</Label>
                                <div className="flex gap-6 mt-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="nightParkingRequest"
                                            value="YES"
                                            checked={formData.nightParkingRequest === "YES"}
                                            onChange={handleChange}
                                        />
                                        YES
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="nightParkingRequest"
                                            value="NO"
                                            checked={formData.nightParkingRequest === "NO"}
                                            onChange={handleChange}
                                        />
                                        NO
                                    </label>
                                </div>
                            </div>
                            {formData.nightParkingRequest === "YES" && (
                                <div className="animate-fadeIn">
                                    <Label>Locations<span className="text-red-500">*</span></Label>
                                    <textarea
                                        name="nightParkingLocation"
                                        value={formData.nightParkingLocation}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        rows={3}
                                    ></textarea>
                                </div>
                            )}
                        </div>
                        <div></div>

                        <div>
                            <div className="mb-4">
                                <Label>Additional Duties Request</Label>
                                <div className="flex gap-6 mt-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="additionalDutiesRequest"
                                            value="YES"
                                            checked={formData.additionalDutiesRequest === "YES"}
                                            onChange={handleChange}
                                        />
                                        YES
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="additionalDutiesRequest"
                                            value="NO"
                                            checked={formData.additionalDutiesRequest === "NO"}
                                            onChange={handleChange}
                                        />
                                        NO
                                    </label>
                                </div>
                            </div>
                            {formData.additionalDutiesRequest === "YES" && (
                                <div className="animate-fadeIn mt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <Label>Additional Duty Request List</Label>
                                        <Button type="button" onClick={() => setShowDutyModal(true)} className="px-4 py-2 text-sm">
                                            Add Duty
                                        </Button>
                                    </div>
                                    
                                    {additionalDuties.length > 0 && (
                                        <div className="overflow-x-auto mb-4 border rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {additionalDuties.map((duty, index) => (
                                                        <tr key={index}>
                                                            <td className="px-4 py-3 text-sm text-gray-900">{duty.date}</td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">{duty.route}</td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">{duty.purpose}</td>
                                                            <td className="px-4 py-3 text-sm text-center">
                                                                <button type="button" onClick={() => handleRemoveDuty(index)} className="text-red-500 hover:text-red-700">Remove</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/germs/e-658/long-run")}
                        >
                            Back to Main Page
                        </Button>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClear}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                                Clear
                            </Button>
                            <Button type="submit" className="px-6">
                                Forward
                            </Button>
                        </div>
                    </div>
                </form>
            )}
            {showDutyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Add Duty</h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label>Date<span className="text-red-500">*</span></Label>
                                <DatePicker
                                    id="dutyDate"
                                    defaultDate={dutyForm.date}
                                    onChange={(_: any, dateStr: string) => {
                                        setDutyForm((prev: any) => ({ ...prev, date: dateStr }));
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Route<span className="text-red-500">*</span></Label>
                                <textarea
                                    name="route"
                                    value={dutyForm.route}
                                    onChange={handleDutyChange}
                                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    rows={2}
                                />
                            </div>
                            <div>
                                <Label>Purpose<span className="text-red-500">*</span></Label>
                                <textarea
                                    name="purpose"
                                    value={dutyForm.purpose}
                                    onChange={handleDutyChange}
                                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    rows={2}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={() => setShowDutyModal(false)}>
                                    Cancel
                                </Button>
                                <Button type="button" onClick={handleAddDuty}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestAuthority;
