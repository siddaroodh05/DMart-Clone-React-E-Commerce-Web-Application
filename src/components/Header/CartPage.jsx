import "./CartPage.css";
import Decrerese from "../../assets/icons/remove.svg";
import Increase from "../../assets/icons/add.svg";
import Close from "../../assets/icons/close.svg";
import Delete from "../../assets/icons/delete.svg";
import Shopphoto from "../../assets/logos/sizemini_97.jpg";
import { useNavigate } from "react-router-dom";

function CartPage({
  cartitems,
  carttotal,
  cartitemdetails,
  setcartitemdetails,
  setcarttotal,
  setcartitems,
  totalsavings,
  settotalsavings
}) {
  const navigate = useNavigate();

  const updateQuantity = (index, type) => {
    setcartitemdetails(prev =>
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1)
          };
        }
        return item;
      })
    );
  };

  function removeall(){
    setcartitems(0);
    setcarttotal(0);
    setcartitemdetails([]);
    settotalsavings(0);
  }

  const removeItem = (index) => {
    setcartitemdetails(prev =>
      prev.filter((item, i) => i !== index)
    );
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
  };

  return (
    <div className="cart-wrapper">
      {cartitems > 0 ? (
        <>
          <div className="cart-left">
            <h2 className="cart-title">
              My Cart <span>({cartitems})</span>
            </h2>

            <div className="cart-header">
              <div className="col-product">Product</div>
              <div className="col-pay">You Pay</div>
              <div className="col-save">You Save</div>
              <div className="col-items">No. of items</div>
            </div>

            {cartitemdetails.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <div className="product-info">
                  <img src={item.image} style={{cursor:"pointer"}} onClick={() => handleProductClick(item)} className="product-img" alt="product" />
                  <div>
                    <p className="prod-name" style={{cursor:"pointer"}} onClick={() => handleProductClick(item)}>{item.Name}</p>
                    <p className="prod-variant">
                      Variant: <span>{item.Weight}g</span>
                    </p>
                  </div>
                </div>

                <div className="you-pay">
                  ₹{Math.round(item.price * item.quantity)}
                </div>

                <div className="you-save">
                  ₹{Math.round(item.savings * item.quantity)}
                </div>

                <div className="rightbox">
                  <div className="quantitymeasure">
                    {item.quantity > 1 ? (
                      <button
                        className="b"
                        onClick={() => {
                          updateQuantity(idx, "dec");
                          setcartitems(prev => prev - 1);
                          setcarttotal(prev => prev - item.price);
                        }}
                      >
                        <img src={Decrerese} />
                      </button>
                    ) : (
                      <button
                        className="remove-inside"
                        onClick={() => {
                          removeItem(idx);
                          setcartitems(prev => prev - 1);
                          setcarttotal(prev => prev - item.price);
                        }}
                      >
                        <img src={Delete} />
                      </button>
                    )}

                    <span className="qty">{item.quantity}</span>

                    <button
                      className="b"
                      onClick={() => {
                        updateQuantity(idx, "inc");
                        setcartitems(prev => prev + 1);
                        setcarttotal(prev => prev + item.price);
                      }}
                    >
                      <img src={Increase} />
                    </button>
                  </div>

                  <button
                    className="removebtn"
                    onClick={() => {
                      removeItem(idx);
                      setcartitems(prev => prev - item.quantity);
                      setcarttotal(prev => prev - item.quantity * item.price);
                    }}
                  >
                    <img src={Close} />
                  </button>
                </div>
              </div>
            ))}

            <button className="remove-all" onClick={()=>{
              removeall();
            }}>
              <img src={Delete} alt="" />
              <span>Remove all</span>
            </button>
          </div>

          <div className="cart-right">
            <h3 className="summary-title">Price Summary</h3>

            <div className="summary-row">
              <span>Cart Total</span>
              <span>₹{Math.round(carttotal)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charge</span>
              <span className="extra-price">+ Extra</span>
            </div>

            <div className="summary-row">
              <span>Savings</span>
              <span className="savings">
                ₹{Math.round(totalsavings)}
              </span>
            </div>

            <div className="warning-box">
              Your minimum order value should be ₹500.
            </div>

            <button className="checkout-btn">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart-wrapper">
          <img src={Shopphoto} className="empty-img" alt="empty" />
          <h1 className="empty-title">Your cart is empty</h1>
          <p className="empty-text">Add some products to your cart and start shopping!</p>
          <button
            className="start-shopping-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            START SHOPPING
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
