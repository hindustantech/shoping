import { useState, useContext, createContext,useEffect } from "react";

const CartContext = createContext();

const Cartprovider = ({ children }) => {
  const [Cart, SetCart] = useState([]);
  // defult axios
  useEffect(()=>{
    let ExCartItem=localStorage.getItem("cart");
    if(ExCartItem) SetCart(JSON.parse(ExCartItem))
  },[])
 
  return (
    <CartContext.Provider value={[Cart, SetCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { useCart, Cartprovider };
