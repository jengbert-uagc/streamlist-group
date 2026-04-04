import React from "react";

function Cart({ cartItems, removeFromCart, updateCartQuantity }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="card cart-card">
      <h2>Shopping Cart</h2>
      <p>Review your items, update quantities, and remove products.</p>

      <div className="cart-summary">
        <span>Total Unique Items: {cartItems.length}</span>
        <span>Total Quantity: {totalItems}</span>
        <span className="cart-total">Total: ${totalPrice.toFixed(2)}</span>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add products from the Movies page.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)} each</p>
              </div>

              <div className="cart-item-actions">
                <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateCartQuantity(item.id, e.target.value)}
                />
                <span className="cart-line-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
