import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { MdAddShoppingCart } from "react-icons/md";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

// import { addToCart } from '../redux/cartSlice'

//  {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }
const Home = () => {
  const { items, loading } = useSelector((state) => state.products);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  let cart = useSelector((state) => state.cart.items);
  console.log(cart);
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {/* ✅ Cart Button (outside grid) */}
      <div className="flex justify-end p-4">
        <Link to="/cart" className="relative">
          {/* 🛒 Icon */}
          <MdShoppingCart size={28} />

          {/* 🔴 Badge */}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* ✅ Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="border p-3 rounded shadow flex flex-col justify-between h-[320px]"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-32 object-contain mx-auto"
            />

            <h2 className="text-sm mt-2 line-clamp-2">{product.title}</h2>
            <p className="font-bold text-sm mt-1 ">${product.price}</p>

            <button
              className="bg-blue-500 text-white p-2 rounded-full mt-2 mx-auto w-fit"
              onClick={() => dispatch(addToCart(product))}
            >
              <MdAddShoppingCart />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
