import React, { useCallback } from 'react'
import { GrClose, GrUserAdmin } from 'react-icons/gr'
import { BsFillShieldFill, BsPencilFill } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import FadeIn from 'react-fade-in';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useVerwijderUser, useVeranderRol, useSession } from '../../../contexts/AuthProvider';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';


const ZwarteDisplay = ({sluitFunctie, user, reload}) => {
  const {t} = useTranslation();

  const opties = [{label:t('rollen.admin'), value:"admin"}, {label:t('rollen.gebruiker'), value:"gebruiker"}]
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [nieuweRol, setNieuweRol] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const verwijderUser = useVerwijderUser();
  const wijzigRol = useVeranderRol();
  const { token } = useSession();
  const handleToggle = useCallback(() => {
    setEditorOpen(!editorOpen);
    if (editorOpen === false)
      setUserRole(user.role==="admin"?"admin":"gebruiker");
      setNieuweRol(user.role==="admin"?"admin":"gebruiker");
  },[editorOpen, user]);
  
  const veranderUserRoles = useCallback(async() => {
    reload();
      await wijzigRol({rol:nieuweRol, userID:user.userID, token})
      sluitFunctie();
  },[nieuweRol, user, wijzigRol, token, sluitFunctie, reload]);

  const changeUserRole = useCallback((nieuweRol) => {
    setNieuweRol(nieuweRol);
  },[]);

  const tryDeleteUser = useCallback(() => {
    setDeleteOpen(!deleteOpen);
  },[deleteOpen]);
  
  const confirmDeleteUser = useCallback(async(user) => {
    sluitFunctie();
    let verwijder = await verwijderUser(user);
    if (verwijder === true)
    {
    toast.success(`${user.voornaam} ${user.achternaam} verwijdert.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      pauseOnFocusLoss:false,
      autoClose:2000,
      });
      reload();
    }
    else
      toast.error("Verwijderen gefaald", {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      
    });
    },[sluitFunctie, verwijderUser, reload]);


  return (
    <>
      { !deleteOpen&&
      <>
      <div className="fixed overflow-hidden top-1/2 -translate-y-1/2 z-[61] text-center text-xl left-1/2 -translate-x-1/2">
        <FadeIn>
          <div className="bg-white rounded-xl mx-auto w-fit p-5 relative">
          <button className="bg-red-500 p-2 rounded-md absolute top-3 right-3 hover:bg-red-400" onClick={sluitFunctie}><GrClose size="20"/></button>
          {editorOpen && <button className="p-2 rounded-md absolute top-3 left-3 border-red-500 border-[2px] hover:border-black text-red-500 hover:text-black" onClick={tryDeleteUser}><RiDeleteBin6Line size="20"/></button>}
          <button className="invisible"><GrClose size="28"/></button>
            <p className="px-5">{t('rights.naam')}: {user.voornaam} {user.achternaam}</p>
            <br />
            <p>{t('rights.email')}: {user.emailAdres}</p>
            <br />

            {editorOpen && user.role !== 'owner'? 
              <>
              <p className="inline-block pr-3 pb-3">{t('rights.rights')}:</p>
                <Select
                  className="basic-single w-40 h-8 inline-block text-md"
                  classNamePrefix="select"
                  defaultValue={opties[opties.map(op => op.value).indexOf(userRole)]}
                  isSearchable={false}
                  placeholder={userRole}
                  name="rol"
                  options={opties}
                  onChange={(e) => changeUserRole(e.value)}
                />
                <br />
                <br />
                <br />
                <br />
              </>
              :
              <p>{t('rights.rights')}: {user.role==="admin"?"Admin":user.role==="owner"?t('rollen.beheerder'):t('rollen.gebruiker')}</p>
          }

            <br />
            {!editorOpen && user.role !== 'owner' && <button className="bg-green-500 hover:bg-green-400 p-2 rounded-md inline-block" onClick={handleToggle}><BsPencilFill size="28"/></button>}
            {editorOpen && user.role !== 'owner' && 
            <>
              <div className="flex flex-row justify-between">
                <button className="bg-red-500 hover:bg-red-400 p-2 rounded-md" onClick={handleToggle}>{t('account.cancel')}</button>
                <button className="bg-green-500 hover:bg-green-400 p-2 rounded-md" onClick={veranderUserRoles}>{t('account.confirm')}</button>
              </div>
            </>}

          </div>
        </FadeIn>
      </div>
      </>}
      { deleteOpen&&
      <>
      <div className="fixed overflow-hidden top-1/2 -translate-y-1/2 z-[61] text-center text-xl left-1/2 -translate-x-1/2">
        <FadeIn>
          <div className="bg-white rounded-xl mx-auto w-fit p-5 relative text-center">

            <p className="px-5">{t('rights.confirmdel')}</p>
            <br />
            <p className="text-2xl text-red-600">{user.voornaam} {user.achternaam}</p>
            <br />
            <p className="text-center">{user.role==="admin"?t('rollen.admin'):user.role==="owner"?t('rollen.beheerder'):t('rollen.gebruiker')}{user.role === "admin"? <BsFillShieldFill className="mx-2 text-weboranje inline" size="20"/> : user.role === "owner"?<GrUserAdmin className="ml-3 mr-1 inline" size="20"/>:<FaUser className="mx-2 inline text-weblichtgroen" size="20"/>}</p>
            <br />
 
              <div className="flex flex-row justify-between">
                <button className="border-[2px] border-black hover:border-gray-500 hover:text-gray-500 p-2 rounded-md" onClick={tryDeleteUser}>{t('rights.cancel')}</button>
                <button className="border-[2px] bg-red-500 hover:bg-red-400 p-2 rounded-md text-white" onClick={() => confirmDeleteUser(user)}>{t('rights.del')}</button>
              </div>


          </div>
        </FadeIn>
      </div>
      </>}
      <div className="w-screen h-screen bg-black fixed overflow-hidden top-0 z-[60] opacity-40" onClick={sluitFunctie}></div>

    </>
  )
}

export default ZwarteDisplay