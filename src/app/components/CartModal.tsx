"use client";
import Image from "next/image";
import React from "react";

const CartModal = () => {
  const cartItems = false;

  return (
    <div className="absolute bg-white min-w-[280px] rounded-md right-0 shadow-md p-3 top-6 text-sm z-20">
      <h4 className="text-xl mb-4">Shopping Cart</h4>
      {cartItems ? (
        <div className="empty text-center">
          <span>Cart is empty</span>
        </div>
      ) : (
        <>
          {/* List */}
          <div className="list">
            <div className="item flex gap-4 mt-2">
              <Image
                alt="Shoes"
                width={80}
                height={100}
                src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/"
                className="object-cover rounded-md"
              />
              <div className="w-full">
                {/* Top */}
                <div className="">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="name font-semibold">Product Name</h3>
                    <div className="price bg-gray-50 rounded-sm p-1">50$</div>
                  </div>
                  {/* Desc */}
                  <div className="availability text-sm text-gray-500">
                    available
                  </div>
                </div>
                {/* Bottom */}
                <div className="flex justify-between text-sm mt-1">
                  <span className="qty text-gray-500 text-xs">Qty. 2</span>
                  <span className="text-red-400 text-xs">Remove</span>
                </div>
              </div>
            </div>

            <div className="item flex gap-4 mt-2">
              <Image
                alt="Shoes"
                width={80}
                height={100}
                src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2/"
                className="object-cover rounded-md"
              />
              <div className="w-full">
                {/* Top */}
                <div className="">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="name font-semibold">Product Name</h3>
                    <div className="price bg-gray-50 rounded-sm p-1">50$</div>
                  </div>
                  {/* Desc */}
                  <div className="availability text-sm text-gray-500">
                    available
                  </div>
                </div>
                {/* Bottom */}
                <div className="flex justify-between text-sm mt-1">
                  <span className="qty text-gray-500 text-xs">Qty. 2</span>
                  <span className="text-red-400 text-xs">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Cart */}
          <div className="bottom-cart items-center font-semibold flex justify-between border-t mt-3 pt-2">
            <span>Subtotal</span>
            <span>100$</span>
          </div>
          <p className="text-gray-500 text-sm mt-2 mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            rerum.
          </p>
          <div className="flex justify-between text-sm">
            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
              View Cart
            </button>
            <button className="rounded-md py-3 px-4 bg-black text-white">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
