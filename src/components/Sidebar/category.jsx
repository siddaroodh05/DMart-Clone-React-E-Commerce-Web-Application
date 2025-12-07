import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Categorysection({ 
  cartitems, 
  setcartitems, 
  carttotal, 
  setcarttotal, 
  cartitemdetails, 
  setcartitemdetails, 
  totalsavings,
  products,
  setproducts
}) {
  const { categoryName } = useParams(); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brand = searchParams.get("brand");

  const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <>
      <div className="product">
        <div className="breadcrumb-row">
          <h1 style={{ margin: "0" }}>DMart</h1>
          <p>›</p>
          <p>{formattedCategory}</p>
          {brand && (
            <>
              <p>›</p>
              <p>{brand}</p>
            </>
          )}
        </div>

        <Productgrid 
          categoryName={categoryName}
          brand={brand} 
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
      </div>
    </>
  );
}

function Productgrid({ 
  categoryName, 
  brand, 
  cartitems, 
  setcartitems, 
  carttotal, 
  setcarttotal, 
  cartitemdetails, 
  setcartitemdetails, 
  totalsavings,
  products,
  setproducts
}) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllProductImages = (product) => {
    const imagesArray = product?.images || [];
    const thumbnail = product?.thumbnail || '';
    if (imagesArray.length > 0) {
      return [...imagesArray, thumbnail];
    }
    return thumbnail ? [thumbnail] : [];
  };

  useEffect(() => {
    async function getCategoryProducts() {
      setLoading(true);

      try {
        const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        const data = await response.json();

        let filtered = data.products;
        if (brand) {
          filtered = filtered.filter((p) => p.brand === brand);
        }

        setproducts(data.products);
        setFilteredProducts(filtered);
        setTimeout(() => setLoading(false), 400);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setLoading(false);
      }
    }

    getCategoryProducts();
  }, [categoryName, brand, setproducts]);

  if (loading) {
    return (
      <section className="product-section">
        <div className="product-grid" style={{ opacity: 0.6 }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="product-card" style={{ animation: "pulse 1.2s infinite" }}>
              <div style={{
                width: "100%",
                height: "120px",
                background: "#eee",
                borderRadius: "6px",
                marginBottom: "10px"
              }}></div>
              <div style={{
                width: "80%",
                height: "15px",
                background: "#ddd",
                borderRadius: "4px",
                marginBottom: "5px"
              }}></div>
              <div style={{
                width: "60%",
                height: "15px",
                background: "#ddd",
                borderRadius: "4px"
              }}></div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="product-section">
      <div className="product-grid" style={{ animation: "fadeIn 0.4s ease-in" }}>
        {filteredProducts.map((product) => (
          <div 
            onClick={() => navigate("/product", { 
              state: { 
                product: {
                  ...product,
                  allImages: getAllProductImages(product)
                }
              }
            })}
            className="product-card"
            key={product.id}
          >
            <img src={product.thumbnail} width="100" alt={product.title} />
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
                      images: getAllProductImages(product),
                      Name: product.title,
                      price: product.price,
                      quantity: 1,
                      Weight: product.weight * 10,
                      savings: (product.price * product.discountPercentage) / 100
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
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Categorysection;
