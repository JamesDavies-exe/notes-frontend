import { Link } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
  return (
    <>
      <nav class="nav">
        <div class="nav__title">NOTES</div>
        <ul class="nav__list">
          <li class="nav__item">Services</li>
          <li class="nav__item">About Us</li>
          <li class="nav__item">Blog</li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
