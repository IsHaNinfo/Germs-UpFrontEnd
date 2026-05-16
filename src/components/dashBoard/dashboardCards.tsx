import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const DashboardCards = () => {
  const navigate = useNavigate();
  const { hasPermission } = useUserContext();

  const Card = ({ title, subtitle, path, gradient, visible }: { title: string; subtitle: string; path: string; gradient: string, visible?: boolean }) => {
    if (!visible) {
      return null;
    }

    return (
    <div
      onClick={() => navigate(path)}
      className={`relative rounded-2xl p-6 min-h-[150px] text-white cursor-pointer
                  shadow-lg hover:shadow-2xl hover:scale-[1.03]
                  transition-all duration-300 ${gradient}`}
    >
      <div className="flex justify-between items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold">
            {title}
          </h2>
          <p className="text-sm opacity-80 mt-1">
            {subtitle}
          </p>
        </div>

        {/* Right Arrow Circle */}
        <div className="bg-white/20 backdrop-blur-sm 
                        w-10 h-10 flex items-center justify-center 
                        rounded-full">
          <span className="text-xl">›</span>
        </div>
      </div>

      {/* Soft background glow shape */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 
                      bg-white/10 rounded-full blur-2xl"></div>
    </div>)
  };

  return (
    <div className="min-h-[60vh] p-6 md:p-10 flex items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">

        <Card
          visible={hasPermission("induction/view_in_sidebar")}
          title="Induction ,Registration & Allocation"
          subtitle="Vehicle induction,allocation & registration"
          path="/germs/induction"
              gradient="bg-gradient-to-r from-[#001427] to-[#5286E3]"
        />

        <Card
          visible={hasPermission("maintenance/view_in_sidebar")}
          title="Maintenance"
          subtitle="System & equipment management"
          path="/germs/maintenance"
              gradient="bg-gradient-to-r from-[#3D594B] to-[#B4EDCD]"
        />

        <Card
          visible={hasPermission("mt-operations/view_in_sidebar")}
          title="MT Operations"   
          subtitle="Monitor workflow operations"
          path="/germs/mt-operations"
          gradient="bg-gradient-to-r from-[#CCA241] to-[#D9C79A]"
        />

        <Card
          visible={hasPermission("e658/view_in_sidebar")}
          title="E658"   
          subtitle="Long Run, Short Run, RR"
          path="/germs/e-658"
          gradient="bg-gradient-to-r from-[#808000] to-[#DEDE85]"
        />

        <Card
          visible={hasPermission("reports/view_in_sidebar")}
          title="Reports"
          subtitle="Analytics & performance data"
          path="/germs/reports"
          gradient="bg-gradient-to-r from-[#691D1C] to-[#F2A2A2]"
        />

        {/* <Card
          visible={hasPermission("User Management-View in Sidebar")}
          title="User Management"
          subtitle="Manage system users and their access"
          path="/germs/user-management"
          gradient="bg-gradient-to-r from-[#2B2618] to-[#BFB9A6]"
        /> */}

        {/* <Card
          visible={hasPermission("User Role Management-View in Sidebar")}
          title="User Role Management"
          subtitle="Manage user roles and permissions"
          path="/germs/user-role-management"
          gradient="bg-gradient-to-r from-[#5C1366] to-[#CA92D1]"
        /> */}
      </div>
    </div>
  );
};

export default DashboardCards;