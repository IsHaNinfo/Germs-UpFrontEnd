import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useRef } from "react";
import Logo from "../../../public/images/slaf.png";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

type CustomJwtPayload = {
  sub: string;
  SvcNo: string;
  Rank: string;
  given_name: string;
  family_name: string;
  userLocation: string;
  Division: string;
  roles: string[];
  scope?: string;
};

export default function Apps() {
  const { state, signIn, getAccessToken } = useAuthContext();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  // Prevent signIn loop
  const loginTriggered = useRef(false);

  useEffect(() => {
    const handleAuth = async () => {

      // Only trigger once
      if (
        !state.isAuthenticated &&
        !state.isLoading &&
        !loginTriggered.current
      ) {
        loginTriggered.current = true;
        await signIn();
        return;
      }

      if (state.isAuthenticated) {
        try {
          const token = await getAccessToken();

          const decodedToken = jwtDecode<CustomJwtPayload>(token);

          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/User/login-with-jwt`,
            {
              jwtToken: token,
            }
          );

          const permissions = decodedToken.scope
            ? decodedToken.scope.split(" ")
            : [];

          const userDetails = {
            id: decodedToken.sub,
            svcNo: decodedToken.SvcNo,
            rank: decodedToken.Rank,
            name:
              decodedToken.given_name +
              " " +
              decodedToken.family_name,
            location: decodedToken.userLocation,
            formation: decodedToken.Division,
            roleId: decodedToken.roles,

            roles: decodedToken.roles || [],
            permissions: permissions || [],
          };

          setUser(userDetails);

        } catch (error) {
          console.error("Token decode failed:", error);
        }
      }
    };

    handleAuth();
  }, [state.isAuthenticated, state.isLoading]);

  if (state.isLoading) {
    return (
      <div className="loader-main">
        <div className="loader-circle-7"></div>
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return null;
  }

  const Card = ({
    title,
    subtitle,
    path,
    gradient,
  }: {
    title: string;
    subtitle: string;
    path: string;
    gradient: string;
  }) => (
    <div
      onClick={() => navigate(path)}
      className={`relative rounded-2xl p-6 min-h-[180px] text-white cursor-pointer
                  shadow-lg hover:shadow-2xl hover:scale-[1.03]
                  transition-all duration-300 ${gradient}`}
    >
      <div className="flex justify-between items-center h-full">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
          <p className="text-sm opacity-80 mt-1">{subtitle}</p>
        </div>

        <div
          className="bg-white/20 backdrop-blur-sm 
                        w-10 h-10 flex items-center justify-center 
                        rounded-full"
        >
          <span className="text-xl">›</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#FFFFFF,_#C9DEF2)] items-center">

      <div className="absolute inset-0 opacity-30 pointer-events-none" />

      <img
        src={Logo}
        alt="SLAF Logo"
        className="z-10 w-40 h-40 object-contain mb-6 mt-4"
      />

      <div className="md:p-10 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">

          <Card
            title="GERMS"
            subtitle="General Engineering Resource Management System"
            path="/germs"
            gradient="bg-gradient-to-r from-[#1F4788] to-[#4A90E2]"
          />

          <Card
            title="HRMS"
            subtitle="Human Resource Management System"
            path=""
            gradient="bg-gradient-to-r from-[#632877] to-[#8f609f]"
          />

          <Card
            title="MMS"
            subtitle="Medical Management System"
            path=""
            gradient="bg-gradient-to-r from-[#8B6914] to-[#D4A574]"
          />

          <Card
            title="MIS"
            subtitle="Management Information System"
            path=""
            gradient="bg-gradient-to-r from-[#b54e13] to-[#df8666]"
          />

        </div>
      </div>
    </div>
  );
}