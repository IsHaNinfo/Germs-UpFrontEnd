
import { useNavigate } from 'react-router';
import MtOperations from '../../components/MtOperations/mtOperationsPage'
import { useUserContext } from '../../context/UserContext';

const mtOperations = () => {
  const navigate = useNavigate();
  const { hasPermission } = useUserContext();

  if (hasPermission("mt-operations/view_in_sidebar")) {
    return (
      <div>
        <MtOperations/>
      </div>
    );
  }else{
    navigate("/germs/");
  }
}

export default mtOperations