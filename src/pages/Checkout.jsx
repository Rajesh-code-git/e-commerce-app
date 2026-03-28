import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  let nav = useNavigate();
  let dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  const handleOrder = () => {
    dispatch(clearCart());
    nav("/success");
  };
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">CheckOut</h1>
      {/*User Details */}
      <div className="mb-4">
        <input placeholder="Name" className="border p-2 w-full mb-2" />
        <input placeholder="Address" className="border p-2 w-full mb-2" />
        <input placeholder="Phone" className="border p-2 w-full" />
      </div>
      {/*Order Summary*/}
      <div className="border p-3 mb-4">
        <h2 className="font-bold mb-2">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.title}*{item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
        <h3 className="font-bold mt-2">Total:${total.toFixed(2)}</h3>
      </div>
      {/*Place Order*/}
      <button
        onClick={handleOrder}
        className="bg-green-500 text-white w-full p-3 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
