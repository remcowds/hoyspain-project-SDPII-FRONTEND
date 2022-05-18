import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import Title from '../Components/Extra components/Title';
import Footer from '../Components/Global Components/Footer';
import NavBar from '../Components/Global Components/NavBar';
import {BsShield} from 'react-icons/bs';
import { AuthContext, useSession } from '../contexts/AuthProvider';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { FaRegStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const HomeOwner = () => {
	const { user } = useSession();

	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [showUser, setShowUser] = useState(false);
  const {t} = useTranslation();
	const { getAlleUsers, loading} = useContext(AuthContext);
  const displayThisUser = useCallback((user) => {
    setShowUser(true);
    setCurrentUser(user);
  },[])

  const removeDisplay = useCallback(() => {
    setShowUser(false);
  },[])

	const ref = useDetectClickOutside({ onTriggered: removeDisplay });

	useEffect(() => {
		const get = async () => {
      let gebruikers = await getAlleUsers();
      gebruikers = gebruikers.data.filter(user => user.role === 'owner' || user.role === 'admin');
			setUsers(gebruikers);
		};
		get();
	}, [getAlleUsers]);


	return (
		<>
			<Title title={t('titel.ownerhome')} description='Beheerderspagina' />
			<NavBar selected='1' />
      <div className='bg-red-100'>
        <h2 className='text-center text-4xl pt-8'>{t('navbar.login.welcome')} {user.voornaam}</h2>
        <h2 className=' text-center text-3xl pt-8 font-bold text-weboranje'>{t('advertentiepagina.filters.woning.overzicht')}</h2>
        <section className='pb-10 pt-4'>
          {loading? <p className="mx-auto text-center">{t('ownerhome.loading')}</p> :
            <table className='text-center mx-auto text-lg rounded-lg overflow-hidden' ref={ref}>
              <tbody>
                {users.sort((function(a,b){return a.role<b.role?1:a.role>b.role?-1:a.achternaam>b.achternaam?1:a.achternaam<b.achternaam?-1:0})).map(user => (

                    <tr className="rounded-lg even:bg-white odd:bg-white border-2 border-red-100" key={user.userID} onMouseEnter={() => displayThisUser(user)} >
                      <td className="p-1 px-2">{user.voornaam}</td>
                      <td className="p-1 px-2">{user.achternaam}</td>
                      <td>{user.role === "admin"? <BsShield className="mx-2 text-weboranje" size="20"/> : <FaRegStar className="mx-2 text-webrood" size="20"/>}</td>
                      {
                      showUser && user.userID === currentUser.userID &&
                      <>
                        <td className="absolute mb-12">
                        <FadeIn>
                          <div className="bg-white rounded-lg min-w-fit p-3">
                            <p className="text-weboranje text-lg -mb-2 px-20">{currentUser.voornaam} {currentUser.achternaam}</p>
                            <p className="pb-2">{currentUser.role==="admin"?t('rollen.admin'):currentUser.role==="owner"?t('rollen.beheerder'):""}</p>
                            <p className="underline text-webgrijs">{t('ownerhome.email')}</p>
                            <p>{currentUser.emailAdres}</p>
                            <br />
                            <p className="underline text-webgrijs">{t('ownerhome.tel')}</p>
                            <p>{currentUser.telefoonnummer}</p>
                          </div>
                        </FadeIn>
                        </td>
                      </>
                      }
                    </tr>

                ))}
              </tbody>
            </table>
          }
          <div className="w-20 h-48"></div>
        </section>
        
      </div>
			<Footer kleur='bg-red-100' />
		</>
	);
};

export default HomeOwner;
