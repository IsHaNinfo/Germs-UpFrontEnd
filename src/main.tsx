import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "@asgardeo/auth-react";
// import { PermissionProvider } from "./context/PermissionContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

// FOR-DEVELOPING
// const config={
//   signInRedirectURL: "https://germs-up-front-end.vercel.app",
//   signOutRedirectURL: "https://germs-up-front-end.vercel.app",
//   clientID: "OuvFXAdkNq0qcvsFAQcHIR2DVFwa",
//   baseUrl: "https://api.asgardeo.io/t/germsslaf",
//   scope: [
//     "openid",
//     "profile",
//     "roles",

//     "dashboard/view_in_sidebar",
    
//     "induction/view_in_sidebar",
//     "induction/view_vehicle_induction",
//     "induction/view_register_to_airforce",
//     "induction/view_allocation",

//     "maintenance/view_in_sidebar",
//     "maintenance/view_servicing",
//     "maintenance/view_repairs",
//     "maintenance/view_accident_repairs",
//     "maintenance/view_utilization_of_mtms",
//     "maintenance/add_new_service",
//     "maintenance/edit_service_rule",
//     "maintenance/add_new_service_rule",
//     "maintenance/delete_service_rule",
//     "maintenance/view_service_rule_settings",

//     "mt-operations/view_in_sidebar",

//     "e658/view_in_sidebar",
//     "e658/view_long_run",
//     "e658/view_short_run",
//     "e658/view_rr",

//     "reports/view_in_sidebar",

//     "settings/view_in_sidebar",
//   ]
// };

//FOR-GERMS-IS-SERVER
// const config={
//   signInRedirectURL: "http://192.168.20.213:8091",
//   signOutRedirectURL: "http://192.168.20.213:8091",
//   clientID: "fTD5qozbkLILr0JJZF5Q9qmC_c4a",
//   baseUrl: "https://192.168.20.213:9443",
//   scope: [
//     "openid",
//     "profile",
//     "roles",

//     "dashboard/view_in_sidebar",
    
//     "induction/view_in_sidebar",
//     "induction/view_vehicle_induction",
//     "induction/view_register_to_airforce",
//     "induction/view_allocation",

//     "maintenance/view_in_sidebar",
//     "maintenance/view_servicing",
//     "maintenance/view_repairs",
//     "maintenance/view_accident_repairs",
//     "maintenance/view_utilization_of_mtms",
//     "maintenance/add_new_service",
//     "maintenance/edit_service_rule",
//     "maintenance/add_new_service_rule",
//     "maintenance/delete_service_rule",
//     "maintenance/view_service_rule_settings",

//     "mt-operations/view_in_sidebar",

//     "e658/view_in_sidebar",
//     "e658/view_long_run",
//     "e658/view_short_run",
//     "e658/view_rr",

//     "reports/view_in_sidebar",

//     "settings/view_in_sidebar",
//   ]
// };

// const config={ 
//   signInRedirectURL: "https://germs-up-front-end.vercel.app",
//   signOutRedirectURL: "https://germs-up-front-end.vercel.app",
//   clientID: "EQ42PfKvwO5xeOb1bvo0AykAHcUa",
//   baseUrl: "https://api.asgardeo.io/t/germsslaf56",
//   scope: [
//   "openid profile",
//   ]
// };
















// FOR-GERMS-IS-SERVER-SASINDU
// const config={ 
//   signInRedirectURL: "http://localhost:5173",
//   signOutRedirectURL: "http://localhost:5173",
//   clientID: "cHnVT29EeqqoeK0WjQwZ07WUVuMa",
//   baseUrl: "https://192.168.20.213:9443",
//   scope: [
//     "openid",
//     "profile",
//     "roles",

//     "dashboard/view_in_sidebar",
    
//     "induction/view_in_sidebar",
//     "induction/view_vehicle_induction",
//     "induction/view_register_to_airforce",
//     "induction/view_allocation",

//     "maintenance/view_in_sidebar",
//     "maintenance/view_servicing",
//     "maintenance/view_repairs",
//     "maintenance/view_accident_repairs",
//     "maintenance/view_utilization_of_mtms",
//     "maintenance/add_new_service",
//     "maintenance/edit_service_rule",
//     "maintenance/add_new_service_rule",
//     "maintenance/delete_service_rule",
//     "maintenance/view_service_rule_settings",

//     "mt-operations/view_in_sidebar",

//     "e658/view_in_sidebar",
//     "e658/view_long_run",
//     "e658/view_short_run",
//     "e658/view_rr",

//     "reports/view_in_sidebar",

//     "settings/view_in_sidebar",
//   ]
// };





// IS-LOCAL
// const config={ 
//   signInRedirectURL: "http://localhost:5173",
//   signOutRedirectURL: "http://localhost:5173",
//   clientID: "UTP3wZ5ONGSpr245t8ryK63fffwa",
//   baseUrl: "https://localhost:9443",
//   scope: [
//     "openid",
//     "profile",
//     "roles",

//     "dashboard/view_in_sidebar",
    
//     "induction/view_in_sidebar",
//     "induction/view_vehicle_induction",
//     "induction/view_register_to_airforce",
//     "induction/view_allocation",

//     "maintenance/view_in_sidebar",

//     "mt-operations/view_in_sidebar",

//     "e658/view_in_sidebar",

//     "reports/view_in_sidebar",

//     "settings/view_in_sidebar",
//   ]
// };


const config={ 
  signInRedirectURL: "https://germs-up-front-end.vercel.app",
  signOutRedirectURL: "https://germs-up-front-end.vercel.app",
  clientID: "EQ42PfKvwO5xeOb1bvo0AykAHcUa",
  baseUrl: "https://api.asgardeo.io/t/germsslaf56",
  scope: [
  "openid profile",
  ]
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <AuthProvider config={config}>
            {/* <PermissionProvider> */}
              <UserProvider>
                <App />
              </UserProvider>
            {/* </PermissionProvider>  */}
        </AuthProvider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);