import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../ui/button/Button";
import AddServiceRuleModal from "./AddServiceRuleModal";
import EditServiceRuleModal from "./EditServiceRuleModal";
import Label from "../form/Label";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";

const initialState = {
  typeID: "",
  manufacturerId: "",
  modelID: "",
};

const ServiceRules = () => {
  const [formData, setFormData] = useState(initialState);
  const [vehicleTypeData, setVehicleTypeData] = useState<any[]>([]);
  const [manufacturerData, setManufacturerData] = useState<any[]>([]);
  const [modelData, setModelData] = useState<any[]>([]);
  const [serviceRules, setServiceRules] = useState<any[]>([]);
  const [isAddServiceRuleModalOpen, setIsAddServiceRuleModalOpen] = useState(false);
  const [selectedServiceRule, setSelectedServiceRule] = useState<any>(null);
  const [isEditServiceRuleModalOpen, setIsEditServiceRuleModalOpen] = useState(false);
  const { hasPermission } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicleTypeData();
  }, []);

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
  // Des: Fetch vehicle type data from the backend and set it to the state

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

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Fetch Condition Type Data

  const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {


  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Fetch vehicle manufacturer data based on the selected vehicle type and set it to the state. Also reset the model and service rule data when vehicle type changes
  
    handleChange(e);
    const TypeID = e.target.value;
    setManufacturerData([]);
    setModelData([]);
    setServiceRules([]);
    
    if(TypeID==="noVal"){
      
    }else{
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/VehicleModel/by-vehicle-type?vehicleTypeId=${TypeID}`,
        );
        const manufacturerData = response.data.map((model: any) => ({
          manufacturerId: model.manufacturerId,
          manufacturerName: model.manufacturerName,
        }));
        setManufacturerData(manufacturerData);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle manufacturer data." });
      }      
    }
  }

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Manufacturer change event handler to fetch vehicle model data based on the selected manufacturer and set it to the state. Also reset the service rule data when manufacturer changes

  const handleManufacturerChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    const selectedManufacturerId = e.target.value;
    setModelData([]);
    setServiceRules([]);

    if(selectedManufacturerId==="noVal"){
    
    }else{
      try{
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/VehicleModel/get-vehiclemodels-by-typeid-manufacturerid?vehicleTypeId=${formData.typeID}&manufacturerId=${selectedManufacturerId}`,
        );
        const modelData = response.data.map((model: any) => ({
          modelId: model.modelId,
          modelName: model.modelName,
        }));
        setModelData(modelData);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch vehicle model data." });
      }
    }
  }

  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Vehicle model change event handler to fetch service rule data based on the selected vehicle model and set it to the state.

  const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    const selectedModelId = e.target.value;
    setServiceRules([]);
    if(selectedModelId==="noVal"){
    
    }else{
      try{
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/ModelServiceRule/${selectedModelId}`,
        );
        setServiceRules(response.data);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch service type data." });
      }
    }
  }
  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Get All Sevice Rules 
  const getAllServiceRuleList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ModelServiceRule/${formData.modelID}`);
      setServiceRules(res.data);
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch service rule data." });
    }
  };

  const addNewServiceRule = () => {
    setIsAddServiceRuleModalOpen(true);
  };
  
  const openServiceRuleEditModal = (serviceRule: any) => {
    setSelectedServiceRule(serviceRule);
    setIsEditServiceRuleModalOpen(true);
  }
  
  // Created By: Fg Off YSDU De Silva
  // Created Date: 13.04.2026
  // Des: Service rule delete model 

  const openServiceRuleDeleteModal = async (serviceRule: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/ModelServiceRule/${serviceRule.modelServiceRuleId}`);
        getAllServiceRuleList();
        Swal.fire({
          title: "Deleted!",
          text: "Service rule has been deleted.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      }
    }
  }

  if (hasPermission("Maintenance-View Service Rule Settings")) { 
    return (
      <div className="p-6 pt-0">

        <div className="flex justify-between items-center mb-6">
          <div>
            <Label>Vehicle Type (වාහන ර්වගය)<span className="text-red-500">*</span></Label>
            <select
              name="typeID"
              value={formData.typeID}
              onChange={handleTypeChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="noVal">Select Vehicle Type</option>
              {vehicleTypeData.map((vehicleType) => (
                <option key={vehicleType.vehicleTypeId} value={vehicleType.vehicleTypeId}>
                  {vehicleType.vehicleTypeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Manufacture (නිෂ්පාදකයා)<span className="text-red-500">*</span></Label>
            <select
              name="manufacturerId"
              value={formData.manufacturerId}
              onChange={handleManufacturerChange}
              required
              disabled={!manufacturerData.length}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="noVal">Select Manufacture</option>
              {manufacturerData.map((manufacturer) => (
                <option key={manufacturer.manufacturerId} value={manufacturer.manufacturerId}>
                  {manufacturer.manufacturerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Vehicle Model (වාහන මාදිලිය)<span className="text-red-500">*</span></Label>
            <select
              name="modelID"
              value={formData.modelID}
              onChange={handleModelChange}
              required
              disabled={!modelData.length}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="noVal">Select Vehicle Model</option>
              {modelData.map((model) => (
                <option key={model.modelId} value={model.modelId}>
                  {model.modelName}
                </option>
              ))}
            </select>
          </div>
          <Button hidden={!hasPermission("maintenance/add_new_service_rule")}
                  type="button" onClick={() => addNewServiceRule()} disabled={formData.typeID=="" || formData.manufacturerId=="" || formData.modelID == ""}>
              + Add New Service Rule
          </Button>
        </div>
        
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Service Type</th>
                <th className="p-3">Condition Type</th>
                <th className="p-3">Threshold value</th>
                <th className="p-3"
                  hidden={!hasPermission("maintenance/edit_service_rule") && !hasPermission("maintenance/delete_service_rule")}
                >Actions</th>
              </tr>
            </thead>

            <tbody>
              {formData.typeID === "" || formData.manufacturerId === "" || formData.modelID === "" ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Select vehicle details to view Service Rules
                  </td>
                </tr>
              ) :serviceRules.length > 0 ? (
                serviceRules.map((v, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50 text-center">
                    <td className="p-2">{v.serviceTypeName}</td>
                    <td className="p-2">
                      {v.conditionType === 1
                      ? "Mileage"
                      : v.conditionType === 2
                      ? "TimePeriod"
                      : v.conditionType === 3
                      ? "Manual"
                      : ""}
                    </td>
                    <td className="p-2">{v.thresholdValue}</td>
                    <td className="flex justify-center gap-3 p-2"
                      hidden={!hasPermission("maintenance/edit_service_rule") && !hasPermission("Maintenance-Delete Service Rule")}>
                      <button hidden={!hasPermission("maintenance/edit_service_rule")}
                              title="Edit" className="text-blue-600" onClick={() => {
                          openServiceRuleEditModal(v);
                        }}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button hidden={!hasPermission("Maintenance-Delete Service Rule")}
                              title="Delete" className="text-blue-600" onClick={() => {
                          openServiceRuleDeleteModal(v);
                        }}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No Service Rules found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <AddServiceRuleModal
          isOpen={isAddServiceRuleModalOpen}
          onClose={() => setIsAddServiceRuleModalOpen(false)}
          onUserRoleCreated={getAllServiceRuleList}
          vehicleDetails={formData}
        />

        {isEditServiceRuleModalOpen && selectedServiceRule && (
          <EditServiceRuleModal
            isOpen={isEditServiceRuleModalOpen}
            onClose={() => setIsEditServiceRuleModalOpen(false)}
            onUserRoleCreated={getAllServiceRuleList}
            serviceRule={selectedServiceRule}
          />
        )}
      </div>
    );
  }else{
    navigate("/germs/");
  }
};

export default ServiceRules;