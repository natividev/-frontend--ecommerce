"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Ecommerce Chávez
        </Link>

        <div className="flex items-center space-x-4">
          {/* Menú de Productos */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Productos</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/products/admin")}>
                📋 Listado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/products")}>
                ➕ Crear
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/products/create")}>
                🛠️ Administrar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menú de Categorías */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Categorías</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push("/categories/admin")}
              >
                📋 Listado
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/categories")}
              >
                ➕ Crear
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Acciones generales */}
          <Button variant="outline">Sign Up</Button>
          <Button>Cart</Button>
        </div>
      </div>
    </nav>
  );
}
