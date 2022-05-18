import { AiOutlineCloseCircle } from 'react-icons/ai';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';

export default function SwiperFotosWoning({ toggleDisplPopup, afbeeldingen }) {
	return (
		<>
		<div className='fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-[60]' onClick={toggleDisplPopup}>
		</div>
		<div className='fixed top-0 left-0 h-full w-full z-[70] pointer-events-none'>
			<AiOutlineCloseCircle
				size='50'
				className='absolute top-20 right-8 cursor-pointer pointer-events-auto text-webwit'
				onClick={toggleDisplPopup}
				/>
			<Swiper			 
			 // initialSlide={0}
			 loop={true}
			 navigation={true}
			 pagination={{ clickable: true }}
			 modules={[Navigation, Pagination]}
			 className='absolute top-32 max-w-[1200px] w-[80%] h-[70%] bg-white bg-opacity-80 rounded-2xl pointer-events-auto'>
				{afbeeldingen.map((afb) => (
					<SwiperSlide key={afb}>
						<img
							src={afb}
							alt=''
							className='w-full h-full object-contain px-14 py-10'
							/>
					</SwiperSlide>
				))}
			</Swiper>
			</div>
			</>
	);
}
