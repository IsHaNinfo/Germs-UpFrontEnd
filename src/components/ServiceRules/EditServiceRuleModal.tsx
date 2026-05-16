import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUserRoleCreated: () => void;
  serviceRule: any;
}

const initialState = {
  modelServiceRuleId: "",
  conditionId: "",
  serviceId: "",
  value: "",
};

const EditServiceRuleModal: React.FC<Props> = ({ isOpen, onClose, onUserRoleCreated, serviceRule }) => {
  const [formData, setFormData] = useState(initialState);
  const [serviceTypeData, setServiceTypeData] = useState<any[]>([]);
  const [conditionTypeData, setConditionTypeData] = useState<any[]>([]);
  const [showThreshold, setShowThreshold] = useState(false);
  const navigate = useNavigate();

  const { hasPermission } = useUserContext();
  
  useEffect(() => {
    if (serviceRule) {
      setFormData({
        modelServiceRuleId: serviceRule.modelServiceRuleId || "",
        conditionId: serviceRule.conditionType || "",
        serviceId: serviceRule.serviceTypeId || "",
        value: serviceRule.thresholdValue || "",
      });

      if (
        serviceRule.conditionType === 1 ||
        serviceRule.conditionType === 2
      ) {
        setShowThreshold(true);
      } else {
        setShowThreshold(false);
      }
    }
    fetchServiceTypeData();
    fetchConditionTypeData();
  }, [serviceRule]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Fetch service type data from the API and set it to state

  const fetchServiceTypeData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/ServicingStatus/GetServicingStatus`,
      );
      const serviceTypeData = response.data.map((vehicleType: any) => ({
        serviceTypeId: vehicleType.id,
        serviceTypeName: vehicleType.name,
      }));
      setServiceTypeData(serviceTypeData);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch service type data." });
    }
  }

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Fetch condition type data 

  const fetchConditionTypeData = async () => {
    const conditionTypeData = [
      { conditionTypeId: 1, conditionTypeName: "Mileage" },
      { conditionTypeId: 2, conditionTypeName: "TimePeriod" },
      { conditionTypeId: 3, conditionTypeName: "Manual" },
    ];
    setConditionTypeData(conditionTypeData);
  }

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Handle service type change, set the selected service type to state and fetch condition type data based on the selected service type
  const handleServiceTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    try {
      const conditionTypeData = [
        { conditionTypeId: 1, conditionTypeName: "Mileage" },
        { conditionTypeId: 2, conditionTypeName: "TimePeriod" },
        { conditionTypeId: 3, conditionTypeName: "Manual" },
      ];
      setConditionTypeData(conditionTypeData);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch condition type data." });
    }
  }

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Fetch Condition Type Change, set the selected condition type to state and show/hide threshold input based on the selected condition type

  const handleConditionTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedConditionTypeId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      conditionId: selectedConditionTypeId,
      value: "",
    }));

    if (selectedConditionTypeId === "1" || selectedConditionTypeId === "2") {
      setShowThreshold(true);
    } else {
      setShowThreshold(false);
    }
  }

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Handle form submission

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      serviceTypeId: Number(formData.serviceId),
      conditionType: Number(formData.conditionId),
      thresholdValue: Number(formData.value),
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/ModelServiceRule/${formData.modelServiceRuleId}`,
        data
      );
      Swal.fire({ icon: "success", title: "Success", text: "Service Rule updated Successfully!" });
      onUserRoleCreated();
      onClose();

    } catch (error: any) {
      const message = error.response?.data?.detail || error.message || "Failed to update service rule.";
      Swal.fire({ icon: "error", title: "Error", text: message });
    }
  };

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Edit Service Rule Modal

  if (!isOpen) return null;

  if (hasPermission("maintenance/edit_service_rule")) { 
    return (
      <div className="fixed inset-0 flex items-center justify-center z-100000">

        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <div className="relative bg-white overflow-y-auto rounded-lg p-6 shadow-2xl animate-fadeIn w-[800px] ">

          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-2xl font-semibold">
              Edit Service Rule
            </h2>
            <button
              onClick={onClose}
              className="text-xl font-bold hover:opacity-70"> ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">

              <div>
                <Label>Service Type (සේවා ර්වගය)<span className="text-red-500">*</span></Label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleServiceTypeChange}
                  required
                  disabled
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Select Service Type</option>
                  {serviceTypeData.map((serviceType) => (
                    <option key={serviceType.serviceTypeId} value={serviceType.serviceTypeId}>
                      {serviceType.serviceTypeName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Condition Type (තත්ත්ව ර්වගය)<span className="text-red-500">*</span></Label>
                <select
                  name="conditionId"
                  value={formData.conditionId}
                  onChange={handleConditionTypeChange}
                  required
                  disabled={!conditionTypeData.length}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Select Condition Type</option>
                  {conditionTypeData.map((conditionType) => (
                    <option key={conditionType.conditionTypeId} value={conditionType.conditionTypeId}>
                      {conditionType.conditionTypeName}
                    </option>
                  ))}
                </select>
              </div>

              {showThreshold && (
                <div>
                  <Label>
                    threshold value<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit">
                Update
              </Button>
            </div>

          </form>
        </div>

      </div>
    );
  } else {
    navigate("/germs/");
  }
};

export default EditServiceRuleModal;