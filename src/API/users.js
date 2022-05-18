import { axios } from '.';
import { useSession } from '../contexts/AuthProvider.jsx';

export const login = async(emailAdres, wachtwoord) => {
    const { data } = await axios.post('users/login', {
        emailAdres, wachtwoord
    });
    return data;
}

export const register = async ({
    emailAdres, 
    voornaam, 
    achternaam, 
    //adres, 
    telefoonnummer, 
    //geboorteDatum, 
    wachtwoord
}) => {
    const { data } = await axios.post('users/register', {
        emailAdres, 
        voornaam, 
        achternaam, 
        //adres, 
        telefoonnummer, 
        //geboorteDatum, 
        wachtwoord
    });

    return data;
}

export const getUserById = async (userId) => {

    const {
      data
    } = await axios.get(`users/${userId}`);
    return data;
  }
  
export const verwijderUser = async (user) => {

  console.log(user.userID)
    const {
      data
    } = await axios.delete(`users/${user.userID}`);
    console.log(data)
    return true;
  }

  export const getAllUsers = async (userId) => {

    const {
      data
    } = await axios.get(`users/`);
    return data;
  }

  export const putGegevens = async ({
    emailAdres, 
    voornaam, 
    achternaam, 
    telefoonnummer,
    token,
    user
  }
) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    // console.log(emailAdres, voornaam, token)
    const { data } = await axios.put(`users/${user.userID}`, {
            emailAdres, 
            voornaam, 
            achternaam, 
            telefoonnummer, 
    });
    return data;
}

  export const veranderRechten = async ({
    token,
    rol,
    userID
  }
) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    const { data } = await axios.put(`users/rechten/${userID}`, {
            rol
    });

}