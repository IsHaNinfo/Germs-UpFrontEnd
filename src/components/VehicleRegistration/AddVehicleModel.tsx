import { useState, useEffect } from "react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import axios from "axios";
import Swal from "sweetalert2";
import AddManufacturerModal from "./AddManufacturerModal";
import AddVehicleTypeModal from "./AddVehicleTypeModal";
import DatePicker from "../form/date-picker";

const AddVehicleModel = () => {

  // Initial State
  const initialState = {
    modelName: "",
    modelYear: "",
    horsePower: "",
    fuelCapacity: "",
    tyreFrontSize: "",
    tyreRearSize: "",
    fuelType: "",
    vehicleColor: "",
    chassisCost: "",
    noOfCylinders: "",
    wheelBase: "",
    manufactureName: "",
    typeID: "",
  };


  const [modelData, setFormData] = useState(initialState);
  const [manufacturerData, setManufacturerData] = useState<any[]>([]);
  const [vehicleTypeData, setVehicleTypeData] = useState<any[]>([]);
  const [isManufacturerModalOpen, addManufacturerModalOpen] = useState(false);
  const [isTypeModalOpen, addTypeModalOpen] = useState(false);

  // Handle Input Change
  const handleChange = (e: any) => {
    setFormData({
      ...modelData,
      [e.target.name]: e.target.value,
    });
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Fetch Data on Load

  useEffect(() => {
    fetchManufacturerData();
    fetchVehicleTypeData();
  }, []);

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Fetch manufacturer data

  const fetchManufacturerData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Manufacturer`);
      const manufacturerData = response.data.map((model: any) => ({
        manufacturerId: model.manufacturerId,
        manufacturerName: model.manufacturerName,
      }));
      setManufacturerData(manufacturerData);

    } catch (error) {
      console.error("Error fetching data:", error);
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
  // Des: Reset Form

  const resetForm = () => {
    setFormData(initialState);
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Submit Form Data

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleModelData = {
      modelName: modelData.modelName,
      modelYear: modelData.modelYear,
      manufacturerId: Number(modelData.manufactureName),
      horsePower: Number(modelData.horsePower),
      fuelCapacity: Number(modelData.fuelCapacity),
      tyreFrontSize: modelData.tyreFrontSize,
      tyreRearSize: modelData.tyreRearSize,
      fuelType: modelData.fuelType,
      vehicleColor: modelData.vehicleColor,
      chassisCost: Number(modelData.chassisCost),
      noOfCylinders: Number(modelData.noOfCylinders),
      wheelBase: Number(modelData.wheelBase),
      createdBy: "Admin",
      createdIpAddress: "11.11.11234.123",
      typeID: Number(modelData.typeID),
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/VehicleModel`,
        vehicleModelData
      );
      Swal.fire({ icon: "success", title: "Success", text: "Vehicle Model Registered Successfully!" });

      //rederct register page
      window.location.href = "/germs/induction/vehicle-induction";

      // Clear Form
      resetForm();
    } catch (error: any) {

      const message = error.response?.data?.detail
      error.message ||
        "Failed to register vehicle model.";
      Swal.fire({ icon: "error", title: "Error", text: message });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Add Vehicle Model Form

  return (
    <div className="min-h-screen w-full bg-gray-50 px-8 py-10">
      <div className="mb-10 border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Add Vehicle Model
          </h1>
          <p className="text-gray-500 mt-1">
            Register a new vehicle model into the system
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <Label>Model Name (මාදිලියේ නම)<span className="text-red-500">*</span></Label>
            <Input name="modelName" value={modelData.modelName} onChange={handleChange} required />
          </div>

          <div>
            <Label>Model Year (මාදිලියේ වසර)<span className="text-red-500">*</span></Label>
            <DatePicker id="date-picker"
              placeholder="Select a date"
              onChange={(_dates, currentDateString) => {
                setFormData({
                  ...modelData,
                  modelYear: currentDateString,
                });
              }}
            />
          </div>

          <div>
            <Label>Vehicle Type (වාහන වර්ගය)<span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <select
                name="typeID"
                value={modelData.typeID}
                onChange={handleChange}
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

              <button
                type="button"
                onClick={() => addTypeModalOpen(true)}
                className="px-3 rounded-lg bg-blue-600 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <Label>Manufacture Name (නිෂ්පාදකයා)<span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <select
                name="manufactureName"
                value={modelData.manufactureName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Manufacture Name</option>
                {manufacturerData.map((manufacturer) => (
                  <option key={manufacturer.manufacturerId} value={manufacturer.manufacturerId}>
                    {manufacturer.manufacturerName}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => addManufacturerModalOpen(true)}
                className="px-3 rounded-lg bg-blue-600 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <Label>Vehicle Color (වාහන වර්ණය)<span className="text-red-500">*</span></Label>
            <Input name="vehicleColor" value={modelData.vehicleColor} onChange={handleChange} required />
          </div>

          <div>
            <Label>Fuel Type (ඉන්ධන වර්ගය)<span className="text-red-500">*</span></Label>
            <select
              name="fuelType"
              value={modelData.fuelType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Super Petrol">Super Petrol</option>
              <option value="Super Diesel">Super Diesel</option>
              <option value="Petrol + 2T">Petrol + 2T</option>
            </select>
          </div>

          <div>
            <Label>Fuel Capacity (ඉන්ධන ධාරිතාව)<span className="text-red-500">*</span></Label>
            <Input name="fuelCapacity" value={modelData.fuelCapacity} onChange={handleChange} required />
          </div>

          <div>
            <Label>No Of Cylinders (සිලින්ඩර ගණන)<span className="text-red-500">*</span></Label>
            <Input name="noOfCylinders" value={modelData.noOfCylinders} onChange={handleChange} required />
          </div>

          <div>
            <Label>Horse Power (අශ්ව බලය)<span className="text-red-500">*</span></Label>
            <Input name="horsePower" value={modelData.horsePower} onChange={handleChange} required />
          </div>

          <div>
            <Label>Chassis Cost (චැසි පිරිවැය)<span className="text-red-500">*</span></Label>
            <Input type="number" name="chassisCost" value={modelData.chassisCost} onChange={handleChange} required />
          </div>

          <div>
            <Label>Tyre Front Size (ටයර් ඉදිරිපස ප්රමාණය)<span className="text-red-500">*</span></Label>
            <Input name="tyreFrontSize" value={modelData.tyreFrontSize} onChange={handleChange} required />
          </div>

          <div>
            <Label>Tyre Rear Size (ටයර් පස්පස ප්රමාණය)<span className="text-red-500">*</span></Label>
            <Input name="tyreRearSize" value={modelData.tyreRearSize} onChange={handleChange} required />
          </div>

          <div>
            <Label>Wheel Base (රෝද පදනම)<span className="text-red-500">*</span></Label>
            <Input name="wheelBase" value={modelData.wheelBase} onChange={handleChange} required />
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-12 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Back
          </Button>

          <Button type="submit" className="px-6">
            Add Vehicle Model
          </Button>
        </div>
      </form>

      <AddVehicleTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => addTypeModalOpen(false)}
        onTypeCreated={fetchVehicleTypeData}
      />

      <AddManufacturerModal
        isOpen={isManufacturerModalOpen}
        onClose={() => addManufacturerModalOpen(false)}
        onManufacturerCreated={fetchManufacturerData}
      />
    </div>
  );
};

export default AddVehicleModel;