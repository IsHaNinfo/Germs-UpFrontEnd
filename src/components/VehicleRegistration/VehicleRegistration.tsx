import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import SupplierModel from "./SupplierModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import DatePicker from "../../components/form/date-picker.tsx";
import TypeOfInductionModal from "./TypeOfInductionModal.tsx";

const VehicleRegistration = () => {

  //Initial state
  const initialState = {
    civilRegNo: "",
    chassisNo: "",
    engineNo: "",
    mileage: "",
    modelID: "",
    typeID: "",
    supplierId: "",
    isActive: true,
    createdBy: "Admin",
    // createdIpAddress: "",
    inductionTypeID: "",
    inductionDate: "",
    milageDate: "",
    standingDate: "2026-03-12",
    isStanding: "standing",
    dmtId: 1,
    manufacturerId: "",
    standingID: 15,
  };

  const [formData, setFormData] = useState(initialState);
  const [isSupplierModalOpen, addSupplierModalOpen] = useState(false);
  const [isTypeOfInductionModalOpen, addTypeOfInductionModalOpen] = useState(false);
  const [manufacturerData, setManufacturerData] = useState<any[]>([]);
  const [supplierData, setSupplierData] = useState<any[]>([]);
  const [typeOfInductionData, setTypeOfInductionData] = useState<any[]>([]);
  const [vehicleTypeData, setVehicleTypeData] = useState<any[]>([]);
  const [modelData, setModelData] = useState<any[]>([]);

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
    fetchSupplierData();
    fetchVehicleTypeData();
    fetchTypeOfInductionData();
  }, []);

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: fetch supplier data

  const fetchSupplierData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Supplier`,
      );
      const suppliers = response.data.map((supplier: any) => ({
        supplierId: supplier.supplierId,
        supplierName: supplier.supplierName,
      }));
      setSupplierData(suppliers);

    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch supplier data." });
    }
  }

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Fetch Condition Type Data

  const fetchTypeOfInductionData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/InductionType`,
      );

      const typeOfInductionData = response.data.map((induction: any) => ({
        id: induction.inductionTypeID,
        name: induction.typeOfInduction,
      }));
      setTypeOfInductionData(typeOfInductionData);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch type of induction data." });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Fetch Vehicle Type Data

  const fetchVehicleTypeData = async () => {

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/VehicleType`,
      );
      const vehicleTypeData = response.data.map((vehicleType: any) => ({
        vehicleTypeId: vehicleType.typeID,
        vehicleTypeName: vehicleType.type,
      }));
      setVehicleTypeData(vehicleTypeData);

    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle type data." });
    }
  }

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Fetch Condition Type Data

  const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {

    handleChange(e); // Update form data with selected vehicle type
    const TypeID = e.target.value;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/VehicleModel/by-vehicle-type?vehicleTypeId=${TypeID}`,
      );
      const manufacturerData = response.data.map((model: any) => ({
        manufacturerId: model.manufacturerId,
        manufacturerName: model.manufacturerName,
      }));
      setManufacturerData(manufacturerData);

    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle manufacturer data." });
    }
  }

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Handle Manufacturer Change

  const handleManufacturerChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    const selectedManufacturerId = e.target.value;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/VehicleModel/get-vehiclemodels-by-typeid-manufacturerid?vehicleTypeId=${formData.typeID}&manufacturerId=${selectedManufacturerId}`,
      );
      const modelData = response.data.map((model: any) => ({
        modelId: model.modelId,
        modelName: model.modelName,
      }));
      setModelData(modelData);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle model data." });
    }
  }

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Handle Form Submission to Register a New Vehicle

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const vehicleData = {
      civilRegNo: formData.civilRegNo,
      chassisNo: formData.chassisNo,
      engineNo: formData.engineNo,
      typeID: Number(formData.typeID),
      modelId: Number(formData.modelID),
      dmtid: Number(formData.dmtId),
      supplierId: Number(formData.supplierId),
      isActive: true,
      milageDate: formData.milageDate,
      milage: Number(formData.mileage),
      inductionTypeID: Number(formData.inductionTypeID),
      inductionDate: formData.inductionDate,
      standingDate: formData.standingDate,
      isStanding: formData.isStanding,
      createdBy: "Admin",
      // createdIpAddress: '',
      manufacturerId: Number(formData.manufacturerId),
      standingID: 15,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/vehicle`, vehicleData);
      Swal.fire({ icon: "success", title: "Success", text: "Vehicle Registered Successfully!" });

      //RESET FORM
      setFormData(initialState);

    } catch (error: any) {
      const message = error.response?.data?.detail
      error.message ||
        "Failed to register vehicle.";
      Swal.fire({ icon: "error", title: "Error", text: message });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Vehicle Registration Form

  return (
    <div className="min-h-screen w-full bg-gray-50 px-8 py-10">

      <div className="mb-10 border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Vehicle Registration
          </h1>
          <p className="text-gray-500 mt-1">
            Register a new vehicle into the system
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Label>Civil Registration No. (සිවිල් ලියාපදිංචි අංකය)<span className="text-red-500">*</span></Label>
            <Input
              name="civilRegNo"
              value={formData.civilRegNo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Vehicle Type (වාහන වර්ගය)<span className="text-red-500">*</span></Label>
            <select
              name="typeID"
              value={formData.typeID}
              onChange={handleTypeChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Type</option>
              {vehicleTypeData.map((vehicleType) => (
                <option key={vehicleType.vehicleTypeId} value={vehicleType.vehicleTypeId}>
                  {vehicleType.vehicleTypeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Manufacturer (නිෂ්පාදකයා)<span className="text-red-500">*</span></Label>
            <select
              name="manufacturerId"
              value={formData.manufacturerId}
              onChange={handleManufacturerChange}
              required
              disabled={!manufacturerData.length} // Disable if no manufacturers available
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Manufacturer</option>
              {manufacturerData.map((manufacturer) => (
                <option key={manufacturer.manufacturerId} value={manufacturer.manufacturerId}>
                  {manufacturer.manufacturerName}
                </option>
              ))}

            </select>
          </div>

          <div>
            <Label>Vehicle Model (වාහන මාදිලිය)<span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <select
                name="modelID"
                value={formData.modelID}
                onChange={handleChange}
                required
                disabled={!modelData.length} // Disable if no models available
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Model</option>
                {modelData.map((vehiclemodel) => (
                  <option key={vehiclemodel.modelId} value={vehiclemodel.modelId}>
                    {vehiclemodel.modelName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() =>
                (window.location.href =
                  "/germs/induction/vehicle-induction/add-vehicle-model")
                }
                className="px-3 rounded-lg bg-blue-600 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <Label>Supplier (සැපයුම්කරු)<span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <select
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Supplier</option>
                {supplierData.map((supplier) => (
                  <option key={supplier.supplierId} value={supplier.supplierId}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => addSupplierModalOpen(true)}
                className="px-3 rounded-lg bg-blue-600 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <Label>Chassis No (චැසි අංකය)<span className="text-red-500">*</span></Label>
            <Input
              name="chassisNo"
              value={formData.chassisNo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Engine No (එන්ජින් අංකය)<span className="text-red-500">*</span></Label>
            <Input
              name="engineNo"
              value={formData.engineNo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Milleage (සැතපුම් ගණන)<span className="text-red-500">*</span></Label>
            <Input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Millage Date (සැතපුම් දිනය)<span className="text-red-500">*</span></Label>
            <DatePicker id="milage-date-picker"
              placeholder="Select a date"
              onChange={(_dates, currentDateString) => {
                setFormData({
                  ...formData,
                  milageDate: currentDateString,
                });
              }}
            />
          </div>

          <div>
            <Label>Type of Induction<span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <select
                name="inductionTypeID"
                value={formData.inductionTypeID}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Type of Induction</option>
                {typeOfInductionData.map((induction) => (
                  <option key={induction.id} value={induction.id}>
                    {induction.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => addTypeOfInductionModalOpen(true)}
                className="px-3 rounded-lg bg-blue-600 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <Label>Induction Date<span className="text-red-500">*</span></Label>
            <DatePicker id="induction-date-picker"
              placeholder="Select a date"
              onChange={(_dates, currentDateString) => {
                setFormData({
                  ...formData,
                  inductionDate: currentDateString,
                });
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-12 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => (window.location.href = "/germs/induction")}
          >
            Back
          </Button>

          <Button type="submit" className="px-6">
            Register Vehicle
          </Button>
        </div>
      </form>

      <SupplierModel
        isOpen={isSupplierModalOpen}
        onClose={() => addSupplierModalOpen(false)}
        onSupplierCreated={fetchSupplierData}
      />

      <TypeOfInductionModal
        isOpen={isTypeOfInductionModalOpen}
        onClose={() => addTypeOfInductionModalOpen(false)}
        onTypeOfInductionCreated={fetchTypeOfInductionData}
      />

    </div>
  );
};

export default VehicleRegistration;