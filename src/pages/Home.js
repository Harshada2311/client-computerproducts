import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
  return (
    <div className="home-container">
         <img
    src="https://www.unleashedsoftware.com/media/lx5bo3cl/whats-the-average-cost-of-an-inventory-management-system-og-image.jpg?width=1200&height=630&v=1dafa9a3224c8b0"
    alt="background"
    className="home-bg"
  />
      <div className="overlay">
        <div className="home-content">
          <h1>Welcome to Our Hardware Inventory Hub</h1>
          <p>Manage your products, stock, and orders in one place efficiently.</p>
          <div className="home-buttons">
            <Link to="/register" className="btn">Register</Link>
            <Link to="/login" className="btn btn-outline">Already Registered? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
