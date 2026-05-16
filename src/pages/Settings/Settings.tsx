import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";

// interface CardProps {
//   title: string;
//   subtitle: string;
//   path: string;
//   gradient: string;
//   visible?: boolean;
//   onClick: () => void;
// }

// const Card: React.FC<CardProps> = ({ title, subtitle, gradient, visible=false, onClick }) => {
//   if (!visible) {
//     return null;
//   }

//   return (
//     <div
//       onClick={onClick}
//       className={`
//         group relative overflow-hidden rounded-3xl
//         p-8 min-h-[190px] cursor-pointer
//         ${gradient}
//         text-white
//         shadow-xl
//         transition-all duration-500 ease-in-out
//         hover:-translate-y-3
//         hover:scale-105
//         hover:shadow-[0_0_45px_rgba(0,0,0,0.5)]
//       `}
//     >
//        <div className="
//           absolute inset-0
//           opacity-0
//           group-hover:opacity-100
//           bg-white/10
//           backdrop-blur-sm
//           transition-opacity duration-500
//       "></div>
    
//       <div className="relative z-10 flex flex-col justify-between h-full">
//         <div>
//           <h2 className="text-2xl font-bold">{title}</h2>
//           <p className="text-sm mt-2 opacity-90">{subtitle}</p>
//         </div>
//         <div className="flex justify-end">
//           <div className="
//               w-12 h-12
//               flex items-center justify-center
//               rounded-full
//               bg-white/20
//               group-hover:bg-white/40
//               transition-all duration-300
//           ">
//             <span className="
//                 text-2xl
//                 group-hover:translate-x-2
//                 transition-transform duration-300
//             ">
//               →
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Settings = () => {
    const navigate = useNavigate();
    const { hasPermission } = useUserContext();

    if (hasPermission("settings-view_in_sidebar")) {
    return (
        <div className="w-full bg-gray-50 px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className="mb-10 border-b pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Settings
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage system settings
                        </p>
                    </div>
                </div>
            </div>

            {/* <div className="">    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    <Card
                        visible={hasPermission("Settings", "View in Sidebar")}
                        title="Vehicle Service Rules"
                        subtitle="manage maintaining roadworthiness"
                        path="/germs/maintenance/service-rules"
                        gradient="bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]"
                        onClick={() => navigate("/germs/maintenance/service-rules")}
                    />
                </div>
            </div> */}
        </div>
    );
    }else{
      navigate("/germs/");
    }
};

export default Settings;