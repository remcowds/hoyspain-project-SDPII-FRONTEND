import { useCallback, useContext, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import FadeIn from 'react-fade-in';
import { toast } from 'react-toastify';
import { useSession } from '../../contexts/AuthProvider';
import { BedrijfContext } from '../../contexts/BedrijfProvider';
import { useTranslation } from 'react-i18next';

export default function BedrijfKaart(props) {
  const { token } = useSession();
	const { img, bedrijfsNaam, text, link, bedrijfsID, magVerwijderen } = props;
	const { verwijderBedrijf } = useContext(BedrijfContext);
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);
	
	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	const confirmDeleteBedrijf = useCallback(async(bedrijfsID) => {
    handleClose();
    try{
			await verwijderBedrijf({bedrijfsID, token});
			toast.success(`${bedrijfsNaam} verwijdert.`, {
				position: toast.POSITION.BOTTOM_RIGHT,
				pauseOnHover: false,
				pauseOnFocusLoss:false,
				autoClose:2000,
				});
			} catch(error)
			{
				toast.error("Verwijderen gefaald", {
					position: toast.POSITION.BOTTOM_RIGHT,
					pauseOnHover: false,
					pauseOnFocusLoss:false,
					autoClose:2000,
			});

			}
    },[handleClose]);

		const {t} = useTranslation();
	return (
		<>
			{magVerwijderen && isOpen && (
				<div className="fixed top-14 left-0 z-[300]">
      <div className="fixed overflow-hidden top-1/2 -translate-y-1/2 z-[61] text-center text-xl left-1/2 -translate-x-1/2">
        <FadeIn>
          <div className="bg-white rounded-xl mx-auto w-fit p-5 relative text-center">

            <p className="px-5">{t('rights.confirmdel')}</p>
            <br />
            <p className="text-2xl text-red-600">{bedrijfsNaam}</p>
            <br />
            <p className="text-lg text-red-600 max-w-md">{text}</p>
            <br />
						<img src={img} alt="bedrijf" className="max-w-sm max-h-sm rounded-2xl mx-auto" draggable="false"/>
						<br />
            <p className="text-center text-sm">{link}</p>
            <br />
 
              <div className="flex flex-row justify-between">
                <button className="border-[2px] border-black hover:border-gray-500 hover:text-gray-500 p-2 rounded-md" onClick={handleClose}>{t('rights.cancel')}</button>
                <button className="border-[2px] bg-red-500 hover:bg-red-400 p-2 rounded-md text-white" onClick={() => confirmDeleteBedrijf(bedrijfsID)}>{t('rights.del')}</button>
              </div>
          </div>
        </FadeIn>
      </div>
						<div className="w-screen h-screen fixed bg-black duration-300 opacity-40" onClick={handleClose}/>
					</div>
			)}
			<div className='mx-auto bg-webwit border-[1px] border-gray-300 shadow-md w-60 h-72 rounded-very-big duration-300 group relative'>
				{/* delete button */}
				{magVerwijderen && (
					<div
						className='group-hover:opacity-100 opacity-0 absolute top-0 right-0 p-3 cursor-pointer bg-weboranje rounded-md hover:bg-webrood duration-300'
						onClick={handleClick}
					>
						<ImCross className='text-weblichtoranje' />
					</div>
				)}
				<a
						href={link}
						target='_blank'
						rel='noreferrer'
						className=''>
				<img
					src={img}
					alt=''
					className='w-60 h-40 mx-auto rounded-very-big'
					draggable='false'
					/>
				</a>
				<div className='flex flex-row justify-start ml-5 mt-1 w-[238px]'>

				</div>
				<p className='text-base font-semibold text-center'>{bedrijfsNaam}</p>
				<p className='text-xs mx-5 text-center'>{text}</p>
				<div className='flex justify-center w-full'>
					<a
						href={link}
						target='_blank'
						rel='noreferrer'
						className='absolute text-sm text-center mx-auto bottom-2 duration-300 group-hover:block hidden bg-white px-2 rounded-full'>
						{t('diensten.meer')} &gt;
					</a>
				</div>
			</div>
		</>
	);
}
