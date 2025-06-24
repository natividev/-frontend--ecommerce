"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Ecommerce Chávez
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Productos</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push("/products/admin")}
                  >
                    📋 Listado
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/products")}>
                    ➕ Crear
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/products/create")}
                  >
                    🛠️ Administrar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
                  <DropdownMenuItem onClick={() => router.push("/categories")}>
                    ➕ Crear
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={logout} variant="destructive">
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => router.push("/auth/login")}
                variant="outline"
              >
                Iniciar sesión
              </Button>
              <Button
                onClick={() => router.push("/auth/register")}
                variant="default"
              >
                Crear cuenta
              </Button>
            </>
          )}

          <Link href="/cart">
            <Button>
              🛒 Carrito
              {totalItems > 0 && (
                <span className="ml-1 inline-block bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
