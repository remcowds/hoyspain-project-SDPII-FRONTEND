import {
  axios
} from './index';

const linkAPI = '/boeking';

export const GETBoekingen = async (params) => {
  return await axios.get(`${linkAPI}`, {
    params,
  })
}

export const POSTBoeking = async (bodyData) => {
  return await axios.post(`${linkAPI}`, 
    bodyData,
  )
}

export const getBoekingenByWoning = async (woningID) => {
  return await axios.get(`${linkAPI}/woning/${woningID}`)
}