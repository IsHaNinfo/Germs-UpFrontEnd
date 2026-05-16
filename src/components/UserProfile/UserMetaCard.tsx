import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

interface UserProfile {
  username?: string;
  rank?: string;
  given_name?: string;
  family_name?: string;
}

export default function UserMetaCard() {
  const { state, getBasicUserInfo, getDecodedIDToken } = useAuthContext();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
  console.log("Authentication State:", state);
    if (state.isAuthenticated) {
      Promise.all([getBasicUserInfo(), getDecodedIDToken()]).then(
        ([basicInfo, idToken]) => {
          console.log("Basic Info:", basicInfo);
          setUser({
            username: basicInfo.SvcNo,
            rank: basicInfo.Rank,
            given_name: idToken.given_name,
            family_name: idToken.family_name,
          });
        }
      );
    }
  }, [state.isAuthenticated]);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            {user ? (
              <>
                <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                  <img src="/images/user/owner.jpg" alt="user" />
                </div>
                <div className="order-3 xl:order-2">
                  <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                    {user ? `${user.rank} ${user.given_name} ${user.family_name}` : "Guest"}
                  </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.username}
                  </p>
                </div>
                </div>
              </>
              ) : (
                <p>Please login to see user info.</p>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
