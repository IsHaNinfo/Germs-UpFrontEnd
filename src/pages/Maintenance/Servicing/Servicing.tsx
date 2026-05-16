// import { useNavigate } from "react-router";
import Service from "../../../components/maintenance/Services/Service"
// import { useUserContext } from "../../../context/UserContext";
// import { useEffect } from "react";

const ServicingPage = () => {
  // const navigate = useNavigate();
  // const { hasPermission } = useUserContext();

  // useEffect(() => {
  //   if (!hasPermission("maintenance/view_servicing")) {
  //       navigate("/germs/");
  //   }
  // }, [hasPermission, navigate]);

  // if (!hasPermission("maintenance/view_servicing")) {
    return (
      <div>
        <Service/>
      </div>
    )
  // }else{
  //   // navigate("/germs/");
  // }
}

export default ServicingPage;