import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSupplierCreated: () => void;
}

const SupplierModal: React.FC<Props> = ({ isOpen, onClose, onSupplierCreated }) => {
  const [supplierName, setSupplierName] = useState("");
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Handle Form Submission to Create a New Supplier

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      supplierName,
      purchaseOrderNo,
    };

     try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/supplier`,
        data
      );
      Swal.fire({ icon: "success", title: "Success", text: "Supplier Added Successfully!" });
      onSupplierCreated(); // ✅ Refresh supplier dropdown in parent
      setSupplierName("");
      setPurchaseOrderNo("");
      onClose();
     
    } catch (error: any) {
      const message = error.response?.data?.detail 
      error.message ||
      "Failed to add supplier.";
      Swal.fire({ icon: "error", title: "Error", text: message });
    }
  };


  if (!isOpen) return null;

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Add supplier model

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100000">
      
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    ></div>
    
      <div className="relative bg-white overflow-y-auto rounded-lg p-6 shadow-2xl animate-fadeIn w-[400px] ">

        <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-2xl font-semibold">
            Add Supplier
            </h2>
            <button
                onClick={onClose}
                className="text-xl font-bold hover:opacity-70"> ✕
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <Label>Supplier Name (සැපයුම්කරුගේ නම)<span className="text-red-500">*</span></Label>
            <Input
              value={supplierName}
              onChange={(e:any) => setSupplierName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Purchase Order No (මිලදී ගැනීමේ ඇණවුම අංක)<span className="text-red-500">*</span></Label>
            <Input
              value={purchaseOrderNo}
              onChange={(e:any) => setPurchaseOrderNo(e.target.value)}
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

export default SupplierModal;