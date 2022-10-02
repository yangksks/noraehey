import { Navigate, Outlet } from 'react-router-dom';

const TagVoiceProtection = () => {
  const loggedData = sessionStorage.getItem('accessToken');

  if (!loggedData) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet></Outlet>;
  }
};

export default TagVoiceProtection;
