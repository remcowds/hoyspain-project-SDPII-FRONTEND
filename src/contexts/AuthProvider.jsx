import { createContext, useMemo, useState, useCallback, useEffect, useContext } from 'react';
import * as usersApi from '../API/users';
import * as api from '../API';
import config from '../config.json';
import { toast } from 'react-toastify';
import { VerhuurderContext } from './VerhuurderProvider';
import { useTranslation } from 'react-i18next';

const JWT_TOKEN_KEY = config.token_key;
export const AuthContext = createContext();


function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split('.')[1];
  //testing that
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== 'number') exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
}



const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { token, user, ready, loading, error, hasRole } = useAuth();
  return {
    token,
    user,
    ready,
    error,
    loading,
    isAuthed: Boolean(token),
    hasRole,
  };
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

export const usePutRequestPersoon = () => {
  const { putgegevens } = useAuth();
  return putgegevens;
};

export const useVerwijderUser = () => {
  const { verwijderUser } = useAuth();
  return verwijderUser;
};

export const useRegister = () => {
  const { register } = useAuth();
  return register;
};

export const useVeranderRol = () => {
  const { veranderGegevensAdmin } = useAuth();
  return veranderGegevensAdmin;
};

export const AuthProvider = ({
  children,
}) => {  
  const [ready, setReady] = useState(false);
  const [alleUsers, setAlleUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const {t} = useTranslation();



  const setSession = useCallback(async (token, user) => {
    const { exp, userId } = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }

    api.setAuthToken(token);
    setToken(token);
    setReady(token && stillValid);

    if (!user && stillValid) {
      try{
        user = await usersApi.getUserById(userId);
      }
      catch{
        setSession(null, null);
      }
    }
    setUser(user);
  }, []);

  useEffect(() => {
    setSession(token);
  }, [token, setSession]);

  

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await usersApi.login(email, password);
      await setSession(token, user);
      toast.success(t("meldingen.ingelogd"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
        });
      return true;
    } catch (error) {
      console.error("error", error);
      setError('Login failed, try again');
      toast.error(t("meldingen.gefaald"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [setSession, t]);

  // useEffect(() =>{
  //   login('lukas.vandorpe@student.hogent.be', 'admin')
  // }, login)
  

  const register = useCallback(async (data) => {

    try {
      setLoading(true);
      setError(null);
      const { token, user } = await usersApi.register(data);
      await setSession(token, user);
      toast.success(t("meldingen.geregistreerd"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      });
      return true;
    } catch (error) {      
      setError(error.response.data.message);      
      setSession(null, null);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setSession,t]);
  
  const putgegevens = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await usersApi.putGegevens(data);
      setSession(token, user);
      toast.success(t("meldingen.opgeslagen"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      });
      return true;
    } catch (error) {
      toast.error(t("meldingen.opgeslagen_gefaald"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      });
      setError(error);
      setSession(null, null);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setSession, token, t]);

  const getAlleUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const users = await usersApi.getAllUsers();
      setAlleUsers(users);
      return users;
    } catch (error) {
      toast.error(t("meldingen.gettingusers_fail"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      });
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [t]);

  const veranderGegevensAdmin = useCallback(async ({rol,token, userID}) => {
    try {
      setLoading(true);
      setError(null);
      await usersApi.veranderRechten({rol, token, userID});
      setAlleUsers(await getAlleUsers());
      toast.success(t("meldingen.changerights"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      });
      return true;
    } catch (error) {
      console.log(error)
      toast.error(t("meldingen.changerights_fail"), {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        autoClose:2000,
      });
      setError(error);
      setSession(null, null);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setSession, getAlleUsers,t]);

  const logout = useCallback(() => {
    setSession(null, null);
    toast.info((t('meldingen.logout')), {
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      pauseOnFocusLoss:false,
      autoClose:2000,
    });
  }, [setSession, t]);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.role.includes(role);
  }, [user]);
  
  const verwijderUser = useCallback(async (user) => {
    try {
      setLoading(true);
      setError(null);
      await usersApi.verwijderUser(user);
      const users = await usersApi.getAllUsers();
      setAlleUsers(users);
      return true;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    token,
    user,
    ready,
    loading,
    error,
    login,
    logout,
    register,
    putgegevens,
    verwijderUser,
    hasRole,
    alleUsers,
    getAlleUsers,
    veranderGegevensAdmin,
  }), [token, user, ready, loading, error, login, logout, register, verwijderUser, putgegevens, hasRole, getAlleUsers,veranderGegevensAdmin, alleUsers]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};