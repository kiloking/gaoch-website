import { withAuth } from "@/components/withAuth";
import { RepairList } from "@/components/RepairList";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState("repair"); // repair, sales, newCase

  const menuItems = [
    { id: "repair", name: "報修管理", path: "/dashboard/repair" },
    { id: "works", name: "業績管理", path: "/dashboard/works" },
    { id: "newCase", name: "新案管理", path: "/dashboard/new-case" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center font-bold text-xl">
                管理系統
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/login";
                }}
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
              <Link
                key={item.id}
                href={item.path}
                className={`group flex items-center px-4 py-3 text-base font-medium rounded-md ${
                  currentMenu === item.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setCurrentMenu(item.id)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-8">
          {currentMenu === "repair" && <RepairList />}
          {currentMenu === "works" && (
            <div className="text-center text-gray-500 mt-20">
              業績管理功能開發中...
            </div>
          )}
          {currentMenu === "newCase" && (
            <div className="text-center text-gray-500 mt-20">
              新案管理功能開發中...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
