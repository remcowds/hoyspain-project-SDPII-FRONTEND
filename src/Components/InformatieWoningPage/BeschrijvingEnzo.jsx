import CircleWithSpan from '../Advertentiepage/CircleWithSpan';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function BeschrijvingEnzo({ woning }) {
	const {
		adres,
		korteBeschrijving,
		beschrijving,
		wifi,
		zwembad,
		airco,
		zeezicht,
		regio,
	} = woning;
	const {t} = useTranslation();
	// eigenschappen uithalen
	const eigenschappen = [];
	const propsEigenschappen = [
		{ name: wifi, value: t('advertentiepagina.filters.subtitle1.wifi') },
		{ name: zwembad, value: t('advertentiepagina.filters.subtitle1.zwembad') },
		{ name: airco, value: t('advertentiepagina.filters.subtitle1.airco') },
		{ name: zeezicht, value: t('advertentiepagina.filters.subtitle1.zeezicht') },
	];

	propsEigenschappen.forEach((eigenschap) => {
		if (eigenschap.name === 1) {
			eigenschappen.push(eigenschap.value);
		}
	});

	return (
		<section className='mt-6 mx-auto px-6 pb-6 border-b-4 border-weboranje'>
			<div className='flex gap-x-2 items-start'>
				<div className='flex flex-col border-2 rounded-lg p-2 w-7/12'>
					<p className='font-bold text-xl'>{korteBeschrijving}</p>
					<div className='flex gap-x-4 border-b-2 pb-2 mb-1'>
						{eigenschappen.map((eigenschap) => (
							<CircleWithSpan
								key={eigenschap}
								classNameP='flex items-center'
								classNameS='ml-2'
								text={eigenschap}
							/>
						))}
					</div>
					<p className='font-semibold'>{t('woningpagina.beschrijving')}</p>
					<p>{beschrijving}</p>
				</div>
				<iframe
					title='locatieWoning'
					className='w-5/12 ml-2 rounded-lg min-h-[300px] h-full'
					src={`https://maps.google.com/maps?q=${regio}&t=&z=13&ie=UTF8&iwloc=&output=embed&hl=${i18n.language}`}
					scrolling='no'
				/>
			</div>
		</section>
	);
}
