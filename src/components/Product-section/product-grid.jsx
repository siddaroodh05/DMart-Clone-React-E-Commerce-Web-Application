import "./product-section-style.css";
import { useNavigate } from "react-router-dom";

function Productsection({products,setProducts,cartitems,setcartitems,carttotal,setcarttotal,cartitemdetails,setcartitemdetails}){
  return (
    <div className="product">
      <div className="breadcrumb-row">
        <p>Grocery</p>
        <p> </p>
        <p>DMart Grocery</p>
      </div>
      <h1>DMart Grocery</h1>
      <Productgrid 
        cartitems={cartitems} 
        setcartitems={setcartitems} 
        carttotal={carttotal} 
        setcarttotal={setcarttotal} 
        cartitemdetails={cartitemdetails}  
        setcartitemdetails={setcartitemdetails} 
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

function Productgrid({products,setProducts,cartitems,setcartitems,carttotal,setcarttotal,cartitemdetails,setcartitemdetails}) {
  const navigate=useNavigate();

  return (
    <section className="product-section">
      <div className="product-grid">
        {products.map((product) => (
          <div 
            onDoubleClick={()=>{
              navigate("/product",{ state: { product } })
            }} 
            className="product-card" 
            key={product.id}
          >
            <img src={product.thumbnail} width="100" />
            <h3>{product.title}</h3>
            <p>Price: ₹{product.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const existingItem = cartitemdetails.find(
                  (item) => item.Name === product.title
                );

                if (existingItem) {
                  setcartitemdetails((prevItems) =>
                    prevItems.map((item) =>
                      item.Name === product.title
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    )
                  );
                  setcarttotal(carttotal + product.price);
                  setcartitems(cartitems + 1);
                } else {
                  setcartitems(cartitems + 1);
                  setcarttotal(carttotal + product.price);
                  setcartitemdetails((prevItems) => [
                    ...prevItems,
                    {
                      image: product.thumbnail,
                      Name: product.title,
                      price: product.price,
                      quantity: 1,
                      Weight: product.weight*10,
                      savings:(product.price*product.discountPercentage)/100
                    },
                  ]);
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Productsection;
