
import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegisterVehicleAirForce: () => void;
}

const VehicleRegisterAirForceModel : React.FC<Props> = ({ isOpen, onClose, onRegisterVehicleAirForce }) => {

    const initialState = {
      civilRegNo: '',
      slafRegNo: '',
      inventoryNo: '',
      chassisNo: '',
      createdBy: 'Admin',
    };

  const [formData, setFormData] = useState(initialState);

  const getVehicleDetails = async (e: any) => {
    handleChange(e);
    const civilRegNo = e.target.value;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Vehicle/${civilRegNo}/getVehicle-Reg`,
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        chassisNo: response.data.chassisNo,
      }));

    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle data." });
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const vehicleData = {
      chassisNo: formData.chassisNo,
      slafRegNo: "ගුවන්-"+formData.slafRegNo,
      createdBy: "Admin",
      inventoryNo: formData.inventoryNo,
    };
      try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/VehicleReg`, vehicleData);
        setFormData(initialState);
        onRegisterVehicleAirForce();
        onClose();
        Swal.fire({ icon: "success", title: "Success", text: "Vehicle Registered Successfully!" });

    } catch (error: any) {

    const message = error.response?.data?.detail 
    error.message ||
    "Failed to register vehicle in Air Force.";
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
    
      <div className="relative bg-white overflow-y-auto rounded-lg p-6 shadow-2xl animate-fadeIn w-[1000px] ">

        <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-2xl font-semibold">
                Vehicle Registration for Air Force
            </h2>
            <button
                onClick={onClose}
                className="text-xl font-bold hover:opacity-70"> ✕
            </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div>
                <Label>Civil Registration No (සිවිල් ලියාපදිංචි අංකය)<span className="text-red-500">*</span></Label>
                <Input
                  name="civilRegNo"
                  value={formData.civilRegNo}
                  onChange={(e) => setFormData({ ...formData, civilRegNo: e.target.value })}
                  onBlur={getVehicleDetails}
                  required
                />
                {/* <Input
                name="civilRegNo"
                value={formData.civilRegNo}
                onChange={getVehicleDetails}
                required
                /> */}
            </div>
            
            <div>
                <Label>Chassis No (චැසි අංකය)<span className="text-red-500">*</span></Label>
                <Input
                name="chassisNo"
                value={formData.chassisNo}
                onChange={handleChange}
                required
                disabled
                />
            </div>

            <div className="grid">
                <Label>SLAF Reg No (SLAF ලියාපදිංචි අංකය)<span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-2">
                  <div>ගුවන් -</div>
                  <div>
                    <Input
                      name="slafRegNo"
                      value={formData.slafRegNo}
                      onChange={handleChange}
                      required
                      disabled={!formData.civilRegNo || !formData.chassisNo}
                      />
                  </div>
                </div>
            </div>

            <div>
                <Label>Inventory No (ඉන්වෙන්ටරි අංකය)<span className="text-red-500">*</span></Label>
                <Input
                name="inventoryNo"
                value={formData.inventoryNo}
                onChange={handleChange}
                disabled={!formData.civilRegNo || !formData.chassisNo}
                required
                />
            </div>
            </div>

            <div className="flex justify-end gap-4 mt-12 border-t pt-6">
            <Button
                type="button"
                variant="outline"
                onClick={() => (window.location.href = "/germs/induction/vehicle-registration/register-vehicle-air-force") }
            >
                Back
            </Button>

            <Button type="submit" className="px-6" disabled={!formData.civilRegNo || !formData.chassisNo || !formData.slafRegNo || !formData.inventoryNo}>
                Register Vehicle For Air Force
            </Button>
            </div>
        </form>
      </div>

    </div>
  );
};

export default VehicleRegisterAirForceModel;