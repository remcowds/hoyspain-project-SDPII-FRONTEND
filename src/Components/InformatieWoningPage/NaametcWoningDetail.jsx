import { GoArrowLeft } from 'react-icons/go';
import { AiFillStar } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function NaametcWoningDetail({ woning }) {
	const { naamWoning, rating, regio } = woning;

	const navigate = useNavigate();


	const {t} = useTranslation();

	const handleGoBack = useCallback(() => {
		navigate('/huren');
	}, [navigate]);

	return (
		<section className='mt-10 mx-auto px-6'>
			<div className='flex'>
				<GoArrowLeft
					size='35'
					className='text-weboranje mr-2 cursor-pointer'
					onClick={handleGoBack}
				/>
				<div className='flex flex-col gap-y-2'>
					<h1 className='text-2xl font-bold'>{naamWoning}</h1>
					<div className='flex items-center gap-x-2'>
						<div className='flex items-center bg-weboranje rounded-sm px-1 py-[2px] mr-1 text-white'>
							<AiFillStar size='20' className='pr-1' />
							<span className='text-sm pr-1'>
								{rating || '-'}
							</span>
						</div>
						<a href='#recensies' className='text-sm font-semibold underline '>
						{t('informatieWoning.recensies.reviews')}
						</a>
					</div>
					<div className='flex items-center'>
						<ImLocation
							size='21'
							className='text-weboranje p-1 mr-2 bg-weboranje rounded-full bg-opacity-40'
						/>
						<p>{regio}</p>
					</div>
				</div>
				<a
					href='#startBoeken'
					className='ml-auto mr-2 my-auto p-2 text-white bg-weboranje rounded-lg'>
					{t('informatieWoning.btnboeken')}
				</a>
			</div>
		</section>
	);
}
