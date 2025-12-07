import Menu from "../../assets/icons/menu.svg";
import "./headerliststyle.css";
import MegaMenu from "../Megamenu";
import { useState, useRef, useEffect } from "react";

function ListContainer() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMegaMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div className="header-list-container" ref={menuRef}>
      <AllCategories_Menu onClick={() => setShowMegaMenu((prev) => !prev)} />
      <OffersBanner />
      {showMegaMenu && <MegaMenu />}
    </div>
  );
}

function AllCategories_Menu({ onClick }) {
  return (
    <div className="categories_menu" onClick={onClick}>
      <img src={Menu} alt="menu" />
      <span>All Categories</span>
    </div>
  );
}

function OffersBanner() {
  const offers = [
    "🎉 Upto 50% off on Home Appliances – Hurry!",
    "🍲 Buy 1 Get 1 Free on Ready To Cook items today!",
    "🍳 Flat 30% off on Cookware – Limited period!",
    "🧹 Special Deals on Cleaners & Detergents, grab now!",
    "🍽️ Exclusive Discounts on Serveware for members!",
    "🧴 Mega Sale on Detergent & Fabric Care till weekend!"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const duration = 4000 + offers[currentIndex].length * 30;
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentIndex, offers]);

  return (
    <div className="offers-banner-wrapper">
      {offers.map((offer, index) => (
        <div
          key={index}
          className={`offer-item ${index === currentIndex ? "animate" : ""}`}
        >
          {offer}
        </div>
      ))}
    </div>
  );
}

export default ListContainer;
