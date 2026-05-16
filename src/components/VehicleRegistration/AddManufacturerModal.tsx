
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onManufacturerCreated: () => void;
}

  // Initial State
  const initialState = {
    manufacturerName: "",
    countryOfOrigin: "",
  };

const AddManufacturerModal: React.FC<Props> = ({ isOpen, onClose, onManufacturerCreated }) => {

  const [modelData, setFormData] = useState(initialState);

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Handle Input Change

  const handleChange = (e: any) => {
    setFormData({
      ...modelData,
      [e.target.name]: e.target.value,
    });
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Handle Form Submission to Create a New Manufacturer

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const manufacturerData = {
      countryOfOrigin: modelData.countryOfOrigin,
      manufacturerName: modelData.manufacturerName,
    };

     try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/manufacturer`, manufacturerData);

      Swal.fire({ icon: "success", title: "Success", text: "Manufacturer Added Successfully!" });
      onManufacturerCreated(); // ✅ Refresh manufacturer dropdown in parent
      setFormData(initialState);
      onClose();

    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to add manufacturer." });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Add manufacturer model

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100000">
      
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}   
    ></div>
    
      <div className="relative bg-white overflow-y-auto rounded-lg p-6 shadow-2xl animate-fadeIn w-[400px] ">

        <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-2xl font-semibold">
            Add Manufacturer
            </h2>
            <button
                onClick={onClose}
                className="text-xl font-bold hover:opacity-70"> ✕
            </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid  gap-6">

            <div>
              <Label>Manufacturer Name (සැපයුම්කරුගේ නම)<span className="text-red-500">*</span></Label>
              <Input name="manufacturerName" value={modelData.manufacturerName} onChange={handleChange} required />
            </div>

            <div>
              <Label>Country of Origin (මුල් රට)<span className="text-red-500">*</span></Label>
              <Input name="countryOfOrigin" value={modelData.countryOfOrigin} onChange={handleChange} required />
            </div>

          </div>

        <div className="flex justify-end gap-4 mt-12 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>

          <Button type="submit" className="px-6">
            Add Manufacturer
          </Button>
        </div>
      </form>
      </div>

    </div>
  );
};

export default AddManufacturerModal;