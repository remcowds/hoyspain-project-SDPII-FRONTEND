import React from 'react';
import eyecatcher from '../../Images/Landingspage/eyecatcher.png';
import { BiMapPin } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import DeForm from '../Global Components/DeForm/DeForm';
import { useTranslation } from 'react-i18next';
// import { useForm } from 'react-hook-form';

const Eyecatcher = () => {
	const { t } = useTranslation();
	// const methods = useForm();
	// const { getValues } = methods;
	// const validationRules = useMemo(
	// 	() => ({
	// 		name: {
	// 			required: true,
	// 		},
	// 		email: {
	// 			required: true,
	// 		},
	// 		password: {
	// 			required: true,
	// 		},
	// 		confirmPassword: {
	// 			required: true,
	// 			validate: {
	// 				notIdentical: (value) => {
	// 					const password = getValues('password');
	// 					return password === value
	// 						? null
	// 						: 'Both passwords need to be identical';
	// 				},
	// 			},
	// 		},
	// 	}),
	// 	[getValues]
	// );
	return (
		<>
			<img
				src={eyecatcher}
				alt='eyecatcher'
				draggable='false'
				className='w-full max-h-screen -z-10 fixed'
			/>
			<div className='md:h-[calc(100vh-20vh)] lg:h-[calc(100vh-30vh)] h-[calc(100vh-70vh)] w-full' />
			<div className='absolute top-20 md:top-32 w-full'>
				<div className='flex flex-col justify-center'>
					<p className='md:text-9xl text-6xl sm:text-7xl schuinSchrift text-white text-center unselectable w-full mb-3 md:mb-10 lg:mb-10'>
						{t('home.eyecatcher')}
					</p>
					<div className='text-center mb-10'>
						<NavLink
							to='/huren'
							className='md:hidden text-webwit bg-weboranje rounded-md p-2 hover:opacity-95 relative shadow-black hover:shadow-inner shadow-sm hover:shadow-orange-700'>
							<BiMapPin className='inline mb-1 text-lg' /> {t('home.rentnow')}
						</NavLink>
					</div>
					<DeForm
						classNameProp={
							'hidden relative md:flex flex-col bg-slate-100 bg-opacity-80 rounded-xl p-5 w-[690px] justify-around mx-auto lg:mt-10 lg:mb-8 mt-0'
						}
					/>
				</div>
			</div>
		</>
	);
};

export default Eyecatcher;
