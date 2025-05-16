import { withAuth } from "@/components/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = [
    {
      id: "repair",
      name: "報修管理",
      path: "/dashboard/",
      displayPermission: ["admin", "manager"],
    },
    {
      id: "works",
      name: "業績管理",
      path: "/dashboard/works",
      displayPermission: ["admin"],
    },
    {
      id: "newCase",
      name: "新案管理",
      path: "/dashboard/projects",
      displayPermission: ["admin"],
    },
    {
      id: "news",
      name: "新聞管理",
      path: "/dashboard/news",
      displayPermission: ["admin"],
    },
    {
      id: "users",
      name: "用戶管理",
      path: "/dashboard/users",
      displayPermission: ["admin"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <nav className="bg-white shadow">
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center font-bold text-xl">
                高誠後台管理系統
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-gray-500 hover:text-gray-700"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <div className="w-64 min-h-screen bg-white shadow-lg">
          <nav className="mt-5 px-2">
            {menuItems.map((item) => (
              <>
                {item.displayPermission.includes(session?.user.role) && (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`group flex items-center px-4 py-3 text-base font-medium rounded-md ${
                      router.pathname.includes(item.id)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
