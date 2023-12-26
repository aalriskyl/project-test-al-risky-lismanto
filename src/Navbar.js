// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './styles/navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/" className="site-title">
        Suitmedia
      </Link>
      <ul>
        <li className={isActive("/work") ? "active" : ""}>
          <Link to="/work">Work</Link>
        </li>
        <li className={isActive("/about") ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
        <li className={isActive("/services") ? "active" : ""}>
          <Link to="/services">Services</Link>
        </li>
        <li className={isActive("/ideas") ? "active" : ""}>
          <Link to="/ideas">Ideas</Link>
        </li>
        <li className={isActive("/careers") ? "active" : ""}>
          <Link to="/careers">Careers</Link>
        </li>
        <li className={isActive("/contact") ? "active" : ""}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
