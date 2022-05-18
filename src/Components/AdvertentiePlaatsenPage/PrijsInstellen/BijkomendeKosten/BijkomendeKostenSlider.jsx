import { useCallback } from 'react';

export default function BijkomendeKostenSlider({ perNacht, setPerNacht }) {
	const togglePerNacht = useCallback(() => {
		setPerNacht(!perNacht);
	}, [perNacht, setPerNacht]);

	return (
		<div className='text-sm flex my-auto mr-2 items-center'>
			<p>Eenmalig</p>
			<label className='switch rounded-full border-[2px] p-[2px] mx-1 border-webdonkerlichtgrijs'>
				<input
					type='checkbox'
					className='rounded-full'
					defaultChecked={false}
					onClick={togglePerNacht}
				/>
				<span className='slider rounded-full'></span>
			</label>
			<p>Per nacht</p>
		</div>
	);
}
