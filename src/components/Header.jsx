import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow-sm">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link href="/" className="flex items-center">
          <Leaf className="h-8 w-auto sm:h-10 text-green-500" />
          <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">
            RenuMarket
          </span>
        </Link>
      </div>
    </header>
  );
}
