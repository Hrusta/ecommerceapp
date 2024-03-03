import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Cart.css";

const Cart = ({ itemCount, onClick }) => {
  return (
    <div className="cart">
      <button className="cart-button" onClick={onClick}>
        <FaShoppingCart className="cart-icon" />
        <span className="item-count">{itemCount}</span>
      </button>
    </div>
  );
};

export default Cart;
