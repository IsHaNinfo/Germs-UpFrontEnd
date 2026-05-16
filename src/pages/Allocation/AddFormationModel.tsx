import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isSetLocationID: string; // Receive selected location ID from parent
  refreshFormationData: () => void;
}

const AddFormationModel: React.FC<Props> = ({ isOpen, onClose, isSetLocationID, refreshFormationData }) => {
    const [formation, setFormation] = useState("");
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      formation,
      locationId: Number(isSetLocationID),
      createdBy: "Admin", // Replace with actual user data
      createdIpAddress:"11.11.111" // Replace with actual IP address
    };

     try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/Formation`,
        data
      );
      Swal.fire({ icon: "success", title: "Success", text: "Formation Added Successfully!" });
      refreshFormationData(); // ✅ Refresh location dropdown in parent
      setFormation("");
      onClose();
     
    } catch (error: any) {
      const message = error.response?.data?.detail 
      error.message ||
      "Failed to add formation.";
      Swal.fire({ icon: "error", title: "Error", text: message });
    }
  };


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
            Add Formation (පිහිටුවීම එක් කරන්න)
            </h2>
            <button
                onClick={onClose}
                className="text-xl font-bold hover:opacity-70"> ✕
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <Label>Formation Name<span className="text-red-500">*</span></Label>
            <Input
              value={formation}
              onChange={(e:any) => setFormation(e.target.value)}
              required
            />
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

export default AddFormationModel;