import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookie from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [role, setRole_] = useState(Cookie.get('role'));

  // Function to set the authentication token

  const setRole = (newRole) => {
    setRole_(newRole);
  }

  const signOut = () =>{
    Cookie.remove('role');
  }


  useEffect(() => {
    if (role) {
      Cookie.set('role', role);
    } else {
      Cookie.remove('role', role);
    }
  }, [role]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      role,
      setRole,
      signOut
    }),
    [role]
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