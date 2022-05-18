import { useContext, useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';
import { VerhuurderContext } from '../../../contexts/VerhuurderProvider';

import { useSession } from '../../../contexts/AuthProvider';

export default function EnkelHuurderRoute({ children, role, link, extraComponent, ...rest }) {
	const { isVerhuurder } = useContext(VerhuurderContext);
  const { hasRole } = useSession();
  const isDezeVerhuurder = useMemo(() => {    
    return isVerhuurder || hasRole('admin') || hasRole('owner');
  }, [isVerhuurder, hasRole]);

  return isDezeVerhuurder  ? <Outlet/>:<Navigate to={link?link:"/"} />};