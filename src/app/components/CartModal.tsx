"use client";

import Image from "next/image";
import { useCartStore } from "../hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import Link from "next/link";

const CartModal = () => {
  const { items, removeItem } = useCartStore();

  const subtotal = items.reduce((sum, item) => {
    return sum + item.price! * item.quantity;
  }, 0);

  const item = items[0];

  console.log("cart items ", item);

  return (
    <div className="absolute bg-white min-w-[250px] border-t cursor-default rounded-md right-0 shadow-md p-3 top-6 text-sm z-20">
      <h4 className="text-sm pb-2 border-b">Shopping Cart</h4>
      {items.length == 0 ? (
        <div className="empty text-center pb-2 pt-3">
          <span>Cart is empty</span>
        </div>
      ) : (
        <>
          {/* List */}
          <div className="list overflow-y-auto max-h-[300px]">
            {items.map((item) => (
              <div
                className="item flex gap-1 mt-2"
                key={`${item.productId}-${item.variantId ?? "default"}`}
              >
                {item.productImage && (
                  <Link href={`/${item.productUrl!}`}>
                    <Image
                      alt={item.productName ?? "Product image"}
                      width={80}
                      height={100}
                      src={wixMedia.getScaledToFillImageUrl(
                        item.productImage,
                        72,
                        96,
                        {},
                      )}
                      className="object-cover"
                    />
                  </Link>
                )}
                <div className="w-full bg-gray-50 p-2">
                  {/* Top */}
                  <div className="top-cart">
                    {/* Price */}
                    <div className="price whitespace-nowrap">
                      {item.quantity} x
                      <span className="font-semibold ml-1">
                        {item.price?.toLocaleString("ro-RO", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        {item.currency}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center justify-between gap-8">
                      <Link href={`/${item.productUrl!}`}>
                        <h3 className="name font-semibold">
                          {item.productName}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className="flex justify-between text-sm">
                    <div className="info flex">
                      <span className="variant text-gray-500">
                        {item?.selectedVariant &&
                          Object.entries(item.selectedVariant).map(
                            ([key, value]) => (
                              <p
                                className="leading-tight mb-0 text-[8px]"
                                key={key}
                              >
                                {value}
                              </p>
                            ),
                          )}
                      </span>

                      <span className="gty text-gray-500 text-xs ml-2">
                        Qty. {item.quantity}
                      </span>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 text-red-400 cursor-pointer"
                      onClick={() => removeItem(item.productId, item.variantId)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom Cart */}
          <div className="bottom-cart items-center font-semibold flex justify-between border-t mt-3 pt-3">
            <span>Subtotal:</span>
            <span>
              {subtotal.toLocaleString("ro-RO", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {items[0].currency!}
            </span>
          </div>

          <div className="flex justify-center mt-3 pt-3 border-t">
            <button className="rounded-2xl ring-1 ring-primary-500 text-primary-500 px-4 py-1 text-xs hover:bg-primary-500 hover:text-white easy duration-200">
              To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
