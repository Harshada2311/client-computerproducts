import { Link } from "react-router-dom";
//import "../CSS/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Hardware Inventory Hub</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to = "/register">Register</Link></li>
        <li><Link to="/Wishlist">My WishList</Link></li> 
      </ul>
    </nav>
  );
}
