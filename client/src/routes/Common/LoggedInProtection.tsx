import { Navigate, Outlet } from 'react-router-dom';

const LoggedInProtection = () => {
  const loggedData = sessionStorage.getItem('accessToken');

  if (loggedData) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet></Outlet>;
  }
};

export default LoggedInProtection;
