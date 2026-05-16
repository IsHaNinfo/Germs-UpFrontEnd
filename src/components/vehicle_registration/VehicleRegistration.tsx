import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import VehicleModelModal from "./VehicleModelModal";
import SupplierModel from "./SupplierModal";

const VehicleRegistration = () => {


  const [formData, setFormData] = useState({
    chassisNo: "",
    engineNo: "",
    mileage: "",
    modelID: "",
    typeID: "",
    supplierId:"",
    isActive: "Active",
    isDeleted: false,
    dmtid:'',
    createdBy: "Admin",
    createdIpAddress:"",
    inductionDate:"",
    milageDate:"",

    // Todo default value add
    standingID:1,
    typeOfInduction:2,
    standingDate :"2026-03-12",
    isStanding: true
    
  }); 


  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Vehicle Data:", formData);
    alert("Vehicle Registered Successfully!");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupplierModalOpen, addSupplierModalOpen] = useState(false);

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
            <Label>Chassis No</Label>
            <Input
              name="chassisNo"
              value={formData.chassisNo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Engine No</Label>
            <Input
              name="engineNo"
              value={formData.engineNo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Mileage</Label>
            <Input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Milage Date</Label>
            <Input
              type="date"
              name="milageDate"
              value={formData.milageDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Dmt Id</Label>
            <Input
              name="DmtId"
              value={formData.dmtid}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Induction Date</Label>
            <Input
              type="date"
              name="inductionDate"
              value={formData.inductionDate}
              onChange={handleChange}
              required
            />
          </div>

         <div>
    <Label>Vehicle Model</Label>

      <div className="flex gap-2">
        <select
          name="modelID"
          value={formData.modelID}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
        >
          <option value="">Select Model</option>
          <option value="Corolla Ex Salon">Corolla Ex Salon</option>
          <option value="Camry">Camry</option>
          <option value="Defender">Defender</option>
        </select>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
        >
          +
        </button>
      </div>
    </div>

          <div>
            <Label>Vehicle Type</Label>
            <select
              name="typeID"
              value={formData.typeID}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="Car">Car</option>
              <option value="Jeep">Jeep</option>
              <option value="Truck">Truck</option>
            </select>
          </div>

          <div>
            <Label>Supplier</Label>
             <div className="flex gap-2">
              <select
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none">
                  <option value="">Select Supplier</option>
                  <option value="Car">Indra Traders</option>
                  <option value="Jeep">Wasana Traders</option>
                  <option value="Truck">Nandana Exporters</option>
                  <option value="Truck">MWS Exporters</option>
              </select>

              <button type="button"
              onClick={() => addSupplierModalOpen(true)}
              className="px-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                +
              </button>
             </div>
           
          </div>

          <div>
            <Label>Status</Label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-12 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-6"
          >
            Register Vehicle
          </Button>
        </div>

      </form>

      <VehicleModelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}/>

      <SupplierModel
      isOpen= {isSupplierModalOpen}
      onClose={() => addSupplierModalOpen(false)}/>  
    </div>
  );
};

export default VehicleRegistration;