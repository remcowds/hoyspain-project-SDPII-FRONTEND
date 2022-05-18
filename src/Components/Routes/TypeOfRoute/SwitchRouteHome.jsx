import { useContext, useMemo } from 'react';
import { Outlet } from 'react-router';
import { VerhuurderContext } from '../../../contexts/VerhuurderProvider';
import { AuthContext } from '../../../contexts/AuthProvider';
import HomeVerhuurder from '../../../pages/HomeVerhuurder';
import HomeOwner from '../../../pages/HomeOwner';

export default function SwitchRoute({ children, role, link, extraComponent, ...rest }) {
	const {hasRole} = useContext(AuthContext)
  const { isVerhuurder } = useContext(VerhuurderContext);
  const isDezeVerhuurder = useMemo(() => {
    return isVerhuurder;
  }, [isVerhuurder]);
  
  if (hasRole("owner"))
  {
    return <HomeOwner/>
  }



  return isDezeVerhuurder ? <HomeVerhuurder/>:<Outlet />};