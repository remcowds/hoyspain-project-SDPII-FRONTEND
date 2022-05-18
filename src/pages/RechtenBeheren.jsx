import React, { useCallback, useContext, useEffect, useState } from 'react';
import Title from '../Components/Extra components/Title';
import Footer from '../Components/Global Components/Footer';
import NavBar from '../Components/Global Components/NavBar';
import {FaRegStar} from 'react-icons/fa';
import { BsShield, BsPerson } from 'react-icons/bs';
import { AuthContext, useSession } from '../contexts/AuthProvider';
import FillInData from '../Components/BeheerderPage/RechtenBeheer/FillInData';
import ZwarteDisplay from '../Components/BeheerderPage/RechtenBeheer/ZwarteDisplay';
import { useTranslation } from 'react-i18next';


const RechtenBeheren = () => {
	const { user } = useSession();

	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");
	const [displayTheUser, setDisplayTheUser] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [currentNr, setCurrentNr] = useState(2);

	const { loading, alleUsers } = useContext(AuthContext);



  
  const veranderSorteerMethode = useCallback(async(nr) => {
    setCurrentNr(nr);
    const d = alleUsers;
    let gebruikers = d.data;
    if (nr === 1) {
      setUsers(users.sort(function (a, b) {return a.voornaam > b.voornaam? 1 : a.voornaam < b.voornaam? -1 : 0}));
      setAllUsers(gebruikers.sort(function (a, b) {return a.voornaam > b.voornaam? 1 : a.voornaam < b.voornaam? -1 : 0}));
    } else if (nr === 2) {
      setUsers(users.sort(function (a, b) {return a.achternaam > b.achternaam? 1 : a.achternaam < b.achternaam? -1 : 0}));
      setAllUsers(gebruikers.sort(function (a, b) {return a.achternaam > b.achternaam? 1 : a.achternaam < b.achternaam? -1 : 0}));
    } else if (nr === 3) {
      setUsers(users.sort(function (a, b) {
        if (a.role ==="[\"user\"]") {
          a.role = "user";
        }
        if (b.role ==="[\"user\"]") {
          b.role = "user";
        }
        return a.role==="owner"? -1 : b.role==="owner"? 1: a.role > b.role? 1 : a.role < b.role? -1 : 0}));
      setAllUsers(gebruikers.sort(function (a, b) {return a.role==="owner"? -1 : b.role==="owner"? 1: a.role > b.role? 1 : a.role < b.role? -1 : 0}));
    }
  }, [alleUsers, users]);

	useEffect(() => {
    let gebruikers = alleUsers;
    gebruikers = gebruikers.data
    veranderSorteerMethode(currentNr);
    const searchValue = document.getElementById('searchbar').value.toLowerCase();
    if (searchValue !== "") {
      gebruikers = gebruikers.filter(u => u.achternaam.toLowerCase().includes(searchValue) || u.voornaam.toLowerCase().includes(searchValue))
    }
    setAllUsers(gebruikers);
    setUsers(gebruikers);
	}, [alleUsers, veranderSorteerMethode, currentNr]);
  
  const displayUsers = useCallback(async(user) => {
    setCurrentUser(user);
    setDisplayTheUser(true);
  }, [])
  
  const reloadTheUsers = useCallback(async(user) => {
    let gebruikers = alleUsers;
    setAllUsers(gebruikers);
    veranderSorteerMethode(currentNr)
    setUsers(gebruikers);
  }, [alleUsers, currentNr, veranderSorteerMethode])

  const closeDisplay = useCallback(async() => {
    setDisplayTheUser(false);
    veranderSorteerMethode(currentNr);
  }, [currentNr, veranderSorteerMethode])

  const filterUsers = useCallback(async(naam) => {
    setUsers(users.filter(u => u.achternaam.includes(naam) || u.voornaam.includes(naam)));
  }, [users])

  const {t} = useTranslation();

	return (
		<>
			<Title title={t('titel.rights')} description='Beheerderspagina' />
			<NavBar selected='4' />
      {
        displayTheUser &&(
          <ZwarteDisplay sluitFunctie={closeDisplay} user={currentUser} reload={reloadTheUsers}/>
        )
      }
      <div className='bg-red-100'>
        <h2 className=' text-center text-3xl pt-8 font-bold text-weboranje'>{t('rights.title')}</h2>
        <div className='flex flex-row justify-center'>
        <input type="search" name="" id="searchbar" placeholder={t('rights.search')} className="px-2 py-1 mt-12 mr-3 rounded-md h-10 focus:outline-none focus:border-weboranje border-2 border-weblichtgrijs focus:bg-orange-50 " onChange={(e) => filterUsers(e.target.value)}/>

        <section className='pt-4 h-96 overflow-y-scroll'>
          {
          loading ?
          <>
            <table className='text-center text-lg rounded-lg overflow-hidden w-72 mx-5'>
              <thead>
                <tr className="odd:bg-weblichtgrijs">
                  <td><button className={currentNr===1?"text-white":""} onClick={() => veranderSorteerMethode(1)}>{t('rights.naam')}</button></td>
                  <td><button className={currentNr===2?"text-white":""} onClick={() => veranderSorteerMethode(2)}>{t('rights.anaam')}</button></td>
                  <td><button className={currentNr===3?"text-white":""} onClick={() => veranderSorteerMethode(3)}>{t('rights.rol')}</button></td>
                </tr>
              </thead>
              <tbody className="text-webwit">
              <FillInData/>
              </tbody>
            </table>
          </>
          :
          <>
            <table className='text-center text-lg rounded-lg overflow-hidden w-72 mx-5'>
              <thead>
                <tr className="odd:bg-weblichtgrijs">
                  <td><button className={currentNr===1?"text-white":"hover:text-webgrijs"} onClick={() => veranderSorteerMethode(1)}>{t('rights.naam')}</button></td>
                  <td><button className={currentNr===2?"text-white":"hover:text-webgrijs"} onClick={() => veranderSorteerMethode(2)}>{t('rights.anaam')}</button></td>
                  <td><button className={currentNr===3?"text-white":"hover:text-webgrijs"} onClick={() => veranderSorteerMethode(3)}>{t('rights.rol')}</button></td>
                </tr>
              </thead>
              <tbody className="">
                {
                users.map(user => (
                    <tr className="group rounded-lg even:bg-white odd:bg-white border-2 border-red-100 cursor-pointer" key={user.userID} onClick={() => displayUsers(user)} >
                      <td className="p-1 px-2 group-hover:text-weboranje">{user.voornaam}</td>
                      <td className="p-1 px-2 group-hover:text-weboranje">{user.achternaam}</td>
                      <td>{user.role === "admin"? <BsShield className="mx-2 text-weboranje group-hover:text-orange-400" size="20"/> : user.role === "owner"?<FaRegStar className="mx-2 text-webrood group-hover:text-red-400" size="20"/>:<BsPerson className="mx-2 text-weblichtgroen group-hover:text-green-600" size="20"/>}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </>
          }

        </section>
        </div>
      </div>
			<Footer kleur='bg-red-100' />
		</>
	);
};

export default RechtenBeheren;
