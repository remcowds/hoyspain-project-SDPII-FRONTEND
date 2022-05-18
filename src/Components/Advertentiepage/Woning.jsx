import { useCallback, useContext, useEffect, useState } from 'react';
// import { AiFillHeart } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { Navigate } from 'react-router-dom';
import GeefSterren from './GeefSterren';
import { WoningContext } from '../../contexts/WoningProvider';
import { CurrentWoningContext } from '../../contexts/CurrentWoningProvider';
import PrijsReservatieInWoning from '../ReservatiesPage/PrijsReservatieInWoning';
import CircleWithSpan from './CircleWithSpan';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSession } from '../../contexts/AuthProvider';
import { FavorietenContext } from '../../contexts/FavorietenProvider';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Line } from 'react-icons/ri';
import FadeIn from 'react-fade-in';
import { GrClose } from 'react-icons/gr';

export default function Woning(props) {
	const [shine, setShine] = useState(0);
	const { t } = useTranslation();
	const {
		woning,
		woningID,
		naamWoning,
		linkAfbeeldingen,
		regio,
		wifi,
		zwembad,
		airco,
		zeezicht,
		rating,
		prijs,
		extraStyling,
		isOverzichtReservaties,
		boekingAankomst,
		boekingVertrek,
		boeking,
		isVerhuurderPage = false,
		knoppen = true,
	} = props;
	const {
		POSTFavorieten,
		FAVORIETENDATA,
		alleDataFAVORIETENDATA,
		deleteFavoriet,
	} = useContext(FavorietenContext);
	const { loading, hasRole, user } = useSession();
	const voegToeFavorieten = useCallback(
		async (woning) => {
			POSTFavorieten({ userID: user.userID, woningID: woning.woningID });
			setShine(1);
		},
		[user, POSTFavorieten]
	);

	const verwijderFavoriet = useCallback(async () => {
		const data = alleDataFAVORIETENDATA;
		console.log(alleDataFAVORIETENDATA);
		if (user) {
			if (data.map((d) => d.woningID).includes(woningID)) {
				console.log(data.map((d) => d.woningID).indexOf(woningID));
				console.log(
					alleDataFAVORIETENDATA[
						data.map((d) => d.woningID).indexOf(woningID)
					].favorietID
				);
				deleteFavoriet({
					favorietenID:
						alleDataFAVORIETENDATA[
							data.map((d) => d.woningID).indexOf(woningID)
						].favorietID,
					userID: user.userID,
				});
			}
		}
	}, [user, alleDataFAVORIETENDATA, woningID, deleteFavoriet]);

	const eigenschappen = [];
	const propsEigenschappen = [
		{ name: wifi, value: t('advertentiepagina.filters.subtitle1.wifi') },
		{
			name: zwembad,
			value: t('advertentiepagina.filters.subtitle1.zwembad'),
		},
		{ name: airco, value: t('advertentiepagina.filters.subtitle1.airco') },
		{
			name: zeezicht,
			value: t('advertentiepagina.filters.subtitle1.zeezicht'),
		},
	];

	propsEigenschappen.forEach((eigenschap) => {
		if (eigenschap.name === 1) {
			eigenschappen.push(eigenschap.value);
		}
	});

	const displayEigenschappen = eigenschappen.map((el) => (
		<CircleWithSpan
			key={el}
			classNameP='flex items-center'
			classNameS='ml-2'
			text={el}
		/>
	));

	const [redirect, setRedirect] = useState(false);
	const [isFavoriet, setIsFavoriet] = useState(false);
	const [navTo, setNavTo] = useState(`/huren/${woningID}`);

	const { setFiltersDeFormData, removeWoning } = useContext(WoningContext);
	const { currentInfoWoning, setIsWijzigen } =
		useContext(CurrentWoningContext);

	const handleBekijkWoning = useCallback(() => {
		//geen requests doen als het gewoon op de preview pagina is
		if (!woningID) return;

		//form resetten -> error weg
		setFiltersDeFormData({
			regio: '',
			data: [],
			personen: '',
		});

		setNavTo(`/huren/${woningID}`);
		setRedirect(true);
	}, [setFiltersDeFormData, woningID]);

	const handleWijzigWoning = useCallback(() => {
		Object.entries(woning).forEach((pair) => {
			currentInfoWoning[pair[0]] = pair[1];
		});
		setIsWijzigen(true);

		setNavTo(`/plaatsadvertentie`);
		setRedirect(true);
	}, [currentInfoWoning, woning, setIsWijzigen]);

	const checkOfInFavorieten = useCallback(() => {
		const data = FAVORIETENDATA;
		if (user) {
			if (data.map((d) => d.woningID).includes(woningID)) {
				setIsFavoriet(true);
			} else {
				setIsFavoriet(false);
			}
		}
	}, [user, woningID, FAVORIETENDATA]);

	useEffect(() => {
		checkOfInFavorieten();
	}, [FAVORIETENDATA, user, checkOfInFavorieten]);

	//delete funciton

	const [deleteOpen, setDeleteOpen] = useState(false);

	const sluitFunctie = useCallback(() => {
		setDeleteOpen(!deleteOpen);
	}, [deleteOpen]);

	const deleteWoning = useCallback(() => {
		setDeleteOpen(true);
	}, []);

	const verwijderGeselecteerdeWoning = useCallback(() => {
		removeWoning(woningID);
		sluitFunctie();
	}, [removeWoning, woningID, sluitFunctie]);

	return (
		<article
			className={`flex m-2 border-solid border-[3px] border-gray-300 rounded-lg border-l-4 h-[227px] border-l-weboranje sm:min-h-[180px] ${extraStyling}`}>
			{deleteOpen && (
				<>
					<div
						className='fixed bg-black z-[60] w-screen h-screen top-0 left-0 opacity-40'
						onClick={sluitFunctie}
					/>
					<div className='fixed overflow-hidden top-1/2 -translate-y-1/2 z-[61] text-center text-xl left-1/2 -translate-x-1/2'>
						<FadeIn>
							<div className='bg-white rounded-xl mx-auto w-fit p-5 relative'>
								<button
									className=' p-2 rounded-md absolute top-3 right-3 hover:bg-weblichtgrijs'
									onClick={sluitFunctie}>
									<GrClose size='20' />
								</button>

								<p className='px-12 py-10'>
									{t('boeken.verwijderen.tekst')}
								</p>

								<Woning
									woning={woning}
									key={woning.woningID}
									linkAfbeeldingen={woning.linkAfbeeldingen}
									woningID={woning.woningID}
									naamWoning={woning.naamWoning}
									regio={woning.regio}
									wifi={woning.wifi}
									zwembad={woning.zwembad}
									airco={woning.airco}
									zeezicht={woning.zeezicht}
									rating={woning.rating}
									prijs={woning.prijsPerNachtPerPersoon}
									extraStyling='bg-white'
									isVerhuurderPage={isVerhuurderPage}
									knoppen={false}
								/>

								<button
									className='border-solid border-2  border-green-600 rounded-lg 
				bg-green-600  text-white font-semibold px-3 py-1 w-fit m-5'
									onClick={sluitFunctie}>
									{t('boeken.verwijderen.nee')}
								</button>

								<button
									className='border-solid border-2  border-red-600 rounded-lg 
				bg-red-600  text-white font-semibold px-3 py-1 w-fit m-5'
									onClick={verwijderGeselecteerdeWoning}>
									{t('boeken.verwijderen.ja')}
								</button>
							</div>
						</FadeIn>
					</div>
				</>
			)}
			<div className='flex p-2 w-full'>
				<div className='w-1/2 relative h-full mr-4'>
					<img
						src={linkAfbeeldingen[0]}
						alt='foto'
						className='h-full w-full min-w-full object-cover rounded-lg cursor-pointer'
						draggable={false}
						onClick={handleBekijkWoning}
					/>
					{linkAfbeeldingen[1] ? (
						<img
							src={linkAfbeeldingen[1]}
							alt='foto'
							className='h-full w-full object-cover opacity-0 hover:opacity-100 cursor-pointer absolute top-0 left-0 transition-opacity rounded-lg'
							draggable={false}
							onClick={handleBekijkWoning}
						/>
					) : null}
				</div>
				<div className='w-1/2 flex flex-col'>
					<div className='flex items-center'>
						<h4 className='text-xl font-semibold mr-2'>
							{naamWoning}
						</h4>
						<button className='group'>
							{user &&
								(isFavoriet ? (
									<div
										className='group'
										onClick={() => verwijderFavoriet()}>
										<AiFillHeart
											size='32'
											className='hartje text-weboranje p-1 bg-webwit rounded-full bg-opacity-40 border-[1px] border-transparent duration-150 group-hover:hidden'
											onAnimationEnd={() => setShine(0)}
											shine={shine}
										/>
										<AiOutlineHeart
											size='32'
											onAnimationEnd={() => setShine(0)}
											className='hartje text-weboranje p-1 bg-webwit rounded-full bg-opacity-40 border-[1px] border-transparent duration-150 group-hover:block hidden'
										/>
									</div>
								) : (
									<div
										onClick={() =>
											voegToeFavorieten(woning)
										}>
										<AiOutlineHeart
											size='32'
											className='text-weboranje p-1 bg-webwit rounded-full bg-opacity-40 border-[1px] border-transparent group-hover:border-weboranje duration-150'
										/>
									</div>
								))}
						</button>
					</div>
					<div className='flex items-center'>
						<ImLocation
							size='21'
							className='text-weboranje p-1 bg-weboranje rounded-full bg-opacity-40'
						/>
						<p className='text-xs ml-2 opacity-60 font-semibold'>
							{regio}
						</p>
					</div>
					<div className='flex flex-col mt-4 gap-x-5 gap-y-1'>
						{isOverzichtReservaties ? (
							<PrijsReservatieInWoning boeking={boeking} />
						) : (
							displayEigenschappen
						)}
					</div>
					{isOverzichtReservaties ? (
						<p className='text-lg mt-auto mx-auto font-semibold text-webgrijs '>
							{boekingAankomst} - {boekingVertrek}
						</p>
					) : null}
				</div>
			</div>
			<div className='flex flex-col w-48 ml-auto'>
				<div className='ml-auto mr-2 text-weboranje py-2 text-xl'>
					<div className='flex'>
						{((!loading && hasRole('owner')) ||
							(!loading && user?.userID === woning?.userID)) &&
						knoppen ? (
							<button
								className='p-2 rounded-md top-3 left-3 border-red-500 border-[2px] hover:border-black text-red-500 hover:text-black'
								onClick={deleteWoning}>
								<RiDeleteBin6Line size='15' />
							</button>
						) : null}
						<GeefSterren aantal={rating} />
					</div>
				</div>
				<p className='text-md mt-auto py-1 ml-auto mr-2'>
					{prijs
						? `€ ${prijs}/${t(
								'advertentiepagina.filters.woning.nacht'
						  )}`
						: ''}
				</p>
				{knoppen ? (
					<>
						<div className='flex mb-2 mr-2 ml-auto justify-between gap-x-2'>
							{isVerhuurderPage ? (
								<button
									className='border-solid border-2  border-yellow-400 rounded-lg 
				  bg-yellow-400  text-white font-semibold px-3 py-1 w-fit'
									onClick={handleWijzigWoning}>
									{t(
										'advertentiepagina.filters.woning.wijzigen'
									)}
								</button>
							) : null}
							{!isVerhuurderPage &&
							(hasRole('admin') || hasRole('owner')) ? (
								<button
									className='border-solid border-2  border-yellow-400 rounded-lg 
				  bg-yellow-400  text-white font-semibold px-3 py-1 w-fit'
									onClick={handleWijzigWoning}>
									{t(
										'advertentiepagina.filters.woning.wijzigen'
									)}
								</button>
							) : null}
							{knoppen ? (
								<>
									<button
										className={`border-solid border-2  border-weboranje rounded-lg 
				  bg-weboranje  text-white font-semibold px-3 py-1 ${
						isVerhuurderPage || hasRole('admin') || hasRole('owner')
							? 'w-fit'
							: 'w-40'
					}`}
										onClick={handleBekijkWoning}>
										{isOverzichtReservaties
											? `${t(
													'advertentiepagina.filters.woning.overzicht'
											  )}`
											: `${t(
													'advertentiepagina.filters.woning.bekijk'
											  )}`}
									</button>
								</>
							) : null}
						</div>
					</>
				) : (woningID===null &&
					<button
						className={`border-solid border-2  border-weboranje rounded-lg 
			bg-weboranje  text-white font-semibold px-3 py-1 ${
				isVerhuurderPage ? 'w-fit' : 'w-40'
			}`}
						onClick={handleBekijkWoning}>
						{isOverzichtReservaties
							? `${t(
									'advertentiepagina.filters.woning.overzicht'
							  )}`
							: `${t('advertentiepagina.filters.woning.bekijk')}`}
					</button>
				)}
				{redirect && woningID ? <Navigate to={navTo} /> : null}
			</div>
		</article>
	);
}