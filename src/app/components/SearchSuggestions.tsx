"use client";
import ProductBox from "../components/ProductBox";

export type SearchSuggestionsItem = {
  id: string;
  slug: string;
  name: string;
  price?: number;
  discountedPrice?: number;
  image: string;
  currency?: string;
  discountPercent?: number;
};

type SearchSuggestionsProps = {
  items: SearchSuggestionsItem[];
  isOpen?: boolean;
};

export default function SearchSuggestions({items, isOpen}: SearchSuggestionsProps) {

    return (
        <div className="search-suggestion-container border absolute  left-0 right-0 bg-white shadow-[0px_10px_8px_-15px_#000000] z-50 py-2 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px]">
            <div className="container mx-auto max-h-[90vh] overflow-y-auto md:max-h-auto flex p-5 gap-4 flex-wrap justify-between">
                {items && (
                    items.map((item) => (
                        <ProductBox
                            key={item.id}
                            id={item.id}
                            slug={item.slug!}
                            name={item.name!}
                            price={item.price!}
                            discountedPrice={item.discountedPrice!}
                            imageUrl={item.image!}
                            secondaryImageUrl={''}
                            shortDescHtml={""}
                            currency={item.currency}
                            discountPercent={item.discountPercent}
                            isOpen={isOpen}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

