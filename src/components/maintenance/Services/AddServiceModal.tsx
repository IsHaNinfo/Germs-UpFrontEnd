import Button from "../../ui/button/Button";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { localStorageManagementService } from "../../../services/localStorageManagementService";
import { useNavigate } from "react-router";
import { useUserContext } from "../../../context/UserContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onFetchServiceData: () => void;
}

const AddService: React.FC<Props> = ({ isOpen, onClose, onFetchServiceData, }) => {

  const navigate = useNavigate();

  const { hasPermission } = useUserContext();
    
  const initialState = {
    chassisNo: "",
    serviceType: "",
    currentMileage: "",
    lastServiceMileage: "",
    civilRegNo: "",
    mileageDifference: "",
    inductionType: "",
    engineNo: "",
    serviceLocation: "",
    serviceOpenDate: "",
    serviceOpenTime: "",
    serviceOpenBy: "OMT"
  };

  const [formData, setFormData] = useState(initialState);
  const [serviceTypeData, setServiceTypeData] = useState<any[]>([]);

  // Handle normal input change
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Chassis No input blur event handler to fetch vehicle data based on the entered chassis number and set it to the form state. 

  const getServiceType = async (e: any) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      chassisNo: value,
    });

    if (!value) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Servicing/getServicingVehiclesByChassisNo?chassisNo=${value}`
      );

      const data = response.data;

      setFormData({
        ...formData,
        chassisNo: data.chassisNo || "",
        currentMileage: data.currentMileage || "",
        lastServiceMileage: data.lastServiceMileage || "",
        civilRegNo: data.civilRegNo || "",
        mileageDifference: data.mileageDifference || "",
        inductionType: data.inductionType || "",
        engineNo: data.engineNo || "",
        serviceLocation: data.serviceLocation || "",
        serviceOpenDate: data.serviceOpenDate || "",
        serviceOpenTime: data.serviceOpenTime || "",
        serviceOpenBy: data.serviceOpenBy || "",
      });

      const serviceTypes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/ModelServiceRule/vehicle?search=${value}`
      );
      setServiceTypeData(serviceTypes.data.rules);

    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Failed to get service data.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });

      // Created By: Flt Lt RJ Palihawadana
      // Created Date: 13.04.2026
      // Des: Clear form data

      setFormData({
        chassisNo: value,
        serviceType: "",
        currentMileage: "",
        lastServiceMileage: "",
        civilRegNo: "",
        mileageDifference: "",
        inductionType: "",
        engineNo: "",
        serviceLocation: "",
        serviceOpenDate: "",
        serviceOpenTime: "",
        serviceOpenBy: "OMT"
      });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Submit form 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const now = new Date();

    const vehicleData = {
      chassisNo: formData.chassisNo,
      serviceType: formData.serviceType,
      serviceLocation: "RMA",
      serviceOpenDate: now.toISOString().split("T")[0], // YYYY-MM-DD
      serviceOpenTime: now.toTimeString().split(" ")[0], // HH:mm:ss
      serviceOpenBy: localStorageManagementService.getLocalStorageUserDetails()?.id,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/Servicing`,
        vehicleData
      );

      setFormData(initialState);
      setServiceTypeData([]);
      onFetchServiceData();
      onClose();

      Swal.fire({
        icon: "success", title: "Success", text: "Create Job Successfully!",
      });
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to create job." });
    }
  };

  if (!isOpen) return null;

  if (hasPermission("maintenance/add_new_service")) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-100000">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <div className="relative bg-white overflow-y-auto rounded-lg p-6 shadow-2xl animate-fadeIn w-[1000px]">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-2xl font-semibold">
              Add Vehicle Service
            </h2>

            <button
              onClick={onClose}
              className="text-xl font-bold hover:opacity-70"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div>
                <Label>
                  Chassis No
                  <span className="text-red-500">*</span>
                </Label>

                <Input
                  name="chassisNo"
                  value={formData.chassisNo}
                  onChange={handleChange}
                  onBlur={getServiceType}
                  required
                />
              </div>

              <div>
                <Label>Engine No</Label>
                <Input
                  name="engineNo"
                  value={formData.engineNo}
                  disabled
                />
              </div>

              <div>
                <Label>Select Due Service Type</Label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="noVal">Select Service Type</option>
                  {serviceTypeData.filter((serviceType) => serviceType.isMatched).map((serviceType) => (
                    <option key={serviceType.serviceTypeId} value={serviceType.serviceTypeId}>
                      {serviceType.serviceTypeName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Current Mileage</Label>
                <Input
                  name="currentMileage"
                  value={formData.currentMileage}
                  disabled
                />
              </div>

              <div>
                <Label>Last Service Mileage</Label>
                <Input
                  name="lastServiceMileage"
                  value={formData.lastServiceMileage}
                  disabled
                />
              </div>

              <div>
                <Label>Civil Reg No</Label>
                <Input
                  name="civilRegNo"
                  value={formData.civilRegNo}
                  disabled
                />
              </div>

              <div>
                <Label>Mileage Difference</Label>
                <Input
                  name="mileageDifference"
                  value={formData.mileageDifference}
                  disabled
                />
              </div>

              <div>
                <Label>Induction Type</Label>
                <Input
                  name="inductionType"
                  value={formData.inductionType}
                  disabled
                />
              </div>

              <div className="flex justify-end gap-4 mt-12 border-t pt-6 col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Back
                </Button>

                <Button type="submit" className="px-6">
                  Create Job
                </Button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/germs/");
  }
};

export default AddService;