import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  // defult axios
  axios.defaults.headers.common['Authorization']=auth?.token;
  useEffect(() => {
    const data=localStorage.getItem("auth")
    if (data) {
      const pasreData = JSON.parse(data);
      setAuth({
        ...auth,
        user: pasreData.user,
        token: pasreData.token,
      });
    }
    //eslint-disable-next-line
  },[]); 
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, Authprovider };
