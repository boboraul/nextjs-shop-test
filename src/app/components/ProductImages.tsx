"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/28625799/pexels-photo-28625799/free-photo-of-energetic-woman-posing-in-white-studio-setting.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },

//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/20280211/pexels-photo-20280211/free-photo-of-model-in-coat.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },

//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/7319134/pexels-photo-7319134.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },

//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/8210519/pexels-photo-8210519.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
// ];

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          className="object-cover rounded-md"
          sizes="50vw"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div
            key={item._id}
            className="w-1/4 h-32 relative gap-4 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt=""
              fill
              className="object-cover rounded-md"
              sizes="30vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
