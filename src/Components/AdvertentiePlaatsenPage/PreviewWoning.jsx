import { useCallback, useContext, useState } from 'react';
import { WoningContext } from '../../contexts/WoningProvider';
import Woning from '../Advertentiepage/Woning';
import { v4 as uuid } from 'uuid';
import { useSession } from '../../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { CurrentWoningContext } from '../../contexts/CurrentWoningProvider';
import { Box, Button } from '@mui/material';
import { formatDateYMD } from '../../core/dateFns';
import { useTranslation } from 'react-i18next';

export default function PreviewWoning(props) {
  const { setActivePage, handleBack } = props;

  const [redirect, setRedirect] = useState(false);

  const { user, token } = useSession();

  const { currentInfoWoning, isWijzigen } = useContext(CurrentWoningContext);

  const { addWoning, editWoning } = useContext(WoningContext);

  const handleWoningPlaatsen = useCallback(async () => {
    if (!isWijzigen) {
      //woningID genereren
      currentInfoWoning.woningID = uuid();
    }

    //userID ophalen
    currentInfoWoning.userID = user.userID;

    //werken met temp voor de validation in de backend / gwn validation uit
    const temp = { ...currentInfoWoning };

    if (temp.prijsAanpassing) {
      temp.prijsAanpassing = temp.prijsAanpassing.map((o) => {
        o.data = o.data.map((date) => formatDateYMD(date));
        return o;
      });
    }

    temp.prijsAanpassing = JSON.stringify(temp.prijsAanpassing);
    temp.bijkomendeKosten = JSON.stringify(temp.bijkomendeKosten);
    console.log(temp.nietBeschikbaar);
    temp.nietBeschikbaar = temp.nietBeschikbaar.map((arr) => {
      arr[0] = formatDateYMD(arr[0]);
      arr[1] = formatDateYMD(arr[1]);
      console.log('yeet', arr);
      return arr;
    });

    temp.nietBeschikbaar = JSON.stringify(temp.nietBeschikbaar);
    console.log(temp.nietBeschikbaar);

    temp.adres = JSON.stringify(temp.adres);

    const imgs = temp.images;

    delete temp.images;
    if (!temp.kortingNachten) {
      delete temp.kortingNachten;
    }
    if (!temp.kortingPercent) {
      delete temp.kortingPercent;
    }
    if (!temp.maandKortingPercent) {
      delete temp.maandKortingPercent;
    }
    if (!temp.minimumAantalNachtenVerblijf) {
      delete temp.minimumAantalNachtenVerblijf;
    }

    const formData = new FormData();
    for (let i = 0; i < imgs.length; i++) {
      formData.append(`uploadedImages`, imgs[i]);
    }

    // console.log(token);
    // console.log(Object.entries(temp));
    Object.entries(temp).forEach(function (entry) {
      formData.append(entry[0], entry[1]);
    });

    if (!isWijzigen) {
      await addWoning({ formData, token });
    } else {
      await editWoning({
        formData,
        token,
        woningID: currentInfoWoning.woningID,
      });
    }

    //error response voor debug & later error handling
    // console.log(error.response?.data.message);
    // console.log(error.response?.data.details);
    setRedirect(true);
  }, [addWoning, editWoning, currentInfoWoning, user, token, isWijzigen]);

  const { t } = useTranslation();

  return (
    <>
      <div className='max-w-[800px] mx-auto mt-10 min-h-screen'>
        <Woning
          naamWoning={currentInfoWoning.naamWoning}
          linkAfbeeldingen={currentInfoWoning.linkAfbeeldingen}
          regio={currentInfoWoning.regioNaam}
          wifi={currentInfoWoning.wifi ? 1 : 0}
          zwembad={currentInfoWoning.zwembad ? 1 : 0}
          airco={currentInfoWoning.airco ? 1 : 0}
          zeezicht={currentInfoWoning.zeezicht ? 1 : 0}
          rating={3}
          prijs={currentInfoWoning.prijsPerNachtPerPersoon}
          knoppen={false}
        />
        <div className=' grid place-items-center m-10'>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              disabled={setActivePage === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              {t('adv.previous')}
            </Button>
            <button
              className='bg-weboranje text-white font-bold rounded-lg text-lg p-3 disabled:bg-weblichtgrijs'
              onClick={handleWoningPlaatsen}>
              {isWijzigen ? t('adv.update') : t('adv.place')}
            </button>
          </Box>
        </div>
      </div>
      {redirect ? <Navigate to='/' /> : null}
    </>
  );
}

