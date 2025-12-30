"use client";

import Image from "next/image";
import { useCartStore } from "../hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";

const CartModal = () => {
  const { items, removeItem } = useCartStore();

  return (
    <div className="absolute bg-white min-w-[320px] border-t cursor-default rounded-md right-0 shadow-md p-3 top-6 text-sm z-20">
      <h4 className="text-sm pb-2 border-b">Shopping Cart</h4>
      {!items ? (
        <div className="empty text-center pt-2">
          <span>Cart is empty</span>
        </div>
      ) : (
        <>
          {/* List */}
          <div className="list overflow-y-auto max-h-[300px]">
            {items.map((item) => (
              <div
                className="item flex gap-4 mt-3"
                key={`${item.productId}-${item.variantId ?? "default"}`}
              >
                {item.productImage && (
                  <Image
                    alt={item.productName ?? "Product image"}
                    width={80}
                    height={100}
                    src={wixMedia.getScaledToFillImageUrl(
                      item.productImage,
                      72,
                      96,
                      {}
                    )}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="w-full">
                  {/* Top */}
                  <div className="">
                    {/* Title */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="name font-semibold">{item.productName}</h3>
                      <div className="price bg-gray-50 rounded-sm p-1">
                        {item.quantity} x {item.price}
                      </div>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className="flex justify-between text-sm mt-1">
                    <div className="info flex-col">
                      <span className="gty text-gray-500 text-xs">
                        Qty. {item.quantity}
                      </span>

                      <span className="variant text-gray-500 text-[10px] ml-2">
                        {item?.selectedVariant &&
                          Object.entries(item.selectedVariant).map(
                            ([key, value]) => (
                              <small className="block leading-tight" key={key}>
                                {value}
                              </small>
                            )
                          )}
                      </span>
                    </div>
                    <div className="price-modal"></div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="border-0 text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom Cart */}
          <div className="bottom-cart items-center font-semibold flex justify-between border-t mt-3 pt-2">
            <span>Subtotal</span>
            {/* <span>{items?.subtotal?.formattedAmount}</span> */}
          </div>
          {/* <p className="text-gray-500 text-sm mt-2 mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            rerum.
          </p> */}
          <div className="flex justify-between text-xs mt-3">
            <button className="rounded-md py-2 px-4 ring-1 ring-gray-300">
              View Cart
            </button>
            <button className="rounded-md py-2 px-4 bg-black text-white">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
