"use client";

// import React, { Suspense } from "react";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useMemo, useState } from "react";
import { useCartStore } from "../hooks/useCartStore";
import Link from "next/link";

const Checkout = () => {
  const { items, removeItem, updateQuantity, counter } = useCartStore();

  const handleQuantity = (
    type: "i" | "d",
    productId: string,
    variantId: string | undefined,
    stockNumber: number | undefined,
    currentQty: number,
  ) => {
    const limit = typeof stockNumber === "number" ? stockNumber : Infinity;
    const next =
      type === "d"
        ? Math.max(1, currentQty - 1)
        : Math.min(limit, currentQty + 1);

    if (next !== currentQty) updateQuantity(productId, next, variantId);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative mt-4">
      {/* Checkout Banner */}
      <div className="bg-gradient-primary-500-l px-12 flex flex-col-reverse lg:flex-row justify-center lg:h-64">
        <div className="relative h-64 lg:h-full lg:w-1/4">
          <Image
            src="/shopping-couple.svg"
            alt="Checkout"
            fill
            className="object-contain"
          />
        </div>
        <div className="lg:w-2/2 flex py-6 lg:py-0 flex-col items-center justify-center">
          <div className="content text-center">
            <h1 className="text-xl lg:text-2xl text-white leading-tight font-semi-bold">
              You’re just one step away from your order.
            </h1>
            <h5 className="text-white font-light text-lg leading-snug mt-0">
              Double-check your items, then place it confidently!
            </h5>
          </div>
        </div>
      </div>

      {items.length == 0 ? (
        <div className="empty text-center mt-20">
          <span className="text-xl font-semibold">Cart is empty</span>
        </div>
      ) : (
        <>
          <div className="grid gap-8 lg:grid-cols-2 py-10">
            {/* LEFT: Order Summary */}
            <div className="left-column">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Order Summary
                </h2>
                <span className="text-sm font-semibold text-primary-500">
                  {counter} {counter > 1 ? "Items" : "Item"}
                </span>
              </div>

              <div className="mt-5 h-px w-full bg-slate-200/70" />

              <div className="mt-6">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId ?? "default"}`}
                    className="flex gap-4 odd:bg-gray-100 even:bg-white p-4"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                      {item.productImage && (
                        <Link href={`/${item.productUrl!}`}>
                          <Image
                            alt={item.productName ?? "Product image"}
                            width={90}
                            height={110}
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
                    </div>

                    <div className="flex flex-1 items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="gap-3">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {item.productName}:
                          </p>
                          <p className="text-sm font-semibold text-primary-500">
                            {item.price?.toLocaleString("ro-RO", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            {item.currency}
                          </p>
                        </div>

                        <div className="mt-2 space-y-1 text-sm text-slate-500">
                          <span className="variant text-gray-500">
                            {item?.selectedVariant &&
                              Object.entries(item.selectedVariant).map(
                                ([key, value]) => (
                                  <p
                                    className="leading-tight mb-0 text-[10px]"
                                    key={key}
                                  >
                                    {value}
                                  </p>
                                ),
                              )}
                          </span>
                        </div>
                      </div>

                      {/* qty */}
                      <div className="bg-white ring-1 ring-gray-200 text-[12px] w-[85px] rounded-3xl flex items-center justify-between ml-4">
                        <button
                          className="cursor-pointer py-1 px-3 text-sm"
                          onClick={() =>
                            handleQuantity(
                              "d",
                              item.productId,
                              item.variantId,
                              item.stockNumber,
                              item.quantity,
                            )
                          }
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          className="cursor-pointer py-1 px-3 text-sm"
                          onClick={() =>
                            handleQuantity(
                              "i",
                              item.productId,
                              item.variantId,
                              item.stockNumber,
                              item.quantity,
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-red-400 cursor-pointer"
                        onClick={() =>
                          removeItem(item.productId, item.variantId)
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 h-px w-full bg-slate-200/70 flex items-center" />

              <div className="coupon-code flex items-center w-full justify-center mt-4">
                <input
                  type="text"
                  placeholder="Your code"
                  className="rounded-2xl w-1/2 rounded-r-none rounded-2xl border border-primary-500 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
                <button
                  type="button"
                  className="flex items-center w-1/2 rounded-2xl text-xs py-2 h-[38px] hover:opacity-80 rounded-l-none justify-center text-white bg-primary-500 right-0 py-2 px-3"
                >
                  Add Coupon Code
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Shopping Cart / Form */}
            <div className="right-column">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Shopping Cart
                </h2>
              </div>

              <div className="mt-5 h-px w-full bg-slate-200/70" />

              {/* totals card */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Subtotal:</span>
                    <span className="font-semibold text-slate-900">
                      $360.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Delivery:</span>
                    <span className="font-semibold text-slate-900">$0</span>
                  </div>
                  <div className="my-3 h-px bg-slate-200/70" />
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Total:</span>
                    <span className="text-base font-semibold text-slate-900">
                      $360.00
                    </span>
                  </div>
                </div>
              </div>

              {/* form */}
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="firstname">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      FIrst Name
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        placeholder="FIrst Name"
                      />
                    </div>
                  </div>

                  <div className="name">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        placeholder="Name"
                      />
                    </div>
                  </div>

                  <div className="phone">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        placeholder="Phone"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="email">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="city">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      City
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        placeholder="Bucharest"
                      />
                    </div>
                  </div>

                  <div className="country">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      Country
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        placeholder="Romania"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Address
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    placeholder="Alpha Plus, Near Rajya Telephone exchange."
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-slate-900">
                    Payment
                  </h3>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <input type="radio" name="pay" className="h-4 w-4" />
                      Payment Delivery
                    </label>

                    <div className="h-px bg-slate-200/70" />

                    <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <input
                        type="radio"
                        name="pay"
                        defaultChecked
                        className="h-4 w-4 accent-primary-500"
                      />
                      Card Payment
                    </label>

                    <div className="h-px bg-slate-200/70" />

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <span className="text-base">＋</span> Add Credit Card
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Phone Number
                  </label>
                  <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 border-r border-slate-200 px-3 text-sm text-slate-600">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold">
                        IN
                      </span>
                      <span className="text-slate-400">▾</span>
                    </div>
                    <input
                      className="w-full px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                      placeholder="+91 000 000 0000"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                        placeholder="Dec, 2025"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-slate-400">
                        📅
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      CVV
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                      placeholder="Rajkot"
                    />
                  </div>
                </div>

                {/* actions */}
                <div className="mt-8 ">
                  <button
                    type="button"
                    className="w-full hover:opacity-80 rounded-full bg-primary-500 text-[18px] py-2 text-white"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
