export default function OptionDeForm({ keyValueWaarde }) {
	return (
		<option key={keyValueWaarde} value={keyValueWaarde}>
			{keyValueWaarde}
		</option>
	);
}
