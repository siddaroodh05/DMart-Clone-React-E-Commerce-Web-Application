import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./megamenu.css";

const MegaMenu = () => {
  const [categoriesWithSub, setCategoriesWithSub] = useState([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch("https://dummyjson.com/products/categories");
        const categories = await categoriesRes.json();

        const formatted = await Promise.all(
          categories.map(async (cat) => {
            const res = await fetch(cat.url);
            const data = await res.json();

            const uniqueBrands = [...new Set(data.products.map((p) => p.brand))];
            const categoryImage = data.products[0]?.thumbnail || "";

            return {
              categoryName: cat.name,
              subcategories: uniqueBrands,
              image: categoryImage,
            };
          })
        );

        const skipCategories = [
          "Groceries",
          "Women's Dresses",
          "Home Decoration",
          "Kitchen Accessories",
          "Tops",
          "Sports Accessories",
          "Womens Dresses",
          "Womens Jewellery",
        ];

        const filtered = formatted.filter(
          (item) => item.subcategories.length > 0 && !skipCategories.includes(item.categoryName)
        );

        setCategoriesWithSub(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!visible) return null;

  return (
    <div className="mega-menu">
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="mega-grid">
          {categoriesWithSub.map((item) => (
            <div key={item.categoryName} className="mega-menu-column">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.categoryName}
                  className="category-image"
                  onClick={() => {
                    navigate(`/category/${item.categoryName}`);
                    setVisible(false);
                  }}
                  style={{ cursor: "pointer" }}
                />
              )}

              <h4
                onClick={() => {
                  navigate(`/category/${item.categoryName}`);
                  setVisible(false);
                }}
                style={{ cursor: "pointer" }}
              >
                {item.categoryName}
              </h4>

              <ul>
                {item.subcategories.map((sub) => (
                  <li
                    key={sub}
                    onClick={() => {
                      navigate(
                        `/category/${item.categoryName}?brand=${encodeURIComponent(sub)}`
                      );
                      setVisible(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
