import { Suspense } from "react";
import SearchClient from "./SearchClient";
import { Spinner } from "../components/Spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner className="h-6 w-6 font-semibold text-primary-500" />}>
      <SearchClient />
    </Suspense>
  );
}