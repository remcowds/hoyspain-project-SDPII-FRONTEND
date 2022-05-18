import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSession } from '../../contexts/AuthProvider';
import Woning from './Woning';
import { FavorietenContext } from '../../contexts/FavorietenProvider';
import { useTranslation } from 'react-i18next';

// Example items, to simulate fetching from another resources.

function Items({ currentItems, isVerhuurderPage }) {
	//ophalen van favorieten
  const { user } = useSession();
	const { GETFavorieten } = useContext(FavorietenContext);
	const {t} = useTranslation();

  const getFavorieten = useCallback(async () => {
		if (user)
		{
			// console.log(user.userID)
			await GETFavorieten(user.userID);
		}

  }, [user, GETFavorieten]);

	useEffect(() => {
		getFavorieten()
	}, [user]);
	
	return (
		<>
			{currentItems &&
				currentItems.map((woning) => (
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
					/>
				))}
		</>
	);
}

export default function LijstWoningen(props) {
	const { WONING_DATA, itemsPerPage, isVerhuurderPage } = props;

	const items = WONING_DATA;

	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);

	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		//het juiste deel v/d woningdata weergeven
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(items.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(items.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, items]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
	};
	const {t} = useTranslation();
	return (
		<>
			<Items
				currentItems={currentItems}
				isVerhuurderPage={isVerhuurderPage}
			/>
			<div className='flex justify-center items-center mb-10 mx-auto m-4 whitespace-nowrap'>
				<ReactPaginate
					className='flex'
					pageClassName='flex mx-1'
					pageLinkClassName='border-2 bg-white p-1 px-2 rounded-md'
					activeLinkClassName='bg-white border-weboranje bg-weboranje/40'
					previousLabel={t('advertentiepagina.vorige')}
					previousClassName='flex mx-1 border-2 border-gray-300 bg-white p-1 px-2 rounded-l-lg rounded-r-md'
					nextLabel={t('advertentiepagina.volgende')}
					nextClassName='flex mx-1 border-2 border-gray-300 bg-white p-1 px-2 rounded-r-lg rounded-l-md'
					breakLabel='...'
					breakClassName='px-2'
					onPageChange={handlePageClick}
					pageCount={pageCount}
					renderOnZeroPageCount={null}
					pageRangeDisplayed={2}
					marginPagesDisplayed={2}
					showQuickJumper={true}
				/>
			</div>
		</>
	);
}
