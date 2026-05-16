import { useNavigate } from "react-router";
import Service from "../../../components/maintenance/Services/Service"
import { useUserContext } from "../../../context/UserContext";

const ServicingPage = () => {
  const navigate = useNavigate();
  const { hasPermission } = useUserContext();

  if (hasPermission("maintenance-view_servicing")) {
    return (
      <div>
        <Service/>
      </div>
    )
  }else{
    navigate("/germs/");
  }
}

export default ServicingPage;