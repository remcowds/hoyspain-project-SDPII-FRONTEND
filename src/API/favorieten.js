import {
    axios
  } from './index';
  
  const linkAPI = '/favorieten';
  
  export const GETFavorieten = async (params) => {
      
    return await axios.get(`${linkAPI}`, {
      params,
    })
  }
  
  export const POSTFavoriet = async (bodyData) => {
    return await axios.post(`${linkAPI}`, 
      bodyData,
    )
  }
  
  export const GETFavorietenByUserID = async (userID) => {
    return await axios.get(`${linkAPI}/${userID}`)
  }

  export const DELFavoriet = async (favID) => {
    return await axios.delete(`${linkAPI}/${favID}`);
  };