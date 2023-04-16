import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [data,setData] = useState();

  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0)
  },[location])

  useEffect(() => {
    let count = 0;
    cartItems?.map((item)=> (count += item.quantity));
    setCartCount(count);
    console.log(cartCount);


    
    let subTotal = 0;
    cartItems.map((item) => (subTotal += item.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    console.log(items);
    let index = items.findIndex((p) => p.id === product.id);
    console.log(index);
    if (index !== -1) {
      items[index].quantity += quantity;
    } else {
      product.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product.id);
    if (type === "inc") {
      items[index].quantity += 1;
    } else if (type === "dec") {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    setCartItems(items);
  };

  useEffect(()=>{
    axios.get(`http://localhost:5000/posts`).then(res=>setData(res.data))
   },[])
   console.log(data)

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
        data
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;