// components/Spinner.tsx
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export function Spinner({ className = "h-6 w-6 text-primary-500" }: { className?: string }) {
  return (
    <div className="text-center w-full">
      <ArrowPathIcon className={`animate-spin text-center ${className}`} aria-hidden="true" />
    </div>
  );
}
