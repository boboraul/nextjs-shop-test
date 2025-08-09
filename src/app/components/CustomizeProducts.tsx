"use client";
import { useState } from "react";
import React from "react";
import { products } from "@wix/stores";

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;

      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-2" key={option.name}>
          <p>Choose a {option.name}</p>
          <ul className="flex items-center gap-3 list-none">
            {option.choices?.map((choice, i) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOptions[option.name!] === choice.description;
              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);
              return option.name == "Color" ? (
                <li
                  key={`${option.name}-${choice.description}-${i}`}
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] rotate-45 bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </li>
              ) : (
                <li
                  key={`${option.name}-${choice.description}-${i}`}
                  className="relative text-primary-500 rounded-md py-1 px-4 text-sm cursor-pointer"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#536dff"
                      : disabled
                      ? "whtie"
                      : "white",
                    color: selected && !disabled ? "white" : "#536dff",
                    border: selected
                      ? "solid 2px #536dff"
                      : "solid 1px #536dff",
                    opacity: disabled ? ".5" : "1",
                  }}
                  onClick={clickHandler}
                >
                  {choice.description}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] rotate-45 bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Color */}
      {/* <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-600">
              <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </li>

            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-600"></li>
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-600">
              <div className="absolute w-10 h-[2px] rotate-45 bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </li>
          </ul> */}

      {/* Size   */}
      {/* <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-primary-500 text-primary-500 rounded-md py-1 px-4 text-sm cursor-pointer">
          S
        </li>

        <li className="ring-1 selected ring-primary-500 text-white bg-primary-500 rounded-md py-1 px-4 text-sm cursor-pointer">
          M
        </li>

        <li className="ring-1 ring-primary-500 text-white rounded-md py-1 px-4 text-sm bg-primary-200 cursor-not-allowed">
          L
        </li>
      </ul> */}
    </div>
  );
};

export default CustomizeProducts;
