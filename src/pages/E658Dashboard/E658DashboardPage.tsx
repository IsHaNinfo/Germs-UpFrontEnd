
import { useNavigate } from "react-router-dom";
import React from "react";
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

const E658DashboardPage = () => {
  const navigate = useNavigate();
  const { hasPermission } = useUserContext();

    if (hasPermission("e658/view_in_sidebar")) {
      return (
        <div className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

            <Card
              visible={hasPermission("e658/view_long_run")}
              title="Long Run"
              subtitle="This one use long run for the vehicle"
              path="/germs/induction/vehicle-induction"
              gradient="bg-gradient-to-r from-[#0F2027] to-[#2D6580]"
              onClick={() => navigate("/germs/e-658/long-run")}
            />

            <Card
              visible={hasPermission("e658/view_short_run")}
              title="Short Run"
              subtitle="This one use short run for the vehicle"
              path="/germs/induction/register-to-air-force"
              gradient="bg-gradient-to-r from-[#52423D] to-[#2B130D]"
              onClick={() => navigate("/germs/e-658/short-run")}
            />

            <Card
              visible={hasPermission("e658/view_rr")}
              title="RR"
              subtitle="This one use RR for the vehicle"
              path="/germs/induction/vehicle-allocation"
              gradient="bg-gradient-to-r from-[#697366] to-[#0F1F05]"
              onClick={() => navigate("/germs/e-658/rr")}
            />

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

export default E658DashboardPage;