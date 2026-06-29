import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {

  return (
    <div className="text-sm text-gray-500 flex items-center flex-wrap gap-2 my-5">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={`/list?cat=${item.href}`}
                className="hover:text-primary-500 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">
                {item.label}
              </span>
            )}

            {!isLast && <span>/</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
