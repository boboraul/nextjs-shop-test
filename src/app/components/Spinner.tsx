// components/Spinner.tsx
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export function Spinner({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <ArrowPathIcon className={`animate-spin ${className}`} aria-hidden="true" />
  );
}
