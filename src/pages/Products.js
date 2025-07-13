import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import '../App.css'


//import { FaHeart, FaRegHeart } from 'react-icons/fa';
//import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);
  const baseUrl = "https://computersproducts-4.onrender.com";
  //const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const productRes = await axios.get(`${baseUrl}/products`, {
          headers: { Authorization: token }
        });
        setProducts(productRes.data);

        const wishlistRes = await axios.get(`${baseUrl}/wishlist`, {
          headers: { Authorization: token }
        });
        setWishlistIds(wishlistRes.data.map(p => p._id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  const toggleWishlist = async (productId) => {
    try {
      const isWishlisted = wishlistIds.includes(productId);

      if (isWishlisted) {
        await axios.delete(`${baseUrl}/wishlist/${productId}`, {
          headers: { Authorization: token }
        });
        setWishlistIds(prev => prev.filter(id => id !== productId));
      } else {
        const res = await axios.post(`${baseUrl}/wishlist/${productId}`, {}, {
          headers: { Authorization: token }
        });
        setWishlistIds(res.data); // updated wishlist from backend
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="products-wrapper">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}> All Products</h1>
      <ul className="products-grid">
        {products.map((p) => (
          <li key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <div className="product-content">
              <h3 className="product-title">{p.name}</h3>
              <p>{p.description}</p>
              <span className="product-price">₹{p.price}</span>
              <button className="btn-wishlist" onClick={() => toggleWishlist(p._id)} >
                {wishlistIds.includes(p._id) ? '💖 Wishlist' : '🤍 Wishlist'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}