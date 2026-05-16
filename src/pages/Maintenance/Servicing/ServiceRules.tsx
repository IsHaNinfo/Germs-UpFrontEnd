import { useNavigate } from "react-router";
import ServiceRulesComponent from "../../../components/ServiceRules/ServiceRules";
import { useUserContext } from "../../../context/UserContext";

const ServiceRules = () => {
    const navigate = useNavigate();
    const { hasPermission } = useUserContext();

    if (hasPermission("maintenance-view_service_rule_settings")) {
    return (
        <div className="w-full bg-gray-50 px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="mb-10 border-b pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Service Rules
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage service rules within the system
                    </p>
                </div>
            </div>
        </div>

        <div className="mx-auto">
            <ServiceRulesComponent />
        </div>

        </div>
    );
    }else{
        navigate("/germs/");
    }
};

export default ServiceRules;