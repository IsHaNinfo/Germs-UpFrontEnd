import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type CustomJwtPayload = {
  SvcNo: string;
  Rank: string;
  given_name: string;
  family_name: string;
  userLocation: string;
  Division: string;
  roles: string[];
};

export default function UserInfoCard() {
  const { state,getAccessToken } = useAuthContext();
  const [user, setUser] = useState<CustomJwtPayload | null>(null);

  const loadUser = async () => {
    const token = await getAccessToken();
    const decodedToken = jwtDecode<CustomJwtPayload>(token);

    setUser(decodedToken);
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      loadUser();
    }
  }, [state.isAuthenticated]);
  
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Service Number
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.SvcNo : "Service Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Rank
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.Rank : "Rank"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.given_name+user.family_name : "Name"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Location
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.userLocation : "Location"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Formation
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.Division : "Formation"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                User Role
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.roles : "User Role"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}