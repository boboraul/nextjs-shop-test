"use client";

import React from "react";
import Image from "next/image";
import SafeHtml from "./SafeHtml";
import Link from "next/link";
import AddToWishlistButton from "./AddToWishlistButton";
import { StarIcon } from '@heroicons/react/24/solid';

export type ProductBoxProps = {
  id: string;
  slug: string;
  name: string;
  price?: number;
  discountedPrice?: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  shortDescHtml?: any | "";
  currency?: string;
  discountPercent?: number | null;
  isOpen?: boolean;
  customClasses?: string;
  availability?: string;
};

export default function ProductBox({
  id,
  slug,
  name,
  price,
  discountedPrice,
  imageUrl,
  secondaryImageUrl,
  shortDescHtml,
  currency,
  discountPercent,
  isOpen,
  customClasses,
  availability,
}: ProductBoxProps) {
  const gCurrency = currency == "RON" ? "Lei" : currency;
  const ratingScore = 5;

  return (
    <div className={`product-box relative w-full ${customClasses || (isOpen ? 'lg:w-[12%]' : 'lg:w-[22%]')} ${availability === 'OUT_OF_STOCK' ? 'opacity-50' : 'opacity-100'}`}>
      <div className="wishlist-btn absolute top-2 right-2 z-20">
        
        <AddToWishlistButton
          productId={id}
          productName={name}
          productUrl={slug}
          productImage={imageUrl}
          price={price}
          discountedPrice={discountedPrice}
          currency={currency}
          size="sm"
          discountPercent={discountPercent}
        />
      </div>
      <Link href={"/" + slug}>
        <div className={`w-full relative ${isOpen ? 'h-40' : 'h-80'}`}>
          {discountPercent && (
            <div className="promo-badge bg-danger-500 w-[45px] top-1 flex items-center px-2 opacity-80 rounded-bl-3xl left-0 leading-[20px] justify-center rounded-tr-3xl rotate-[9deg] text-white absolute text-[12px] z-[999]">
              <span className="text-white absolute top-[-11px] left-[1px]">
                .
              </span>
              {discountPercent}%
            </div>
          )}

          <Image
            src={imageUrl || "/product.png"}
            alt=""
            fill
            sizes="25vw"
            className={`absolute object-cover object-top rounded-md z-10 ${secondaryImageUrl ? "hover:opacity-0 transition-opacity easy duration-500" : ""}`}
          />
          {secondaryImageUrl && (
            <Image
              src={secondaryImageUrl}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          )}
        </div>

        <div className="name mt-2">
          <h4 className={`font-medium line-clamp-2 mb-0 ${isOpen ? 'text-[12px]' : 'text-[14px]'}`}>{name}</h4>
        </div>

        <div className="ratings flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <StarIcon
              key={index}
              className={`h-3 w-3 mr-[2px] ${
                index <= ratingScore 
                  ? 'text-amber-400'  // Galben/Auriu pentru rating activ
                  : 'text-gray-300'   // Gri pentru rating inactiv
              }`}
            />
          ))}
        </div>
 
        {!isOpen && (
         <div className="availability mt-1">
            {availability === 'IN_STOCK'
              ? <span className="text-success-500 text-[12px]">In Stock</span>
              : availability === 'PARTIALLY_OUT_OF_STOCK'
              ? <span className="text-orange-500 text-[12px]">Allmost gone</span>
              : <span className="text-danger-500 text-[12px]">Out of Stock</span>
            }
          </div> 
        )}

        {shortDescHtml && (
          <SafeHtml
            html={
              shortDescHtml.find(
                (section: any) => section.title === "shortDesc",
              )?.description
            }
            classes="short-description text-sm text-gray-500 line-clamp-2 mt-1"
          />
        )}

        <div className="flex justify-between items-center mt-2">
          <button className="add-2cart-btn rounded-2xl ring-1 ring-primary-500 bg-primary-500 text-white px-4 py-2 text-xs hover:bg-white hover:text-primary-500 easy duration-200">
            Add to Cart
          </button>

          <span className="price-box leading-[1.2]">
            {price === discountedPrice ? (
              <h5 className="text-primary-500 font-medium">
                {discountedPrice?.toLocaleString("ro-RO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {gCurrency}
              </h5>
            ) : (
              <div className="gap-2">
                <small className="text-gray-500 line-through">
                  {price?.toLocaleString("ro-RO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {gCurrency}
                </small>
                <h5 className="font-medium text-primary-500">
                  {discountedPrice?.toLocaleString("ro-RO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {gCurrency}
                </h5>
              </div>
            )}
          </span>
        </div>
      </Link>
    </div>
  );
}
