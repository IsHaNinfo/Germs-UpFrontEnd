import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { localStorageManagementService } from "../../services/localStorageManagementService";

interface UserProfile {
  svcNo: string;
  rank: string;
  name: string;
  location: string;
  formation: string;
  roleName: string;
}

export default function UserInfoCard() {
  const { state } = useAuthContext();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (state.isAuthenticated) {
      const userInfo = localStorageManagementService.getLocalStorageUserDetails();
      setUser(userInfo);
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
                {user ? user.svcNo : "Service Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Rank
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.rank : "Rank"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.name : "Name"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Location
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.location : "Location"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Formation
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.formation : "Formation"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                User Role
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user ? user.roleName : "User Role"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
