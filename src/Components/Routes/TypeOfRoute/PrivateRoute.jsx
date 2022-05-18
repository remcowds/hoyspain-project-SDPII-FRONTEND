import { useContext, useMemo } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useSession } from '../../../contexts/AuthProvider';
import { VerhuurderContext } from '../../../contexts/VerhuurderProvider';

export default function PrivateRoute({ children, role, moetVerhuurderZijn, link, ...rest }) {
  const { isAuthed, hasRole } = useSession();
  
  const canShowRoute = useMemo(() => {
    if (!role) return isAuthed;
    return isAuthed && hasRole(role);
  }, [isAuthed, role, hasRole]);

  return canShowRoute ? <Outlet /> : <Navigate to={link?link:"/register"} />;
}