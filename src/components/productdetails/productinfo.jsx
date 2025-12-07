import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./productstyle.css";

function Productinfo({cartitems,setcartitems,carttotal,setcarttotal,cartitemdetails,setcartitemdetails}) {
  const location = useLocation();
  const {product} = location.state || {};
  const cartItem = location.state?.cartItem;

  const [changeimage, setchangeimage] = useState('');

  const getAllImages = (product) => {
    if (product?.allImages?.length > 0) return product.allImages;
    if (product?.images?.length > 0) return product.images;
    const singleImage = product?.image || product?.thumbnail || cartItem?.image || '';
    return singleImage ? [singleImage] : [];
  };

  const images = getAllImages(product || cartItem);
  
  useEffect(() => {
    if (images.length > 0 && images[0]) {
      setchangeimage(images[0]);
    }
  }, [product, cartItem]);

  const displayProduct = product || cartItem;

  if (!displayProduct) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center", marginLeft: "220px" }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="Productinfo">
      <Productimages images={images} changeimage={changeimage} setchangeimage={setchangeimage} />
      <Productimage changeimage={changeimage} />
      <Productdet 
        product={displayProduct} 
        cartitems={cartitems} 
        setcartitems={setcartitems} 
        carttotal={carttotal} 
        setcarttotal={setcarttotal} 
        cartitemdetails={cartitemdetails} 
        setcartitemdetails={setcartitemdetails} 
      />
    </div>
  );
}

function Productimages({ images, changeimage, setchangeimage }) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="productimages">
      {images.map((img, index) => (
        img && (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${changeimage === img ? 'active' : ''}`}
            onClick={() => setchangeimage(img)}
          />
        )
      ))}
    </div>
  );
}

function Productimage({ changeimage }) {
  return (
    <div className="product-image-box">
      {changeimage ? (
        <img src={changeimage} alt="Main Product" />
      ) : (
        <div className="no-image-placeholder">No Image</div>
      )}
    </div>
  );
}

function Productdet({ product, cartitems, setcartitems, carttotal, setcarttotal, cartitemdetails, setcartitemdetails }) {
  const discountPercentage = product?.discountPercentage || 0;
  const price = product?.price || 0;
  const discount = Math.round((discountPercentage / 100) * price);
  const finalPrice = Math.round(price - discount);

  const handleAddToCart = () => {
    const existingItem = cartitemdetails.find(
      (item) => item.Name === (product.title || product.Name)
    );

    if (existingItem) {
      setcartitemdetails((prevItems) =>
        prevItems.map((item) =>
          item.Name === (product.title || product.Name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setcarttotal(carttotal + price);
      setcartitems(cartitems + 1);
    } else {
      setcartitems(cartitems + 1);
      setcarttotal(carttotal + price);
      setcartitemdetails((prevItems) => [
        ...prevItems,
        {
          image: product.thumbnail || product.image || product.image,
          Name: product.title || product.Name,
          title: product.title || product.Name,
          brand: product.brand || 'N/A',
          category: product.category || 'N/A',
          rating: product.rating || 0,
          description: product.description || '',
          weight: product.weight || 0,
          price: price,
          quantity: 1,
          Weight: (product.weight || 0) * 10,
          savings: (price * discountPercentage) / 100
        },
      ]);
    }
  };

  return (
    <div className="product-detail-box">
      <h2 style={{ fontSize: "20px", display: "flex", alignItems: "center" }}>
        {product.title || product.Name || 'Product'}:{" "}
        <span style={{ fontWeight: "normal" }}>
          {product.weight ? `${product.weight*100}g` : 'N/A'}
        </span>
      </h2>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <p className="price">₹{finalPrice}</p>
          {discount > 0 && (
            <p style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgrey",
              color: "green",
              borderRadius: "3px",
              fontWeight: "bold",
              padding: "3px",
            }}>
              ₹{discount} OFF
            </p>
          )}
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      <div className="extra-product-info">
        <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
        <p><strong>Category:</strong> {product.category || 'N/A'}</p>
        <p><strong>Rating:</strong> ⭐ {product.rating || 0}</p>
        {product.description && <p className="description">{product.description}</p>}
        <p><strong>Warranty:</strong> 1 Year Replacement Warranty</p>
        <p><strong>Delivery:</strong> Expected in 3–5 Days</p>
      </div>
    </div>
  );
}

export default Productinfo;
