import ServiceRulesComponent from "../../components/ServiceRules/ServiceRules";

const ServiceRules = () => {
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
};

export default ServiceRules;