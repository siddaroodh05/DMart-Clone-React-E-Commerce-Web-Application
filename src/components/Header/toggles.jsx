import "./signinpagestyle.css";
import "./viewcart-style.css";
import Shopphoto from "../../assets/logos/sizemini_97.jpg";
import Cancel from "../../assets/icons/cancel.svg";
import Decrerese from "../../assets/icons/remove.svg";
import Increase from "../../assets/icons/add.svg";
import Close from "../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";
import Delete from "../../assets/icons/delete.svg";

export function SigninPage() {
  return (
    <div className="sign_in_div">
      <h2>Sign In</h2>
      <input type="text" placeholder="Username" className="input-box" />
      <input type="password" placeholder="Password" className="input-box" />
      <button className="login-btn">Login</button>
      <div className="image_div">
        <img src={Shopphoto} className="signin-img" alt="Sign In" />
      </div>
    </div>
  );
}

export function NotificationPage({onClose}) {
  return (
    <div className="notification_div">
      <div className="notification-header">
        <h2>Notifications</h2>
        <button className="removebttn" onClick={onClose}>
          <img src={Cancel} alt="close" />
        </button>
      </div>

      <div className="notification-content">
        <p>No new notifications</p>
      </div> 
    </div>
  );
}

export function Viewcartpage({
  cartitems, carttotal, cartitemdetails, setcartitemdetails, 
  setcarttotal, setcartitems, setshowcartpage, totalsavings, products, setproducts
}) {
  const navigate = useNavigate();
  
  const updateQuantity = (index, type) => {
    setcartitemdetails(prev => 
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity: type === "inc"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1)
          };
        }
        return item;
      })
    );
  };

  const removeItem = (index) => {
    setcartitemdetails(prev => prev.filter((item, i) => i !== index));
  };

  const handleProductClick = (productinfo) => {
    navigate("/product", { 
      state: { 
        product: {
          ...productinfo,
          allImages: productinfo.images || [productinfo.image || '']
        }
      } 
    });
    setshowcartpage(false);
  };

  return (
    <>
      <div className="cartcontainer">
        <div className="top">
          <div className="left">
            <p className="cart">My cart</p>
            <p className="items">{cartitems} items</p>
          </div>

          <div className="right">
            <div className="right-left">
              <p className="st">Savings</p>
              <p className="saved">₹{Math.round(totalsavings)}</p>
            </div>

            <div className="right-right">
              <p className="st">Cart total</p>
              <p className="carttotal">₹{Math.round(carttotal)}</p>
            </div>
          </div>
        </div>

        {cartitems > 0 ? (
          <div className="bottom">
            {cartitemdetails.map((productinfo, idx) => (
              <div className="cartitem" key={idx}>
                <div className="cartitemimage">
                  <img 
                    src={productinfo.image} 
                    onClick={() => handleProductClick(productinfo)}
                    alt={productinfo.Name}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div className="cartiteminfo">
                  <div 
                    className="itemname" 
                    style={{ cursor: "pointer" }}
                    onClick={() => handleProductClick(productinfo)}
                  >
                    {productinfo.Name}
                  </div>

                  <div className="paydetails">
                    <div className="paydetailsleft">
                      You pay: ₹{Math.round(productinfo.price * productinfo.quantity)}
                    </div>
                    <div className="paydetailsright">
                      Saved: ₹{Math.round(productinfo.savings * productinfo.quantity)}
                    </div>
                  </div>

                  <div className="quantitydetails">
                    <p>Variant: {productinfo.Weight}g</p>
                    <div className="rightbox">
                      <div className="quantitymeasure">
                        {productinfo.quantity > 1 ? (
                          <button
                            className="b"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(idx, "dec");
                              setcartitems((prev) => prev - 1);
                              setcarttotal((prev) => prev - productinfo.price);
                            }}
                          >
                            <img src={Decrerese} />
                          </button>
                        ) : (
                          <button
                            className="remove-inside"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(idx);
                              setcartitems((prev) => prev - 1);
                              setcarttotal((prev) => prev - productinfo.price);
                            }}
                          >
                            <img src={Delete} />
                          </button>
                        )}

                        <span className="qty">{productinfo.quantity}</span>

                        <button
                          className="b"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(idx, "inc");
                            setcartitems((prev) => prev + 1);
                            setcarttotal((prev) => prev + productinfo.price);
                          }}
                        >
                          <img src={Increase} />
                        </button>
                      </div>

                      <button
                        className="removebtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(idx);
                          setcartitems((prev) => prev - productinfo.quantity);
                          setcarttotal((prev) => prev - productinfo.quantity * productinfo.price);
                        }}
                      >
                        <img src={Close} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="view-cart-container">
              <button
                className="view-cart-btn"
                onClick={() => {
                  navigate("/cart");
                  setshowcartpage(false);
                }}
              >
                View Full Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="bottom empty-cart" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            gap: "20px",
            backgroundColor: "white",
            padding: "40px"
          }}>
            <img src={Shopphoto} alt="empty-cart" style={{
              width: "100%",
              height: "auto",
              objectFit: "contain"
            }} />

            <h1 style={{ fontSize: "20px", color: "#333" }}>
              No items in your cart
            </h1>

            <button
              className="start-btn"
              onClick={() => {
                setshowcartpage(false);
                navigate("/");
              }}
            >
              START SHOPPING
            </button>
          </div>
        )}
      </div> 
    </>
  );
}
