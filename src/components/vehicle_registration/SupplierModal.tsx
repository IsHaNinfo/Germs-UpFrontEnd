import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SupplierModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [supplierName, setSupplierName] = useState("");
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      supplierName,
      purchaseOrderNo,
    };

    console.log("Supplier Data:", data);
    alert("Supplier Added Successfully!");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      
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
            <Label>Supplier Name</Label>
            <Input
              value={supplierName}
              onChange={(e:any) => setSupplierName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Purchase Order No</Label>
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