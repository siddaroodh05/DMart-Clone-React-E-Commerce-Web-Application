import Logo from "../../assets/logos/d-mart_icon.png";
import User from "../../assets/icons/user.svg";
import NotificationLogo from "../../assets/icons/notification.svg";
import Shopcart from "../../assets/icons/shopcart.svg";
import "./header.css";
import "./Signinpagestyle.css";
import "./notification-button-style.css";
import { useState } from "react";
import { SigninPage, NotificationPage, Viewcartpage } from "./toggles";
import { useNavigate } from "react-router-dom";

function Header({cartitems,setcartitems,carttotal,setcarttotal,cartitemdetails,setcartitemdetails,products,totalsavings,setproducts}) {
  const [showsignpage, setshowsignpage] = useState(false);
  const [shownotification, setshownotification] = useState(false);
  const [showcartpage, setshowcartpage] = useState(false);

  return (
    <>
      <div className="navbar">
        <Dmartlogo />
        <Searchbar products={products} />
        <Rightsection
          showsignpage={showsignpage}
          setshowsignpage={setshowsignpage}
          shownotification={shownotification}
          setshownotification={setshownotification}
          showcartpage={showcartpage}
          setshowcartpage={setshowcartpage}
          carttotal={carttotal}
        />
      </div>

      {showsignpage && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setshowsignpage(false)}
          ></div>
          <SigninPage />
        </>
      )}

      {shownotification && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setshownotification(false)}
          ></div>
          <NotificationPage onClose={() => setshownotification(false)} />
        </>
      )}

      {showcartpage && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setshowcartpage(false)}
          ></div>
          <Viewcartpage  
            cartitems={cartitems} 
            setcartitems={setcartitems} 
            carttotal={carttotal} 
            setcarttotal={setcarttotal} 
            cartitemdetails={cartitemdetails}  
            setcartitemdetails={setcartitemdetails} 
            showcartpage={showcartpage}
            setshowcartpage={setshowcartpage} 
            totalsavings={totalsavings} 
            products={products}
            setproducts={setproducts}
            onClose={() => setshowcartpage(false)} 
          />
        </>
      )}
    </>
  );
}

function Dmartlogo() {
  const navigate = useNavigate();
  return <img 
    style={{cursor:"pointer"}} 
    onClick={() => navigate("/")} 
    src={Logo} 
    alt="logo" 
  />;
}

function Searchbar({ products }) {
  const [productname, setproductname] = useState("");
  const navigate = useNavigate();

  const handleprevent = (e) => {
    e.preventDefault();
    const name = productname.trim().toLowerCase();
    
    if (!name) return;

    const filtered = products.filter((p) => {
      const matchName = p.title.toLowerCase().includes(name);
      const matchCategory = p.category.toLowerCase().includes(name);
      return matchName || matchCategory;
    });

    navigate("/search", { 
      state: { 
        results: filtered,
        query: productname.trim()
      } 
    });

    setproductname("");
  };

  return (
    <div className="Middlesection">
      <form onSubmit={handleprevent} className="search-bar">
        <input
          type="text"
          value={productname}
          onChange={(e) => setproductname(e.target.value)}
          placeholder="Search for products..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

function Rightsection({
  showsignpage,
  setshowsignpage,
  shownotification,
  setshownotification,
  showcartpage,
  setshowcartpage,
  carttotal
}) {
  return (
    <div className="rightsection">
      <div className="user-auth">
        <img src={User} alt="user" />
        <a
          onClick={() => setshowsignpage(!showsignpage)}
          className="sign_in"
        >
          Sign In/Register
        </a>
      </div>

      <button
        onClick={() => setshownotification(!shownotification)}
        className="notification-btn"
      >
        <img src={NotificationLogo} alt="notifications" />
      </button>

      <div className="cart">
        <button 
          onClick={() => setshowcartpage(!showcartpage)}
        >
          <img src={Shopcart} alt="cart" />
        </button>
        <span>₹{Math.round(carttotal)}</span>
      </div>
    </div>
  );
}

export default Header;
