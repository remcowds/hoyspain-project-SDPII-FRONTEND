import { useContext, useMemo } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useSession } from '../../../contexts/AuthProvider';
import { VerhuurderContext } from '../../../contexts/VerhuurderProvider';

export default function PrivateRoute({ children, role, moetVerhuurderZijn, link, ...rest }) {
  const { isAuthed, hasRole } = useSession();
	const { isVerhuurder } = useContext(VerhuurderContext);
  const canShowRoute = useMemo(() => {
    if (!role) return isAuthed;
    return isAuthed && hasRole(role);
  }, [isAuthed, role, hasRole]);

  const isDezeVerhuurder = useMemo(() => {
    return isVerhuurder;
  }, [isVerhuurder]);

  return canShowRoute&&!isDezeVerhuurder ? <Outlet /> : <Navigate to={link?link:"/"} />;
}