import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const Searchprovider = ({ children }) => {
  const [auth, setAuth] = useState({
  keyword:"",
  results:[],
  });
  // defult axios
 
  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);
export { useSearch, Searchprovider };
