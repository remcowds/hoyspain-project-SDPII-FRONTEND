import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { GoPencil } from 'react-icons/go';
import { toast } from 'react-toastify';
import { useSession } from '../../contexts/AuthProvider';
import EditingTabel from './EditingTabel';
import NormalTabel from './NormalTabel';

const GegevensTabel = () => {
  const { loading, isAuthed, user } = useSession();
  const [editing, setEditing] = useState(false);

  const wijzigGegevens = useCallback(() => {
    setEditing(true);
	}, []);
  const cancelWijzigenGegevens = useCallback((e) => {
    setEditing(false);
	}, []);
  const {t} = useTranslation();
  return (
  <>
      {isAuthed && !loading && user &&(
        <div className='bg-webwit h-[600px] pb-60'>
          <h2 className='text-center text-weboranje text-4xl pt-8 pb-10 font-bold xl:text-5xl'>{t('account.greeting')} {user.voornaam} {user.achternaam}</h2>
          <div className="font-bold text-webgrijs p-4 border-[1px] border-webgrijs w-fit rounded-md mx-auto flex flex-col justify-center">
          {editing && <GoPencil className="w-5 h-5 ml-auto mb-2"/>}
          {!editing && <div className="w-5 h-5 mb-2"></div>}
                {editing &&(
                  <EditingTabel user={user} onConfirmButtonHandle={cancelWijzigenGegevens} onButtonHandle={cancelWijzigenGegevens} />
                  )}
                {!editing &&(
                  <NormalTabel user={user} onButtonHandle={wijzigGegevens}/>
                  )}
 

            {
              !editing&&(
                <>
  
            {/* <button
                className="bg-webrood text-white font-bold px-5 py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors w-56 mx-auto"
              >
                Wachtwoord wijzigen
              </button> */}
              </>
              )}
              
          </div>

          
        </div>
      )}
  </>
  )
}

export default GegevensTabel