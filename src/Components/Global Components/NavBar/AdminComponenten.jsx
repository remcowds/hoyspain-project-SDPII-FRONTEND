import React from 'react'
import NavElement from '../../Extra components/NavElement';
import { GiHouse } from 'react-icons/gi';
import { GoGear } from 'react-icons/go';
import { MdCarRental } from 'react-icons/md';
import { BsHeadphones } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const AdminComponenten = (props) => {
	const { t } = useTranslation();
  return (
  <>
    <div
					id='midden'
					className={`${
						props.menuOpen ? 'flex bg-white animated-fade' : 'hidden'
					} md:bg-transparent bg-transparent fixed top-14 gap-2 md:gap-0 md:top-0 w-screen m-0 md:flex md:flex-row flex-col text-lg justify-center duration-300`}>
					<NavElement
						icon={<GiHouse size='27' />}
						text={t('navbar.home')}
						to='/'
						page='1'
						selected={props.selected}
					/>
          <NavElement
            icon={<BsHeadphones size='28' />}
						text={t('navbar.verblijven')}
            to='/huren'
            page='2'
            selected={props.selected}
          />
					<NavElement
						icon={<MdCarRental size='28' />}
						text={t('navbar.services')}
						to='/services'
						page='3'
						selected={props.selected}
					/>
					<NavElement
						icon={<GoGear size='28' />}
						text={t('navbar.rights')}
						to='/rechten'
						page='4'
						selected={props.selected}
					/>
    </div>
  </>
  )
}

export default AdminComponenten