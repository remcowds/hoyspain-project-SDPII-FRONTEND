import { useSession } from '../contexts/AuthProvider';
import {
  axios
} from './index';

const linkAPI = '/image';

export const POSTImage = async (formdata, token) => {

  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  const response = await axios({
    method: "post",
    url: linkAPI,
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(response)
}

