import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQty, decrementQty } from "../redux/cartSlice";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  let dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">
        ← Continue Shopping
      </Link>
      <h1 className="text-xl font-bold mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-3 mb-3"
          >
            <img src={item.image} className="h-16 w-16 object-contain" />
            <div className="flex-1">
              <h2 className="text-sm">{item.title}</h2>
              <p className="font-bold">${item.price}</p>
            </div>
            <button
              onClick={() => dispatch(decrementQty(item.id))}
              className="bg-gray-300 px-2"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => {
                dispatch(incrementQty(item.id));
              }}
              className="bg-gray-300 px-2"
            >
              +
            </button>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              <MdDelete />
            </button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <h2 className="text-lg font-bold mt-4">Total: ${total.toFixed(2)}</h2>
      )}
      <Link to="/checkout">
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Proceed to Checkout</button></Link>
    </div>
  );
};

export default Cart;
