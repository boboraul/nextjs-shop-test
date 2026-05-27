import { Suspense } from "react";
import SearchClient from "./SearchClient";
import { Spinner } from "../components/Spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchClient />
    </Suspense>
  );
}