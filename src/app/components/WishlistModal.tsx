"use client";

import Image from "next/image";
import { useWishlistStore } from "../hooks/useWishlistStore";
import { media as wixMedia } from "@wix/sdk";
import { useRouter } from "next/navigation";

const WishlistModal = () => {
  // const wixClient = useWixClient();
  const { isLoading, removeItem, items } = useWishlistStore();
  const router = useRouter();

  const handleWishlist = () => {
    router.push("/wishlist");
  };

  return (
    <div className="absolute bg-white min-w-[280px] border-t cursor-default rounded-md right-0 shadow-md p-3 top-7 text-sm z-20">
      <h4 className="text-sm pb-2 border-b">Wishlist</h4>
      {isLoading ? (
        "Loading..."
      ) : !items ? (
        <div className="empty text-center pt-2">
          <span>Wishlist is empty</span>
        </div>
      ) : (
        <>
          {/* List */}
          <div className="list overflow-y-auto max-h-[300px]">
            {items.map((item) => (
              <div className="item flex gap-4 mt-2" key={item._id}>
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
                      {/* <div className="price bg-gray-50 rounded-sm p-1">
                        {item.price?.formattedAmount}
                      </div> */}
                    </div>
                    <div className="flex justify-end text-sm mt-1">
                      <button
                        onClick={() => removeItem(item._id!)}
                        className="border-0 text-red-400 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Wishlist */}
          <div className="flex justify-center mt-3 border-t text-xs pt-3">
            <hr />
            <button
              className="rounded-md py-2 px-4 bg-black text-white"
              onClick={handleWishlist}
            >
              View Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistModal;
