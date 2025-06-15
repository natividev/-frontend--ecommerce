import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Ecommerce Chávez
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="outline">Sign Up</Button>
          <Button>Cart</Button>
        </div>
      </div>
    </nav>
  );
}
