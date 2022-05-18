import { axios } from "./index";

const linkAPI = "/woning";

export const GETWoningen = async (params) => {
  return await axios.get(linkAPI, {
    params,
  });
};

export const getWoningenByIDS = async (params) => {  
  return await axios.post(`${linkAPI}/favorieten/`, {
    alleWoningen: params,
  });
};

export const GETWoningenByUser = async (userID) => {
  return await axios.get(`${linkAPI}/user/${userID}`);
};

export const GETWoning = async (woningID) => {
  return await axios.get(`${linkAPI}/${woningID}`);
};

export const addWoning = async ({ formData, token }) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
  return await axios({
    method: "post",
    url: linkAPI,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editWoning = async ({ formData, token, woningID }) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
  return await axios({
    method: "put",
    url: `${linkAPI}/${woningID}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteWoning = async (woningID) => {
  return await axios.delete(`${linkAPI}/${woningID}`);
};
