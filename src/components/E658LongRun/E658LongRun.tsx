import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  subtitle: string;
  gradient: string;
  visible?: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, subtitle, gradient, visible = true, onClick }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-3xl
        p-8 min-h-[220px] cursor-pointer
        ${gradient}
        text-white
        shadow-xl
        transition-all duration-500 ease-in-out
        hover:-translate-y-3
        hover:scale-105
        hover:shadow-[0_0_45px_rgba(0,0,0,0.5)]
        flex flex-col justify-between
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
          <h2 className="text-3xl font-bold tracking-wide">{title}</h2>
          <p className="text-md mt-3 opacity-90 font-light">{subtitle}</p>
        </div>

        <div className="flex justify-end mt-8">
          <div
            className="
              w-14 h-14
              flex items-center justify-center
              rounded-full
              bg-white/20
              group-hover:bg-white/40
              transition-all duration-300
              shadow-lg
              backdrop-blur-md"
          >
            <span
              className="
                text-2xl
                group-hover:translate-x-2
                transition-transform duration-300"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

  // Created By: Flt Lt RJ Palihawadana
  // Created Date: 13.05.2026
  // Des: This component serves as the main entry point for the E658 Long Run feature. 

const E658LongRun = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 border-b mb-10 pb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              E658 Long Run
            </h1>
            <p className="text-gray-500 mt-1">
              Select an action below to proceed with Long Run operations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          <Card
            title="Request Authority"
            subtitle="Initiate a request for authority for the long run"
            gradient="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]"
            onClick={() => navigate("request-authority")} 
          />

          <Card
            title="Create 658"
            subtitle="Create a new E658 document for the long run"
            gradient="bg-gradient-to-br from-[#065F46] via-[#059669] to-[#10B981]"
            onClick={() => navigate("create")} 
          />
        </div>
      </div>
    </div>
  );
};

export default E658LongRun;