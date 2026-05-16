import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Apps from "./pages/Apps/Apps";
import DashboardCards from "./components/dashBoard/dashboardCards";
import Reports from "./pages/Reports/Reports";
import MtOperations from "./pages/MtOperations/MtOperations";
import InductionDashboard from "./pages/InductionDashboard/InductionDashboard";
import PageMaintenance from "./pages/PageMaintenance/PageMaintenance";
import MaintenanceDashboard from "./pages/Maintenance/MaintenanceDashboard/MaintenanceDashboard";
import UOMTMs from "./pages/Maintenance/UOMTMs/UOMTMs";
import VehicleRegistration from "./pages/VehicleRegistation/VehicleRegistation";
import MTMRegistration from "./pages/Maintenance/UOMTMs/MTMRegistration";

import AddVehicleModel from "./pages/AddVehicleModel/AddVehicleModel";
import VehicleRegistrationAirForce from "./components/VehicleRegistationAirForce/RegisterVehicleAirForce";
import UserRoleManagement from "./pages/UserRoleManagement/UserRoleManagement";
import Permissions from "./pages/UserRoleManagement/Permissions";
import UserManagement from "./pages/UserManagement/UserManagement";
import AllocationPage from "./pages/Allocation/AllocationPage";
import Settings from "./pages/Settings/Settings";
import ServicingPage from "./pages/Maintenance/Servicing/Servicing";
import ServiceRules from "./pages/Settings/ServiceRules";
import E658DashboardPage from "./pages/E658Dashboard/E658DashboardPage";
import E658ShortRun from "./components/E658ShortRun/E658ShortRun";
import E658LongRun from "./components/E658LongRun/E658LongRun";
import E658RR from "./components/E658RR/E658RR";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route path="/germs" element={<DashboardCards/>} />

            {/* Others Page */}
            {/* <Route path="/profile" element={<UserProfiles />} /> */}
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* induction */}
            <Route path="/germs/induction" element={<InductionDashboard />} />
            <Route path="/germs/induction/vehicle-induction" element={<VehicleRegistration />} />
            <Route path="/germs/induction/vehicle-induction/add-vehicle-model" element={<AddVehicleModel />} />
            <Route path="/germs/induction/register-to-air-force" element={<VehicleRegistrationAirForce />} />
            <Route path="/germs/induction/vehicle-allocation" element={<AllocationPage />} />
            
            {/* Maintenance */}
            <Route path="/germs/maintenance" element={<MaintenanceDashboard />} />
            <Route path="/germs/maintenance/servicing" element={<ServicingPage/>} />
            <Route path="/germs/maintenance/service-rules" element={<ServiceRules />} />
            <Route path="/germs/maintenance/repairs" element={<MaintenanceDashboard />} />
            <Route path="/germs/maintenance/accident-repairs" element={<MaintenanceDashboard />} />
            <Route path="/germs/maintenance/uomtms" element={<UOMTMs />} />
            <Route path="/germs/maintenance/uomtms/mtm-registration" element={<MTMRegistration />} />

            {/* MT Operations */}
            <Route path="/germs/mt-operations" element={<MtOperations />} />

            {/* E 658 */}
            <Route path="/germs/e-658" element={<E658DashboardPage />} />
            <Route path="/germs/e-658/short-run" element={<E658ShortRun />} />
            <Route path="/germs/e-658/long-run" element={<E658LongRun />} />
            <Route path="/germs/e-658/rr" element={<E658RR />} />

            {/* Reports */}
            <Route path="/germs/reports" element={<Reports />} />

            {/* User Management */}
            <Route path="/germs/user-management" element={<UserManagement />} />

            {/* Role Management */}
            <Route path="/germs/user-role-management" element={<UserRoleManagement />} />
            <Route path="/germs/user-role-management/permissions/:UserRole" element={<Permissions />} />

            {/* Settings */}
            <Route path="/germs/settings" element={<Settings />} />
            {/* <Route path="/germs/settings/service-rules/add" element={<ServiceRules />} /> */}


            {/* Page Maintenance */}
            <Route path="/germs/page-maintenance" element={<PageMaintenance />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />  
            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          {/* <Route path="/germs" element={<Home />} /> */}
          <Route index path="/" element={<Apps />} />
          <Route path="/profile" element={<UserProfiles />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}