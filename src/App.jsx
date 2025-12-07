import Header from "./components/Header/header";
import "./App.css";
import ListContainer from "./components/HeaderListcontainer/list-container";
import Sidebar from "./components/Sidebar/sidebar";
import Productsection from "./components/Product-section/product-grid";
import { useState,useEffect } from "react";
import Productinfo from "./components/productdetails/productinfo";
import { Routes,Route ,useLocation} from "react-router-dom";
import Categorysection from "./components/Sidebar/category";
import SearchResultsection from "./components/seachfunctionality/search";
import CartPage from "./components/Header/CartPage";
import HomePage from "./components/Homepage/Homepage";

function App(){
  const [cartitemdetails, setcartitemdetails] = useState(() => 
    JSON.parse(localStorage.getItem("cartitemdetails")) || []
  );
  
  const [cartitems, setcartitems] = useState(() => 
    Number(localStorage.getItem("cartitems")) || 0
  );
  
  const [carttotal, setcarttotal] = useState(() => 
    Number(localStorage.getItem("carttotal")) || 0
  );
  
  const [totalsavings, settotalsavings] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartitems", cartitems.toString());
  }, [cartitems]);

  useEffect(() => {
    localStorage.setItem("carttotal", carttotal.toString());
  }, [carttotal]);

  useEffect(() => {
    localStorage.setItem("cartitemdetails", JSON.stringify(cartitemdetails));
  }, [cartitemdetails]);

  useEffect(() => {
    const savings = cartitemdetails.reduce(
      (acc, item) => acc + (item.savings * item.quantity || 0),
      0
    );
    settotalsavings(savings);
  }, [cartitemdetails]);

  const location = useLocation();
  const hideSidebar = location.pathname === "/product" || 
                       location.pathname === "/cart" || 
                       location.pathname === "/";

  const [products, setproducts] = useState([]); 

  useEffect(() => {
    async function getProductList() {
      const response = await fetch("https://dummyjson.com/products?limit=200");
      const data = await response.json();
      setproducts(data.products);
    }
    getProductList();
  }, []);

  console.log(carttotal);

  return <>
    <div className="header">
      <Header 
        cartitems={cartitems} 
        setcartitems={setcartitems} 
        carttotal={carttotal} 
        setcarttotal={setcarttotal}
        cartitemdetails={cartitemdetails}
        setcartitemdetails={setcartitemdetails} 
        totalsavings={totalsavings}
        products={products}
        setproducts={setproducts}
      />
      <ListContainer/>
    </div>
    
    {!hideSidebar && <Sidebar />}
    
    <Routes>
      <Route path="/" element={
        <HomePage 
          cartitems={cartitems}
          setcartitems={setcartitems}
          carttotal={carttotal}
          setcarttotal={setcarttotal}
          cartitemdetails={cartitemdetails}
          setcartitemdetails={setcartitemdetails}
          products={products}
          setproducts={setproducts} 
        />
      }/>

      <Route path="/product" element={
        <Productinfo 
          cartitems={cartitems}
          setcartitems={setcartitems}
          carttotal={carttotal}
          setcarttotal={setcarttotal}
          cartitemdetails={cartitemdetails}
          setcartitemdetails={setcartitemdetails}
        />
      }/>

      <Route path="/category/:categoryName" element={
        <Categorysection
          cartitems={cartitems}
          setcartitems={setcartitems}
          carttotal={carttotal}
          setcarttotal={setcarttotal}
          cartitemdetails={cartitemdetails}
          setcartitemdetails={setcartitemdetails}
          totalsavings={totalsavings}
          products={products}
          setproducts={setproducts}
        />
      }/>

      <Route path="/search" element={
        <SearchResultsection
          cartitems={cartitems}
          setcartitems={setcartitems}
          carttotal={carttotal}
          setcarttotal={setcarttotal}
          cartitemdetails={cartitemdetails}
          setcartitemdetails={setcartitemdetails}
          totalsavings={totalsavings}
        />
      }/>

      <Route path="/cart" element={
        <CartPage 
          cartitems={cartitems}
          setcartitems={setcartitems}
          carttotal={carttotal}
          setcarttotal={setcarttotal}
          cartitemdetails={cartitemdetails}
          setcartitemdetails={setcartitemdetails}
          totalsavings={totalsavings}
          settotalsavings={settotalsavings}
        />
      }/>
    </Routes>
  </>
}

export default App;
