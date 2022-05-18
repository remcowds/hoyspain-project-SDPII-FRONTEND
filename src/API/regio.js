import {
  axios
} from './index';

export const GETRegios = async () => {
  return await axios.get('/regio');
};