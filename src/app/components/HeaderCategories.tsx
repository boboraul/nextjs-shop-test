import { wixClientServer } from "../lib/wixClientServer";
import Link from "next/link";

export default async function HeaderCategories() {
  const wixClient = await wixClientServer();

  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div>
      {cats.items.map((cat) => (
        <div key={cat._id}>
            <Link className="py-2 md:py-1 font-semibold" href={`/list/?cat=${cat.slug}`}>{cat.name}</Link>
        </div>
      ))}
    </div>
  );
}