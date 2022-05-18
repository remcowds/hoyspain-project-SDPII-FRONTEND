import React, { useCallback, useContext } from 'react';
import NavElement from '../../Extra components/NavElement';
import { GiHouse } from 'react-icons/gi';
import { IoIosBed } from 'react-icons/io';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import { useTranslation } from 'react-i18next';

const HuurderComponenten = (props) => {
	const { setcurrentInfoWoning, setIsWijzigen } =
		useContext(CurrentWoningContext);
	const handleClickPlaatsNieuw = useCallback(() => {
		setcurrentInfoWoning({});
		setIsWijzigen(false);
	}, [setcurrentInfoWoning, setIsWijzigen]);
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
					text={t('navbar.woningen')}
					to='/'
					page='1'
					selected={props.selected}
				/>
				<NavElement
					onClick={handleClickPlaatsNieuw}
					icon={<IoIosBed size='28' />}
					text={t('navbar.advertentie_plaatsen')}
					to='/plaatsadvertentie'
					page='2'
					selected={props.selected}
				/>
			</div>
		</>
	);
};

export default HuurderComponenten;
