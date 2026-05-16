import { useNavigate } from "react-router-dom";
// import AllPermissions from "../../components/UserRoleManagement/AllPermissions";
import { useUserContext } from "../../context/UserContext";

const Permissions = () => {
    // const { UserRole } = useParams<{ UserRole: any }>();
    const navigate = useNavigate();
    const { hasPermission } = useUserContext();
    
    if (hasPermission("user_role_management-view_in_sidebar")) {
    return (
        <div className="w-full bg-gray-50 px-8 py-8">
            <div className="mx-auto">
                {/* <AllPermissions userRole={UserRole} /> */}
            </div>
        </div>
    );
    }else{
        navigate("/germs/");
    }
};

export default Permissions;