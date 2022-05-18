import GeefSterren from '../Advertentiepage/GeefSterren';

export default function Recensie(props) {
	const { voornaam, achternaam, tekst, aantalSterren, datumBeoordeling } =
		props;

	const volledigeNaam = voornaam.concat(` ${achternaam}`);

	return (
		<div className='p-2 border-2 rounded-lg w-full xl:w-[48%] mt-4'>
			<div className='flex items-center justify-between'>
				<div>
					<p className='font-semibold'>{volledigeNaam}</p>
					<p className='text-xs text-gray-300'>{datumBeoordeling}</p>
				</div>
				{<GeefSterren aantal={aantalSterren} />}
			</div>
			<p className='mt-2'>{tekst}</p>
		</div>
	);
}
