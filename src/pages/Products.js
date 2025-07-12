import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();
  const baseUrl = "https://computersproducts-4.onrender.com";
 
  useEffect(() => {
    
    axios.get(`${baseUrl}/products`,  {
      headers: { Authorization: token }
    })
      // .then((res) => res.json())
      // .then(setProducts);
       .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [token]);
  
  return (
   <div className="products-wrapper">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Products</h2>

      <ul className="products-grid">
        {products.map((p) => (
          <li key={p._id} className="product-card">
            {/* If you have images: <img src={p.imageUrl} alt={p.name} /> */}
            <div className="product-content">
              <h3 className="product-title">{p.name}</h3>
              <p>{p.category}</p>
                 <p>{p.quantity}</p>
                    <p>{p.category}</p>
              
              <span className="product-price">₹{p.price}</span>
              {/* Example action button */}
              {/* <button onClick={() => handleAddToCart(p._id)}>Add to Cart</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}