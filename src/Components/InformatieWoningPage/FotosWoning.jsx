import { useCallback, useEffect, useState } from 'react';
import ImageDetail from './ImageDetail';
import SwiperFotosWoning from './SwiperFotosWoning';

export default function FotosWoning({ afbeeldingen }) {
	const aantal = afbeeldingen.length;

	const [displPopup, setDisplPopup] = useState(false);

	const toggleDisplPopup = useCallback(() => {
		setDisplPopup(!displPopup);
	}, [displPopup]);

	useEffect(() => {
		if (displPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflowY = 'scroll';
		}
	}, [displPopup]);

	if (aantal === 0) {
		return (
			<section className='mt-5 mx-auto px-6 pb-6 border-b-4 border-weboranje'>
				<div className='max-h-[400px]'>
					<p>Geen afbeeldingen beschikbaar</p>
				</div>
			</section>
		);
	}

	return (
		<section className='mx-auto px-6 mt-5 pb-6 border-b-4 border-weboranje'>
			<div className='grid gap-3 grid-rows-6 grid-cols-6 max-h-[400px]'>
				<ImageDetail
					image={afbeeldingen[0 % aantal]}
					alt=''
					styling='row-span-6 col-span-3 rounded-l-3xl'
					onclick={toggleDisplPopup}
				/>
				<ImageDetail
					image={afbeeldingen[1 % aantal]}
					alt=''
					styling='row-span-3 col-span-2'
					onclick={toggleDisplPopup}
				/>
				<ImageDetail
					image={afbeeldingen[2 % aantal]}
					alt=''
					styling='row-span-3 col-span-2'
					onclick={toggleDisplPopup}
				/>
				<ImageDetail
					image={afbeeldingen[3 % aantal]}
					alt=''
					styling='row-start-1 row-span-2 col-start-6 col-span-1 rounded-tr-3xl'
					onclick={toggleDisplPopup}
				/>
				<ImageDetail
					image={afbeeldingen[4 % aantal]}
					alt=''
					styling='row-start-3 row-span-2 col-start-6 col-span-1'
					onclick={toggleDisplPopup}
				/>
				<ImageDetail
					image={afbeeldingen[5 % aantal]}
					alt=''
					styling='row-start-5 row-span-2 col-start-6 col-span-1 rounded-br-3xl'
					onclick={toggleDisplPopup}
				/>
			</div>
			{displPopup ? (
				<SwiperFotosWoning
					toggleDisplPopup={toggleDisplPopup}
					afbeeldingen={afbeeldingen}
				/>
			) : null}
		</section>
	);
}
