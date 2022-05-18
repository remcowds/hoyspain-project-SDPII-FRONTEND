import BoekingStartenPrijsBerekeningDiv from './BoekingStartenPrijsBerekeningDiv';

export default function ExtraKostenDivken({ kostenArr, nachten }) {
	return (
		<>
			{kostenArr.map((kost) => {
				const eenmalig = kost.eenmalig;
				return (
					<BoekingStartenPrijsBerekeningDiv
						key={`${kost.naamKost}-${kost.prijs}`}
						label={`${eenmalig ? '' : ''} ${kost.naamKost}:`}
						value={`${kost.prijs} ${
							!eenmalig ? `x ${nachten} nachten` : ''
						}`}
					/>
				);
			})}
		</>
	);
}
