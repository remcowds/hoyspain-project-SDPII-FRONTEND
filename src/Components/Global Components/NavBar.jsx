import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { BiMenu, BiMenuAltRight } from 'react-icons/bi';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { FaUser } from 'react-icons/fa';

import logo from '../../Images/Navbar/logo.png';
import FadeIn from 'react-fade-in';
import ProfileOptions from './NavBar/ProfileOptions';
import ProfileOptionsRegister from './NavBar/ProfileOptionsRegister';
import { VerhuurderContext } from '../../contexts/VerhuurderProvider';
import HuurderComponenten from './NavBar/HuurderComponenten';
import VerhuurderComponenten from './NavBar/VerhuurderComponenten';
import { AuthContext } from '../../contexts/AuthProvider';
import AdminComponenten from './NavBar/AdminComponenten';
import i18n from '../../i18n';
import nederlandsVlag from '../../Images/Talen/nl.png';
import engelsVlag from '../../Images/Talen/en.png';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const NavBar = (props) => {
	const {hasRole} = useContext(AuthContext)
	const { isVerhuurder } = useContext(VerhuurderContext);
	const [wobble, setWobble] = React.useState(0);
	const [fadeIn, setFadeIn] = React.useState(0);
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [taalOpen, setTaalOpen] = React.useState(false);
	const lngs = {
		nl: { nativeName: 'Nederlands', link: nederlandsVlag },
		en: { nativeName: 'English', link: engelsVlag  }
	};
	const [lng, setLng] = useState(i18n.language?i18n.language.substring(0,2):'en');
	const { t } = useTranslation();
	const handleChangeLanguage = useCallback((ln) => {
		if (!(ln === lng))
		{
			i18n.changeLanguage(ln);
			setLng(ln);
			toast.success(`${lngs[ln].nativeName} ${t('navbar.language_setup')}`, {
				position: toast.POSITION.BOTTOM_RIGHT,
				pauseOnHover: false,
				pauseOnFocusLoss:false,
				autoClose:2000,
			});
		}
		setTaalOpen(false);
	}, [t, lng]);



	const [profileOpen, setProfileOpen] = useState(false);
	
	const handleToggle = useCallback(() => {
		setTaalOpen(false);
		setProfileOpen(!profileOpen);
	}, [profileOpen]);

	const closeDropdown = useCallback(() => {
		setProfileOpen(false);
		setTaalOpen(false);
	}, []);


	const clickedMenu = useCallback(() => {
		setFadeIn(0);
		setWobble(1);
		setMenuOpen(!menuOpen);
		setTimeout(function () {
			setFadeIn(1);
			setWobble(0);
		}, 900);
	}, [menuOpen]);
	
	const taalMenuClicked = useCallback(() => {
		setTaalOpen(!taalOpen);
		setProfileOpen(false);
	}, [taalOpen]);

	const ref = useDetectClickOutside({ onTriggered: closeDropdown });
	return (
		<>
			<div className='fixed bg-white flex top-0 left-0 justify-evenly w-screen m-0 z-50 shadow-lg pb-2 h-14'>
				<div
					id='rechts'
					className='flex flex-row text-md pl-2 z-20 py-2'>
					{/*Width moet hetzelfde zijn als tweede*/}
					<div className='fixed top-0 left-0 pl-2 py-2'>
						<NavLink to='/' className='flex items-center'>
							<img
								src={logo}
								alt='Logo'
								className='h-10'
								draggable='false'
							/>
							<p className='text-xl text-webgrijs font-bold unselectable'>
								Hoyspain
							</p>
							
							{hasRole("admin") && (<p className='absolute left-full text-sm mt-5 text-weboranje unselectable'>{t('rollen.admin')}</p>)}
							{hasRole("owner") && (<p className='absolute left-full text-sm mt-5 text-weboranje unselectable'>{t('rollen.beheerder')}</p>)}
						</NavLink>
					</div>
				</div>

				{hasRole("owner") &&(
				<AdminComponenten menuOpen={menuOpen} selected={props.selected} />
				)}

				{!hasRole("owner") && !isVerhuurder &&(
				<HuurderComponenten menuOpen={menuOpen} selected={props.selected} />
				)}

				{!hasRole("owner") && isVerhuurder &&(
				<VerhuurderComponenten menuOpen={menuOpen} selected={props.selected} />
				)}

				<div
					id='rechterkant'
					className='fixed right-0 md:block hidden'
					ref={ref}>
					{/*Width moet hetzelfde zijn als eerste*/}
					<div className='flex flex-col absolute top-1 -left-36 z-50 bg-webwit rounded-md p-2 justify-center w-20'>
						<button type="submit" onClick={taalMenuClicked}>
							<img src={lngs[lng].link} alt="" className="w-12 h-8 rounded-md mx-auto"/>
            </button>
							{taalOpen && Object.keys(lngs).map((lng) => (
							<FadeIn key={lng}>
								<button type="submit" onClick={() => handleChangeLanguage(lng)}>
									<img src={lngs[lng].link} alt="" className="w-16 h-10 rounded-md mt-3"/>
								</button>
							</FadeIn>
							))}

        	</div>
					<FaUser
						size='40'
						className={`absolute right-3 top-2 rounded-full cursor-pointer duration-200 ${
							profileOpen === true
								? 'p-2 border-b-2 border-weboranje text-weblichtgrijs'
								: 'p-1 text-webgrijs'
						}`}
						onClick={handleToggle}
					/>
					{/*<FaUserTie size="40" className="absolute right-3 top-2 rounded-full cursor-pointer/>*/}
					{/*<FaUserTie size="60"/>*/}
					
					{profileOpen && props.selected!=="99" && (
						<FadeIn>
							<ProfileOptions />
						</FadeIn>
					)}
					{profileOpen && props.selected==="99" && (
						<FadeIn>
							<ProfileOptionsRegister />
						</FadeIn>
					)}
				</div>



		

				<div className='md:hidden block'>
					{!menuOpen && (
						<BiMenu
							size='40'
							wobble={wobble}
							fadein={fadeIn}
							className='fixed right-2 top-2 image hover:cursor-pointer'
							onClick={clickedMenu}
							onAnimationEnd={() => setWobble(0)}
						/>
					)}
					{menuOpen && (
						<BiMenuAltRight
							size='40'
							wobble={wobble}
							fadein={fadeIn}
							className='fixed right-2 top-2 image hover:cursor-pointer'
							onClick={clickedMenu}
							onAnimationEnd={() => setWobble(0)}
						/>
					)}
					{menuOpen && 
					<div
					id='rechterkant'
					className='fixed right-0 block'
					ref={ref}>

					{ !profileOpen && <div className='flex flex-col absolute top-28 -left-20 z-50 bg-webwit rounded-md p-2 justify-center w-20'>
						<button type="submit" onClick={taalMenuClicked}>
							<img src={lngs[lng].link} alt="" className="w-12 h-8 rounded-md mx-auto"/>
            </button>
							{taalOpen && Object.keys(lngs).map((lng) => (
							<FadeIn key={lng}>
								<button type="submit" onClick={() => handleChangeLanguage(lng)}>
									<img src={lngs[lng].link} alt="" className="w-16 h-10 rounded-md mt-3"/>
								</button>
							</FadeIn>
							))}

        	</div>
					}
					<FaUser
						size='40'
						className={`absolute right-3 top-16 rounded-full cursor-pointer duration-200 ${
							profileOpen === true
								? 'p-2 border-b-2 border-weboranje text-weblichtgrijs'
								: 'p-1 text-webgrijs'
						}`}
						onClick={handleToggle}
					/>
					{/*<FaUserTie size="40" className="absolute right-3 top-2 rounded-full cursor-pointer/>*/}
					{/*<FaUserTie size="60"/>*/}
					{profileOpen && props.selected!=="99" && (
						<FadeIn>
							<ProfileOptions />
						</FadeIn>
					)}
					{profileOpen && props.selected==="99" && (
						<FadeIn>
							<ProfileOptionsRegister />
						</FadeIn>
					)}
				</div>
					}
				</div>
			</div>
			<div className='pt-[54px]' />
		</>
	);
};

export default NavBar;
