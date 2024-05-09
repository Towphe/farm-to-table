import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookie from 'js-cookie';
import axios from 'axios'
import {DateTime} from 'luxon';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(Cookie.get('access_token'));
  const [role, setRole_] = useState(Cookie.get('role'));
  const [expiresIn, setExpiry] = useState(Cookie.get('expiresIn'));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setRole = (newRole) => {
    setRole_(newRole);
  }

  const signOut = () =>{
    delete axios.defaults.headers.common["Authorization"];
    Cookie.remove('access_token');
    Cookie.remove('role');
    Cookie.remove('expiresIn');
  }

  // validates jwt expiry
  if (DateTime.now() > DateTime.fromISO(expiresIn)){
    console.log("Token expired. Sign in again.")
    signOut();
  }

  useEffect(() => {
    

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      Cookie.set('access_token', token);
      Cookie.set('role', role);
      Cookie.set('expiresIn', expiresIn);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      Cookie.remove('access_token');
      Cookie.remove('role', role);
      Cookie.remove('expiresIn', expiresIn);
    }
  }, [token, role, expiresIn]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      role,
      expiresIn,
      setToken,
      setRole,
      setExpiry,
      signOut
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;