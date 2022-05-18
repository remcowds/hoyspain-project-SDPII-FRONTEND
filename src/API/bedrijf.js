import {
  axios
} from './index';

const linkBedrijfAPI = '/bedrijf';
const linkDienstenAPI = '/diensten';

export const GETbedrijven = async (params) => {
  return await axios.get(`${linkBedrijfAPI}`, {
    params,
  })
}

export const GETdiensten = async () => {
  return await axios.get(`${linkDienstenAPI}`);
}

export const verwijderBedrijf = async ({bedrijfsID, token}) => {

  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  try{
    await axios.delete(`${linkBedrijfAPI}/${bedrijfsID}`);
    return true;
  }
  catch(err) {
    console.log(err)
    return false;
  }
}

// export const addWoning = async (bodyData) => {
//   return await axios.post(linkAPI, bodyData);
// };

export const addBedrijf = async ({
  formData,
  token
}) => {
  axios.defaults.headers.common = {
    'Authorization': `Bearer ${token}`
  }
  return await axios({
    method: "post",
    url: linkBedrijfAPI,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });
};


// export const editWoning = async (woningID, bodyData) => {
//   return await axios.put(`${linkAPI}/${woningID}`, bodyData);
// };

// export const deleteWoning = async (woningID) => {
//   return await axios.delete(`${linkAPI}/${woningID}`);
// };