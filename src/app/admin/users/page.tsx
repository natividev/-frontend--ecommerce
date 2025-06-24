import dynamic from "next/dynamic";

const UserAdminPanel = dynamic(() => import("./UserAdminPanel"), {
  ssr: false,
});

export default function UsersPage() {
  return <UserAdminPanel />;
}
