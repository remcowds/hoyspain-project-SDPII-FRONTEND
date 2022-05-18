export default function BoekingStartenDataDiv({ label, value }) {
	return (
		<div className='flex flex-col gap-x-2 justify-between p-1 border-b-2 border-gray-300'>
			<p>{label}</p>
			<p className='whitespace-nowrap'>{value}</p>
		</div>
	);
}
