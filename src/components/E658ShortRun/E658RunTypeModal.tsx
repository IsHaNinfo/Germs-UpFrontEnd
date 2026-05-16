import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import axios from "axios";
import Swal from "sweetalert2";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onfetchRunTypeData: () => void;
}

// Created By: Flt Lt RJ Palihawadana
// Created Date: 13.04.2026
// Des: Initial State

const initialState = {
  runType: "",
};

const E658AddRunTypeModal: React.FC<Props> = ({ isOpen, onClose, onfetchRunTypeData }) => {


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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      runType: modelData.runType,
    };

     try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/E658RunType`,
        data
      );
      
      Swal.fire({ icon: "success", title: "Success", text: "Run Type Added Successfully!" });
      onfetchRunTypeData(); // Refresh vehicle type dropdown in parent
      setFormData(initialState);
      onClose();

    } catch (error: any) {
      const message = error.response?.data?.detail 
      error.message ||
      "Failed to add Run type.";
      Swal.fire({ icon: "error", title: "Error", text: message });
    }
  };

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Run type add modal 
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
            Add Run Type
            </h2>
            <button
                onClick={onClose}
                className="text-xl font-bold hover:opacity-70"> ✕
            </button>
        </div>

         <form onSubmit={handleSubmit}>
           <div>
              <Label>Run Type (ධාවන වර්ගය)<span className="text-red-500">*</span></Label>
              <Input name="runType" value={modelData.runType} onChange={handleChange} required />
            </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default E658AddRunTypeModal;