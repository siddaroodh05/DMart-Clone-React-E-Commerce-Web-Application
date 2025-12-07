import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./search.css";

function SearchResultsection({
  cartitems,
  setcartitems,
  carttotal,
  setcarttotal,
  cartitemdetails,
  setcartitemdetails,
  totalsavings
}) {
  const location = useLocation();
  const { results = [] } = location.state || {};
  
  const searchQuery = location.state?.query || '';
  const hasValidSearch = results?.length > 0 || searchQuery.trim();

  if (!hasValidSearch) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", marginLeft: "220px", marginTop: "100px" }}>
        <h2 style={{ color: "#666", marginBottom: "10px" }}>No search performed</h2>
        <p style={{ color: "#999", marginBottom: "20px" }}>Please enter a search term and try again.</p>
      </div>
    );
  }

  return (
    <div className="product">
      <div className="breadcrumb-row">
        <h1 style={{ margin: "0" }}>DMart</h1>
        <p>›</p>
        <h3>Search Results {searchQuery && `for "${searchQuery}"`}</h3>
        {results.length === 0 && <span style={{ color: "#999" }}>(0 results)</span>}
      </div>

      {results.length > 0 ? (
        <Productgrid
          products={results}
          cartitems={cartitems}
          setcartitems={setcartitems}
          carttotal={carttotal}
          setcarttotal={setcarttotal}
          cartitemdetails={cartitemdetails}
          setcartitemdetails={setcartitemdetails}
          totalsavings={totalsavings}
        />
      ) : (
        <div className="empty-search-content">
          <h3 className="empty-title">No products found</h3>
          <p className="empty-subtitle">
            Try adjusting your search terms or check spelling.
          </p>
        </div>
      )}
    </div>
  );
}

function Productgrid({
  products: initialProducts,
  cartitems,
  setcartitems,
  carttotal,
  setcarttotal,
  cartitemdetails,
  setcartitemdetails,
  totalsavings
}) {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(initialProducts);
    setTimeout(() => setLoading(false), 300);
  }, [initialProducts]);

  if (loading) {
    return (
      <section className="product-section">
        <div className="product-grid" style={{ opacity: 0.6 }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="product-card"
              style={{ animation: "pulse 1.2s infinite" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  background: "#eee",
                  borderRadius: "6px",
                  marginBottom: "10px"
                }}
              ></div>
              <div
                style={{
                  width: "80%",
                  height: "15px",
                  background: "#ddd",
                  borderRadius: "4px",
                  marginBottom: "5px"
                }}
              ></div>
              <div
                style={{
                  width: "60%",
                  height: "15px",
                  background: "#ddd",
                  borderRadius: "4px"
                }}
              ></div>
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
      <div
        className="product-grid"
        style={{ animation: "fadeIn 0.4s ease-in" }}
      >
        {products.map((product) => (
          <div
            onClick={() =>
              navigate("/product", { 
                state: { 
                  product: {
                    ...product,
                    allImages: product.images || [product.thumbnail || product.image]
                  }
                } 
              })
            }
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
                      Name: product.title,
                      title: product.title,
                      brand: product.brand,
                      category: product.category,
                      rating: product.rating,
                      description: product.description,
                      weight: product.weight,
                      price: product.price,
                      quantity: 1,
                      Weight: product.weight * 10,
                      savings: (product.price * (product.discountPercentage || 0)) / 100
                    }
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

export default SearchResultsection;
