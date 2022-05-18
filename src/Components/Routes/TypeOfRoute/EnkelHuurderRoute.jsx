import { useContext, useMemo } from 'react';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';
import { VerhuurderContext } from '../../../contexts/VerhuurderProvider';

export default function EnkelHuurderRoute({ children, role, link, extraComponent, ...rest }) {
	const { isVerhuurder } = useContext(VerhuurderContext);  
  const isDezeVerhuurder = useMemo(() => {
    return isVerhuurder;
  }, [isVerhuurder]);

  

  return !isDezeVerhuurder ? <Outlet/>:<Navigate to={link?link:"/"} />};