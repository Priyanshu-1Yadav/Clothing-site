import { createContext, useContext, useState } from "react";

const VariableContext = createContext();

export const VariableContextProvider = ({ children }) => {
  // const host = "https://thriftnbliss.in";
  const host = "http://localhost:8080";

  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   return localStorage.getItem("isLoggedIn") === "true";
  // });
  // const [user, setUser] = useState(() => {
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null; // Parse the stored user JSON string
  // });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const deleteUser = () => {
    // localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    // localStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("shippingAddress");
};
  
  const [cartItems, setCartItems] = useState([]);
  const [couponDiscount, setCouponDiscount] = useState(0);


  return (
    <VariableContext.Provider
      value={{
        host,
        // isLoggedIn,
        // setIsLoggedIn,
        // user,
        // setUser,
        token,
        deleteUser,
        cartItems,
        setCartItems,
        couponDiscount,
        setCouponDiscount,
      }}
    >
      {children}
    </VariableContext.Provider>
  );
};

export const useVariableContext = () => {
  return useContext(VariableContext);
};
