import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const VehicleModelModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [modelData, setModelData] = useState({
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
    brandName: "",
    manufactureName: "",
    vehicleType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setModelData({
      ...modelData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Vehicle Model Data:", modelData);

    alert("Vehicle Model Added Successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-[90%] max-h-[90vh] overflow-y-auto rounded-xl p-8 shadow-2xl">

        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-semibold">Add Vehicle Model</h2>

          <button
            onClick={onClose}
            className="text-xl font-bold hover:opacity-70"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <Label>Model Name<span className="text-red-500">*</span></Label>
              <Input name="modelName" value={modelData.modelName} onChange={handleChange} required />
            </div>

            <div>
              <Label>Model Year<span className="text-red-500">*</span></Label>
              <Input type="number" name="modelYear" value={modelData.modelYear} onChange={handleChange} required />
            </div>

            <div>
              <Label>Horse Power<span className="text-red-500">*</span></Label>
              <Input name="horsePower" value={modelData.horsePower} onChange={handleChange} required />
            </div>

            <div>
              <Label>Fuel Capacity<span className="text-red-500">*</span></Label>
              <Input name="fuelCapacity" value={modelData.fuelCapacity} onChange={handleChange} required />
            </div>

            <div>
              <Label>Tyre Front Size<span className="text-red-500">*</span></Label>
              <Input name="tyreFrontSize" value={modelData.tyreFrontSize} onChange={handleChange} required />
            </div>

            <div>
              <Label>Tyre Rear Size<span className="text-red-500">*</span></Label>
              <Input name="tyreRearSize" value={modelData.tyreRearSize} onChange={handleChange} required />
            </div>

            <div>
              <Label>Fuel Type<span className="text-red-500">*</span></Label>

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
              <Label>Vehicle Color<span className="text-red-500">*</span></Label>
              <Input name="vehicleColor" value={modelData.vehicleColor} onChange={handleChange} required />
            </div>

            <div>
              <Label>Chassis Cost<span className="text-red-500">*</span></Label>
              <Input type="number" name="chassisCost" value={modelData.chassisCost} onChange={handleChange} required />
            </div>

            <div>
              <Label>No Of Cylinders<span className="text-red-500">*</span></Label>
              <Input name="noOfCylinders" value={modelData.noOfCylinders} onChange={handleChange} required />
            </div>

            <div>
              <Label>Wheel Base<span className="text-red-500">*</span></Label>
              <Input name="wheelBase" value={modelData.wheelBase} onChange={handleChange} required />
            </div>

            <div>
              <Label>Brand Name<span className="text-red-500">*</span></Label>
              <select
                name="brandName"
                value={modelData.brandName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Brand</option>
                <option value="Toyota">Toyota</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Tata">Tata</option>
                <option value="Nissan">Nissan</option>
                <option value="BMW">BMW</option>
                <option value="Benz">Benz</option>
                <option value="Mahindra">Mahindra</option>
              </select>
            </div>

            <div>
              <Label>Manufacture Name<span className="text-red-500">*</span></Label>
              <select
                name="manufactureName"
                value={modelData.manufactureName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Country</option>
                <option value="Japan">Japan</option>
                <option value="India">India</option>
                <option value="Malaysia">Malaysia</option>
                <option value="USA">USA</option>
              </select>
            </div>

            <div>
              <Label>Vehicle Type<span className="text-red-500">*</span></Label>
              <select
                name="vehicleType"
                value={modelData.vehicleType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Type</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Lorry">Lorry</option>
                <option value="Jeep">Jeep</option>
              </select>
            </div>

          </div>

          <div className="flex justify-end gap-4 mt-8 border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">
              Save Vehicle Model
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default VehicleModelModal;