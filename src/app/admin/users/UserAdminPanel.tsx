"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    name: string;
  };
}

export default function UserAdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error("Error al cargar usuarios");
    }
  };

  const toggleBlocked = async (id: number, current: boolean) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
          },
          body: JSON.stringify({ blocked: !current }),
        }
      );

      if (res.ok) {
        toast.success("Estado actualizado");
        fetchUsers();
      } else {
        toast.error("No se pudo actualizar el estado");
      }
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  const deleteUser = async (id: number) => {
    toast("¿Deseas eliminar este usuario?", {
      description: "Esta acción no se puede deshacer.",
      action: {
        label: "Eliminar",
        onClick: async () => {
          await toast.promise(
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
              },
            }),
            {
              loading: "Eliminando usuario...",
              success: () => {
                fetchUsers();
                return "Usuario eliminado con éxito";
              },
              error: "Error al eliminar usuario",
            }
          );
        },
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Administrar Usuarios</h1>
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-zinc-100">
            <th className="p-2">Email</th>
            <th>Username</th>
            <th>Confirmado</th>
            <th>Bloqueado</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t text-center">
              <td className="p-2">{u.email}</td>
              <td>{u.username}</td>
              <td>{u.confirmed ? "✅" : "❌"}</td>
              <td>{u.blocked ? "❌" : "✅"}</td>
              <td>{u.role?.name}</td>
              <td className="flex justify-center gap-2 py-2">
                <button
                  onClick={() => toggleBlocked(u.id, u.blocked)}
                  className="bg-zinc-600 hover:bg-zinc-700 text-white px-3 py-1 rounded"
                >
                  {u.blocked ? "Desbloquear" : "Bloquear"}
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
