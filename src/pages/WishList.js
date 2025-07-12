import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const baseUrl = "https://computersproducts-4.onrender.com";
    axios.get(`${baseUrl}/wishlist`, {
      headers: { Authorization: token }
    })
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error(err));
    
  }, [token]);

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map(p => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
