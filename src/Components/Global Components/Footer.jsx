import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../Images/Navbar/logo.png';
import { ImLocation } from 'react-icons/im';
import { HiPhone } from 'react-icons/hi';
import { GoGlobe } from 'react-icons/go';
import { IoMdMail } from 'react-icons/io';
import facebook from '../../Images/Footer/facebook.svg';
import twitter from '../../Images/Footer/twitter.svg';
import linkedin from '../../Images/Footer/linkedin.svg';
import instagram from '../../Images/Footer/instagram.svg';
import pinterest from '../../Images/Footer/pinterest.svg';
import bc from '../../Images/Footer/Betalingsopties/bc.png';
import kbc from '../../Images/Footer/Betalingsopties/kbc.png';
import mc from '../../Images/Footer/Betalingsopties/mc.png';
import visa from '../../Images/Footer/Betalingsopties/visa.png';
import Boogjes from '../Landingspage/Boogjes';
import { useTranslation } from 'react-i18next';

const betaalmethoden = [
	{
		src: bc,
		name: "Bancontact",
	},
	{
		src: kbc,
		name: "KBC",
	},
	{
		src: mc,
		name: "Mastercard",
	},
	{
		src: visa,
		name: "Visa",
	},
]

const Footer = (props) => {
	const {t} = useTranslation();
	return (
		<>			
		<Boogjes extra={props.kleur?props.kleur:"bg-webwit"} />
			<div className='grid grid-flow-row md:grid-cols-3 grid-cols-2 h-48 bg-webwit text-webdonkergrijs pt-3'>
				<div className="hidden md:block">
					<div className='mx-12 flex flex-row'>
						<img
							src={logo}
							alt='Logo'
							className='h-10 pt-1'
							draggable='false'
						/>
						<p className='text-xl pt-2 pl-1 font-bold unselectable'>Hoyspain</p>
					</div>
					<div className="mx-12 mt-12">
						<h4 className='text-md my-3 font-bold'>{t('footer.left.title')}</h4>
						<p className='text-sm'>{t('footer.left.subtitle1')} <NavLink to='/hulp' className='text-weboranje'> {t('footer.left.subtitle2')} </NavLink>
						{t('footer.left.subtitle3')}
							<a
								href='mailto:email@example.com'
								className='text-weboranje'> {t('footer.left.subtitle4')}</a>
							.
						</p>
					</div>
				</div>
				<div className="col-span-2 md:col-span-1">
					<p className='text-lg font-bold mt-4 text-center'>
					{t('footer.middle.title1')}
					</p>
					<div className='flex flex-row justify-center gap-6 text-sm mt-2'>
						<a href='https://facebook.com/' target='_blank' rel="noreferrer">
							<img
								src={facebook}
								alt='facebook'
								className='w-8 h-8'
							/>
						</a>
						<a href='https://twitter.com/' target='_blank' rel="noreferrer">
							<img
								src={twitter}
								alt='twitter'
								className='w-8 h-8'
							/>
						</a>
						<a href='https://linkedin.com/' target='_blank' rel="noreferrer">
							<img
								src={linkedin}
								alt='linkedin'
								className='w-8 h-8'
							/>
						</a>
						<a href='https://instagram.com/' target='_blank' rel="noreferrer">
							<img
								src={instagram}
								alt='instagram'
								className='w-8 h-8'
							/>
						</a>
						<a href='https://pinterest.com/' target='_blank' rel="noreferrer">
							<img
								src={pinterest}
								alt='pinterest'
								className='w-8 h-8'
							/>
						</a>
					</div>
					<p className="text-lg font-bold mt-4 mb-2 text-center">{t('footer.middle.title2')}</p>
					<div className="flex flex-row justify-center mx-auto gap-3 w-fit py-2 px-3 rounded-lg bg-webwit shadow-weblichtgrijs shadow-md ">
						{
							betaalmethoden.map((photo, index) => {
								return (
									<img src={photo.src} key={index} alt={photo.name} draggable="false" className="w-12 bg-gradient-to-br from-webwit to-weblichtgrijs shadow-webwit shadow-sm py-1 px-2 rounded-md" />
								);
							})
						}
					</div>
				</div>
				<div className='md:block hidden'>
					<h4 className='text-lg my-4 font-bold'>{t('footer.right.title')}</h4>
					<div className='mb-4'>
						<ImLocation className='inline' size='20' />
						{t('footer.right.address')}
					</div>
					<div className='mb-4'>
						<HiPhone className='inline' size='20' />
						{t('footer.right.tel')}
					</div>
					<div className='mb-4'>
						<IoMdMail className='inline' size='20' />
						{t('footer.right.email')}
					</div>

					<div className='mb-4'><GoGlobe className='inline' size='20' /> {t('footer.right.site')}</div>
				</div>
			</div>
			{
				window.innerWidth < 1000 && (
					<>
						<div className='col-span-2 text-center'>
							<h4 className='text-lg mt-4 mb-1 font-bold'>{t('footer.right.title')}</h4>
							<div className=''>
								<IoMdMail className='inline-block' size='20' />
								{t('footer.right.email')}
								<br />
								<HiPhone className='inline-block' size='20' />
								{t('footer.right.tel')}
							</div>
						</div>
					</>
				)
			}
			<div className='bg-white text-webdonkergrijs text-sm pt-7 pb-1 m-auto text-center'>
				<div className="w-10/12 border-webgrijs border-b-[1px] mx-auto bg-white pt-4 mb-2" />
				{t('footer.bottom.rechten')} <br />
				<div className='text-lg inline'>
				{t('footer.bottom.design')} <p className='inline text-weboranje'>LowReal</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
