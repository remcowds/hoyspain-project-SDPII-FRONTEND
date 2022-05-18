import { useTranslation } from "react-i18next";

export default function StandaardInfoImageDiv(props) {
	const { onImageChange, imageURLs } = props;
	const {t} = useTranslation();
	return (
		<div className='flex gap-x-4 h-full'>
			<div className='flex flex-col gap-y-1 w-full'>
				<label>{t('adv.1.afbeeldingen')}</label>
				<div className='border-2 border-dashed rounded-md w-full h-full p-2'>
					<input
						type='file'
						name='afbeeldingen'
						id='afbeeldingen'
						multiple={true}
						accept='image/*'
						onChange={onImageChange}
					/>
					<div className='flex flex-wrap mt-2 gap-[6px] max-h-44 overflow-y-scroll before:absolute bg-gradient-to-br'>
						{imageURLs.map((imageSrc) => (
							<div className='w-[48%] h-[80px]' key={imageSrc}>
								<img
									src={imageSrc}
									alt=''
									draggable={false}
									className='w-full h-full object-cover rounded-md'
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
