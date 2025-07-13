import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import '../App.css'
export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();
  const baseUrl = "https://computersproducts-4.onrender.com";

  useEffect(() => {
    if (!token) return;
    axios.get(`${baseUrl}/wishlist`, {
      headers: { Authorization: token }
    })
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(`${baseUrl}/wishlist/${productId}`, {
        headers: { Authorization: token }
      });
      setWishlist(res.data); // updated wishlist
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wishlist-page">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}> My WishList</h1>
      <ul className="products-grid">
        {wishlist.map(p => (
          <li key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <div className="product-content">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <span>₹{p.price}</span>
              <button onClick={() => removeFromWishlist(p._id)} style={{ marginTop: '8px' }}>
                ❌ Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
