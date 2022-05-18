import { useCallback, useContext, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import {
	formatDateDMY,
	sort2DArrayDates,
	sortPrijsObjectArrayDates,
} from '../../../core/dateFns';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import { prijs2Decimals } from '../../../core/prijzen';
import { useTranslation } from 'react-i18next';
export default function DisplayDatesInTekst(props) {
	const {t} = useTranslation();
	const { nietBeschikbaar, handleDeleteBeschikbaarheid } = props;
	const { isPrijsAanpassingPage } = props;

	const { currentInfoWoning, setcurrentInfoWoning } =
		useContext(CurrentWoningContext);

	const [dates, setDates] = useState([]);

	useEffect(() => {
		if (!isPrijsAanpassingPage) {
			//LATER: mss ook eig die van int verleden wegfilteren
			setDates([...nietBeschikbaar].sort(sort2DArrayDates));
		} else {
			if (currentInfoWoning.prijsAanpassing) {
				setDates(
					[...currentInfoWoning.prijsAanpassing].sort(
						sortPrijsObjectArrayDates
					)
				);
			}
		}
	}, [setDates, nietBeschikbaar, currentInfoWoning, isPrijsAanpassingPage]);

	const deleteaanpassing = useCallback(
		(dates) => {
			if (!isPrijsAanpassingPage) {
				handleDeleteBeschikbaarheid(dates);
			} else {
				setcurrentInfoWoning({
					...currentInfoWoning,
					prijsAanpassing: currentInfoWoning.prijsAanpassing?.filter(
						(o) => o.data !== dates
					),
				});
			}
		},
		[
			handleDeleteBeschikbaarheid,
			isPrijsAanpassingPage,
			currentInfoWoning,
			setcurrentInfoWoning,
		]
	);

	if (!isPrijsAanpassingPage) {
		return (
			<>
				{dates?.length > 0 && (
					<div className='flex flex-col gap-y-2 mb-4'>
						{dates.map((dates) => (
							<div
								className='flex gap-x-4 items-center'
								key={`${dates[0]} - ${dates[1]}`}>
								<div className='flex flex-col'>
									<p>{t('adv.2.van')}</p>
									<p className='border-2 rounded-md p-1'>
										{formatDateDMY(dates[0])}
									</p>
								</div>
								<div className='flex flex-col'>
									<p>{t('adv.2.tot')}</p>
									<p className='border-2 rounded-md p-1'>
										{formatDateDMY(dates[1])}
									</p>
								</div>
								<ImCross
									className='mt-6 cursor-pointer'
									onClick={() => deleteaanpassing(dates)}
								/>
							</div>
						))}
					</div>
				)}
			</>
		);
	} else {
		return (
			<>
				{dates?.length > 0 && (
					<div className='flex flex-col gap-y-2 mb-4'>
						{dates.map((o) => (
							<div
								className='flex gap-x-4 items-center'
								key={`${o.data[0]} - ${o.data[1]}`}>
								<div className='flex flex-col'>
									<p>{`${t('adv.3.van')}*`}</p>
									<p className='border-2 rounded-md p-1'>
										{formatDateDMY(o.data[0])}
									</p>
								</div>
								<div className='flex flex-col'>
									<p>{`${t('adv.3.tot')}*`}</p>
									<p className='border-2 rounded-md p-1'>
										{formatDateDMY(o.data[1])}
									</p>
								</div>
								{isPrijsAanpassingPage && (
									<div className='flex flex-col'>
										<p>{`${t('adv.3.prijs')}*`}</p>
										<p className='border-2 rounded-md p-1'>
											{`€${prijs2Decimals(
												o.prijsPerNachtPerPersoon
											)}`}
										</p>
									</div>
								)}
								<ImCross
									className='mt-6 cursor-pointer'
									onClick={() => deleteaanpassing(o.data)}
								/>
							</div>
						))}
					</div>
				)}
			</>
		);
	}
}
