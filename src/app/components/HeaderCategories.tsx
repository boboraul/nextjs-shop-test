import { wixClientServer } from "../lib/wixClientServer";
import Link from "next/link";

export default async function HeaderCategories() {
  const wixClient = await wixClientServer();

  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className="flex flex-col gap-2 justify-center">
      {cats.items.map((cat) => (
        <div key={cat._id}>
            <Link className="py-1 font-semibold" href={`/list/?cat=${cat.slug}`}>{cat.name}</Link>
        </div>
      ))}
    </div>
  );
}