"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useMemo, useState } from "react";
import { useCartStore } from "../hooks/useCartStore";
import Link from "next/link";

const Checkout = () => {
  const { items, removeItem, updateQuantity, counter, clearCart } =
    useCartStore();

  const [orderSent, setOrderSent] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "cash_on_delivery"
  >("card");
  const [shippingMethod, setShippingMethod] = useState<
    "courier" | "personalPickup"
  >("courier");

  const deliveryCost = 25;

  const handlePlaceOrder = async () => {
    const payload = {
      items: items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        productName: i.productName,
        qty: Number(i.quantity),
      })),
      shipping,
      paymentMethod,
      shippingMethod,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Place order error: ", data);
      return;
    }

    clearCart();
    console.log("AFTER CLEAR", useCartStore.getState().items);

    console.log("Order ID:", data.orderId);
    setOrderSent(true);

    // optional:
    // router.push(`/order-success?orderId=${data.orderId}`);
  };

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

  const subtotal = items.reduce((sum, item) => {
    return sum + item.price! * item.quantity;
  }, 0);

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
      {orderSent == true ? (
        <div className="thank-you text-center mt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-14 text-success-500 mx-auto"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>

          <span className="text-xl font-semibold text-primary-500">
            Your order has been placed successfully.
          </span>
          <p>
            You’ll receive a confirmation email shortly with the order details.
          </p>
        </div>
      ) : items.length == 0 ? (
        <div className="empty text-center mt-20">
          <span className="text-xl font-semibold">Cart is empty</span>
        </div>
      ) : (
        <>
          <form
            className="grid gap-8 lg:grid-cols-2 py-10"
            onSubmit={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
          >
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

              <div className="mt-6 overflow-y-auto max-h-[360px]">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId ?? "default"}`}
                    className="flex gap-4 odd:bg-gray-100 py-5 px-4 relative"
                  >
                    {item.quantity == item.stockNumber && (
                      <div className="stockinfo absolute top-2 right-2 text-center text-danger-500 text-[11px]">
                        You can order max {item.stockNumber} items
                      </div>
                    )}
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
                      <div className="w-full">
                        <div className="gap-3">
                          <p className="text-wrap text-sm font-semibold text-slate-900">
                            {item.productName}
                          </p>
                          <p className="text-sm font-semibold text-primary-500">
                            {item.price?.toLocaleString("ro-RO", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            {item.currency}
                          </p>
                        </div>

                        <div className="space-y-1 text-sm text-slate-500">
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
                      <div className="bg-white ring-1 ring-gray-200 text-[12px] w-[125px] rounded-3xl flex items-center justify-between ml-4">
                        <button
                          type="button"
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
                          type="button"
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
                        className="w-6 h-6 text-red-400 cursor-pointer"
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

              {/* <div className="coupon-code flex items-center w-full justify-center mt-4">
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
              </div> */}

              <div className="paymentMethod mt-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Payment
                </h3>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="h-4 w-4"
                      checked={paymentMethod === "cash_on_delivery"}
                      onChange={() => setPaymentMethod("cash_on_delivery")}
                    />
                    Payment on Delivery
                  </label>

                  <div className="h-px bg-slate-200/70" />

                  <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <input
                      type="radio"
                      name="pay"
                      className="h-4 w-4 accent-primary-500"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
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

              <div className="shippingtMethod">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Shipping method
                </h3>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      className="h-4 w-4"
                      checked={shippingMethod === "courier"}
                      onChange={() => setShippingMethod("courier")}
                    />
                    Courier Delivery
                  </label>

                  <div className="h-px bg-slate-200/70" />

                  <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      className="h-4 w-4 accent-primary-500"
                      checked={shippingMethod === "personalPickup"}
                      onChange={() => setShippingMethod("personalPickup")}
                    />
                    Personal Pickup
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
            </div>

            {/* RIGHT: Shopping Cart / Form */}
            <div className="right-column">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-900">
                  Checkout{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </h2>
              </div>

              <div className="mt-5 h-px w-full bg-slate-200/70" />

              {/* totals card */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Subtotal:</span>
                    <span className="font-semibold text-slate-900">
                      {subtotal.toLocaleString("ro-RO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {items[0].currency!}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Delivery:</span>
                    <span className="font-semibold">
                      {deliveryCost.toLocaleString("ro-RO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {items[0].currency!}
                    </span>
                  </div>
                  <div className="my-3 h-px bg-slate-200/70" />
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Total:</span>
                    <span className="text-base font-bold">
                      {(subtotal + deliveryCost).toLocaleString("ro-RO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {items[0].currency!}
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

                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                      placeholder="FIrst Name"
                      value={shipping.firstName}
                      onChange={(e) =>
                        setShipping((p) => ({
                          ...p,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="lastname">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      Last Name
                    </label>

                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                      placeholder="Last Name"
                      value={shipping.lastName}
                      onChange={(e) =>
                        setShipping((p) => ({ ...p, lastName: e.target.value }))
                      }
                    />
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
                        value={shipping.phone}
                        onChange={(e) =>
                          setShipping((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
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
                        value={shipping.email}
                        onChange={(e) =>
                          setShipping((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
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
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping((p) => ({ ...p, city: e.target.value }))
                        }
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
                        value={shipping.country}
                        onChange={(e) =>
                          setShipping((p) => ({
                            ...p,
                            country: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="zip">
                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                      Zip Code
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                      placeholder="008462"
                      value={shipping.postalCode}
                      onChange={(e) =>
                        setShipping((p) => ({
                          ...p,
                          postalCode: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Address
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    placeholder="Unirii 4"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping((p) => ({ ...p, address: e.target.value }))
                    }
                  />
                </div>

                {/* <div>
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
                </div> */}

                {/* actions */}
                <div className="mt-8 ">
                  <button
                    type="submit"
                    className="w-full hover:opacity-80 rounded-full bg-primary-500 text-[18px] py-2 text-white"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
