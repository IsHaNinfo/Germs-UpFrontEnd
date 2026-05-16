import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import PageMeta from "../components/common/PageMeta";
import { useAuthContext } from "@asgardeo/auth-react";  
import { useEffect } from "react";


export default function UserProfiles() {
    const { state, signIn } = useAuthContext();
  
    useEffect(() => {
        if (!state.isAuthenticated && !state.isLoading) {
          signIn();
        }
      }, [state.isAuthenticated, state.isLoading, signIn]);
    
      if (state.isLoading) {
        return  <div className="loader-main">
                  <div className="loader-circle-7"></div>
                </div>;
      }
    
      if (!state.isAuthenticated) {
        return null; 
      }

  return (
    <>
      <PageMeta
        title="Profile"
        description="This is the Profile page for the GERMS application."
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7  text-center">
          Profile
        </h3>
        <div className="space-y-6">

        <main>
          <div className="profile-card">
            
          </div>
        </main>

        <UserMetaCard />
        <UserInfoCard />
        </div>
      </div>
    </>
  );
}