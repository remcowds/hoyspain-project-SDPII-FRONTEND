import { useTranslation } from 'react-i18next';
import CircleWithSpan from './CircleWithSpan';

export default function InfoChecks() {
	const {t} = useTranslation();
	return (
		<div className='flex space-x-3 mb-4'>
			<CircleWithSpan text={t('advertentiepagina.overview.covid')} />
			<CircleWithSpan text={t('advertentiepagina.overview.money')} />
			<CircleWithSpan text={t('advertentiepagina.overview.freebooking')} />
		</div>
	);
}
