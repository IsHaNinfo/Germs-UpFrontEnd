
import { useNavigate } from 'react-router';
import Reports from '../../components/reports/reportsPage'
import { useUserContext } from '../../context/UserContext';

const reports = () => {
  const navigate = useNavigate();
  const { hasPermission } = useUserContext();

  if (hasPermission("reports-view_in_sidebar")) {
    return (
      <div>
        <Reports/>
      </div>
    );
  }else{
    navigate("/germs/");
  }
}

export default reports