import PrijsInstellenLabelInput from './PrijsInstellenLabelInput';
import PrijsInstellenKortingMinimum from './PrijsInstellenKortingMinimum';
import PrijsInstellenExtraKosten from './BijkomendeKosten/PrijsInstellenExtraKosten';
import DisplayDates from '../Datums/DisplayDates';
import { useContext } from 'react';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import { useTranslation } from 'react-i18next';

export default function PrijsInstellenVelden(props) {
	const { register, setExtraKosten, extraKosten } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);
	const {t} = useTranslation();
	return (
		<div className='m-4'>
			<div className='flex gap-x-10 mb-4'>
				<PrijsInstellenLabelInput
					register={register}
					label={`${t('adv.3.title')}*`}
					inputID='prijsPerNachtPerPersoon'
					DV={currentInfoWoning?.prijsPerNachtPerPersoon}
				/>
				<PrijsInstellenLabelInput
					register={register}
					label={`${t('adv.3.waarborg')}*`}
					inputID='waarborg'
					DV={currentInfoWoning?.waarborg}
				/>
			</div>
			<div className='mb-4'>
				<DisplayDates isPrijsAanpassingPage={true} />
			</div>
			<PrijsInstellenKortingMinimum register={register} />
			<PrijsInstellenExtraKosten
				setExtraKosten={setExtraKosten}
				extraKosten={extraKosten}
			/>
			<p className='text-xs my-4 italic '>
				*{t('adv.3.star')}
			</p>
		</div>
	);
}
