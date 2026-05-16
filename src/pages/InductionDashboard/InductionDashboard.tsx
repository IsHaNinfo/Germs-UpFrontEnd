import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import AllVehicle from "../../components/induction/AllVehicle";
import { useUserContext } from "../../context/UserContext";

interface CardProps {
  title: string;
  subtitle: string;
  path: string;
  gradient: string;
  visible?: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, subtitle, gradient, visible=false, onClick }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-3xl
        p-8 min-h-[190px] cursor-pointer
        ${gradient}
        text-white
        shadow-xl
        transition-all duration-500 ease-in-out
        hover:-translate-y-3
        hover:scale-105
        hover:shadow-[0_0_45px_rgba(0,0,0,0.5)]
      `}
    >

      <div
        className="
          absolute inset-0
          opacity-0
          group-hover:opacity-100
          bg-white/10
          backdrop-blur-sm
          transition-opacity duration-500
      "
      ></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>

          <p className="text-sm mt-2 opacity-90">{subtitle}</p>
        </div>

        <div className="flex justify-end mt-6">
          <div
            className="
              w-12 h-12
              flex items-center justify-center
              rounded-full
              bg-white/20
              group-hover:bg-white/40
              transition-all duration-300">
            <span
              className="
              text-2xl
                group-hover:translate-x-2
                transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.04.2026
  // Des: Induction Dashboard with permission-based card visibility and navigation

const InductionDashboard = () => {
  const navigate = useNavigate();
  const { hasPermission } = useUserContext();

  useEffect(() => {
    if (!hasPermission("dashboard/view_in_sidebar")) {
      navigate("/germs/");
    }
  }, [navigate]);

    if (hasPermission("dashboard/view_in_sidebar")) {
      return (
        <div className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

            <Card
              visible={hasPermission("induction/view_vehicle_induction")}
              title="Vehicle Induction"
              subtitle="Induct new vehicles into the system"
              path="/germs/induction/vehicle-induction"
              gradient="bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]"
              onClick={() => navigate("/germs/induction/vehicle-induction")}
            />

            <Card
              visible={hasPermission("induction/view_register_to_airforce")}
              title="Register to AirForce"
              subtitle="Register new vehicles to the AirForce"
              path="/germs/induction/register-to-air-force"
              gradient="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2]"
              onClick={() => navigate("/germs/induction/register-to-air-force")}
            />

            <Card
              visible={hasPermission("induction/view_allocation")}
              title="Allocation"
              subtitle="Allocate vehicles to different units"
              path="/germs/induction/vehicle-allocation"
              gradient="bg-gradient-to-r from-[#11998e] to-[#38ef7d]"
              onClick={() => navigate("/germs/induction/vehicle-allocation")}
            />

          </div>

          <div className="mt-5 mx-auto">
            <AllVehicle />
          </div>

        </div>
      );
    }else{
      // Swal.fire({
      //   icon: "error",
      //   title: "Access Denied",
      //   text: "You do not have permission to view this page.",
      //   confirmButtonText: "Go Back",
      // }).then(() => {

        navigate("/germs/");
        
      // });
    }
};

export default InductionDashboard;