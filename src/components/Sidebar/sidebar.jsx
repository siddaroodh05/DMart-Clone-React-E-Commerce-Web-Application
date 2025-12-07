import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Groceries() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=200");
        const data = await res.json();

        const allCategories = [
          ...new Set(data.products.map((item) => item.category)),
        ];

        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="categorieslist">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-box"
          onClick={() => navigate(`/category/${category}`)}
        >
          <span>{category}</span>
        </div>
      ))}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="list">
      <Groceries />
    </div>
  );
}

export default Sidebar;
