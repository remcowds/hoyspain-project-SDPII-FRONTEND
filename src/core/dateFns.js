import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const formatDateDMY = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString().padStart(2, '0');
  let day = d.getDate().toString().padStart(2, '0');
  let year = d.getFullYear();
  return [day, month, year].join('/');
};

export const formatDateYMD = (date) => {
  
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString().padStart(2, '0');
  let day = d.getDate().toString().padStart(2, '0');
  let year = d.getFullYear();
  return [year, month, day].join('-');
}


export const DateToText = (date) => {
  const {t} = useTranslation();

  const NumberToDay = useCallback((number) => {
    switch (number) {
      case 0:
        return t("kaart.zondag");
      case 1:
        return t("kaart.maandag");
      case 2:
        return t("kaart.dinsdag");
      case 3:
        return t("kaart.woensdag");
      case 4:
        return t("kaart.donderdag");
      case 5:
        return t("kaart.vrijdag");
      case 6:
        return t("kaart.zaterdag");
      default:
        break;
    }
  }, [t]);

  if (date) {
    return ` ${NumberToDay(date.getDay())} ${date.getDate()}-${
			date.getMonth() + 1
		}-${date.getFullYear()}`;
  }
};

export const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date < endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export const sort2DArrayDates = (arr1, arr2) => {
  if (arr1[0].getTime() < arr2[0].getTime()) {
    return -1;
  }
  return 1;
}

export const sortPrijsObjectArrayDates = (o1, o2) => {
  const t1 = new Date(o1.data[0]).getTime();
  const t2 = new Date(o2.data[0]).getTime();
  if (t1 < t2) {
    return -1;
  }
  return 1;
}

