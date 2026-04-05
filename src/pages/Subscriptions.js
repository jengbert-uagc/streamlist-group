import React, { useState } from "react";
import list from "../data";

function Subscriptions({ addToCart }) {
  const [warning, setWarning] = useState("");

  const handleAddToCart = (item) => {
    const result = addToCart(item);
    if (!result.success) {
      setWarning(result.message);
      return;
    }

    setWarning("");
  };

  return (
    <div className="card">
      <h2>Subscriptions</h2>
      <p>Select a subscription or EZTech accessory and add it to your cart.</p>
      {warning && <p className="warning-label">{warning}</p>}

      <div className="movie-grid">
        {list.map((item) => (
          <div key={item.id} className="movie-card">
            {item.img && (
              <img src={item.img} alt={item.service} className="movie-poster" />
            )}

            <h3>{item.service}</h3>
            <p>{item.serviceInfo}</p>
            <p>
              <strong>${item.price.toFixed(2)}</strong>
            </p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
