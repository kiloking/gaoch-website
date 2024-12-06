import { api } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";

export default function RepairList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: repairs, isLoading } = api.repair.getAll.useQuery();

  // 篩選功能
  const filteredRepairs = repairs?.filter(
    (repair) =>
      repair.unit.includes(searchTerm) ||
      repair.contactName.includes(searchTerm) ||
      repair.content.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">維修申請列表</h1>

        {/* 搜尋欄 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="搜尋維修單..."
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 列表 */}
        {isLoading ? (
          <div>載入中...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    編號
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    類型
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    戶別
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    聯絡人
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    狀態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申請日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRepairs?.map((repair) => (
                  <tr key={repair.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{repair.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {repair.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {repair.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {repair.contactName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          repair.status === "待處理"
                            ? "bg-yellow-100 text-yellow-800"
                            : repair.status === "處理中"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {repair.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {repair.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/repair/${repair.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        查看
                      </Link>
                      <button
                        onClick={() =>
                          window.open(`/repair/${repair.id}`, "_blank")
                        }
                        className="text-gray-600 hover:text-gray-900"
                      >
                        列印
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
