import { useTranslation } from 'react-i18next';
import { prijs2Decimals } from '../../core/prijzen';

export default function PrijsReservatieInWoning({ boeking }) {
	const { t } = useTranslation();
	return (
		<div className='text-webgrijs font-semibold w-fit p-1 text-base'>
			<p>
				{t('advertentiepagina.filters.woning.aantalnachten')}:
				{boeking.aantalNachten}
			</p>
			<p>
				{t('advertentiepagina.filters.woning.totaalprijs')}: €
				{prijs2Decimals(boeking.totaalPrijs)}
			</p>
		</div>
	);
}
