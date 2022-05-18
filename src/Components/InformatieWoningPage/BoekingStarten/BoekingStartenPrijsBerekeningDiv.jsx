import { prijs2Decimals } from '../../../core/prijzen';

export default function BoekingStartenPrijsBerekeningDiv(props) {
	const { label, value, neg, strong, korting } = props;
	let waarde;
	if (typeof value === 'number') {
		waarde = prijs2Decimals(value);
	} else {
		waarde = value;
	}

	if (strong) {
		return (
			<div className='flex justify-between border-b-[1px]'>
				<strong>{label}</strong>
				<strong>
					{neg && '-'}€{waarde}
				</strong>
			</div>
		);
	}
	return (
		<div
			className={`flex justify-between border-b-[1px] ${
				korting && 'text-green-400'
			}`}>
			<p>{label}</p>
			<p className='w-[80px] ml-auto pl-auto text-right'>
				{neg && '-'}€{waarde}
			</p>
		</div>
	);
}
