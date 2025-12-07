import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Banner1 from "../../assets/logos/banner1.webp";
import Banner2 from "../../assets/logos/banner2.webp";
import Banner3 from "../../assets/logos/banner3.webp";
import BeautyBanner from "../../assets/logos/beautybanner.webp";
import Groceries from "../../assets/logos/groceries.webp";
import Groceries1 from "../../assets/logos/groceries1.webp";
import smartphones from "../../assets/logos/smartphones.webp";
import kitchenaccessories from "../../assets/logos/kitchenaccessories.webp";
import phonebanner from "../../assets/logos/phonebanner.webp";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-wrapper">
      <div className="carousel-container">
        <div className="carousel-track">
          <img src={Banner1} alt="slide1" />
          <img src={Banner2} onClick={() => navigate("/category/groceries")} alt="slide2" />
          <img src={Banner3} onClick={() => navigate("/category/Home-decoration")} alt="slide3" />
        </div>
      </div>

      <div className="home-two-banners">
        <img src={BeautyBanner} onClick={() => navigate("/category/beauty")} className="banner-img" alt="kitchenfest" />
      </div>

      <div className="popular-categories">
        <h2 className="section-title">Popular Categories</h2>
        <div className="category-cards">
          <div
            className="category-card"
            onClick={() => navigate("/category/groceries")}
          >
            <div className="category-card-img"> <img src={Groceries} alt="Groceries" /></div>
            <p>Groceries</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/category/beauty")}
          >
            <div className="category-card-img"> <img src={Groceries1} alt="Fruits" /></div>
            <p>Beauty</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/category/smartphones")}
          >
            <div className="category-card-img"> <img src={smartphones} alt="Phones" /></div>
            <p>Smartphones</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/category/Kitchen-accessories")}
          >
            <div className="category-card-img"> <img src={kitchenaccessories} alt="Kitchen" /></div>
            <p>Kitchen Items</p>
          </div> 
        </div>
      </div>
      
      <div className="home-two-banners">
        <img src={phonebanner} onClick={() => navigate("/category/smartphones")} className="banner-img" alt="kitchenfest" />
      </div>
      
      <footer className="copyright">
        &copy; 2025 I built this for learning purposes. Not for commercial use.
      </footer>
    </div>
  );
}
