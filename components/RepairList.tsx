import { useState, useMemo } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { api } from "@/utils/api";
import { toast } from "sonner";
import Image from "next/image";
import { RepairListType } from "@/types/types";

export function RepairList() {
  const [selectedRepair, setSelectedRepair] = useState<RepairListType | null>(
    null
  );
  const [editStatus, setEditStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const utils = api.useUtils();
  const { data: repairsData, isLoading } = api.repair.getAll.useQuery();
  const { mutate: updateStatus } = api.repair.updateStatus.useMutation({
    onSuccess: () => {
      toast("狀態更新成功");
      utils.repair.getAll.invalidate(); // 重新獲取列表
    },
    onError: () => {
      toast.error("狀態更新失敗");
    },
  });

  const handleStatusChange = () => {
    if (selectedRepair?.id) {
      updateStatus({
        id: selectedRepair.id,
        status: editStatus,
      });
    }
  };

  const filteredRepairs = useMemo(
    () =>
      repairsData?.filter(
        (repair) =>
          repair.unit.includes(searchTerm) ||
          repair.contactName.includes(searchTerm) ||
          repair.content.includes(searchTerm) ||
          repair.id.toString().includes(searchTerm)
      ),
    [repairsData, searchTerm]
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">維修申請列表</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="搜尋維修單（戶別、聯絡人、內容、編號）"
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                    社區
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    戶別
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    聯絡人
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    區域 / 類型
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
                      {repair.community_name} ({repair.community_code})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {repair.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {repair.contactName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {repair.repair_area} / {repair.repair_class}
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setSelectedRepair(repair)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            查看
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogTitle>維修申請單詳情</DialogTitle>
                          <DialogDescription>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="font-bold">編號：</span>
                                {selectedRepair?.id}
                              </div>
                              <div>
                                <span className="font-bold">社區：</span>
                                {selectedRepair?.community_name}
                              </div>
                              <div>
                                <span className="font-bold">戶別：</span>
                                {selectedRepair?.unit}
                              </div>
                              <div>
                                <span className="font-bold">聯絡人：</span>
                                {selectedRepair?.contactName}
                              </div>
                              <div>
                                <span className="font-bold">區域：</span>
                                {selectedRepair?.repair_area}
                              </div>
                              <div>
                                <span className="font-bold">類型：</span>
                                {selectedRepair?.repair_class}
                              </div>
                              <div>
                                <span className="font-bold">申請日期：</span>
                                {selectedRepair?.date}
                              </div>
                              <div>
                                <span className="font-bold">
                                  最近變更日期：
                                </span>
                                {selectedRepair?.updatedAt?.toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">狀態：</span>
                                <select
                                  value={editStatus || selectedRepair?.status}
                                  onChange={(e) =>
                                    setEditStatus(e.target.value)
                                  }
                                  className="border rounded px-2 py-1"
                                >
                                  <option
                                    value="待處理"
                                    className="text-yellow-500"
                                  >
                                    待處理
                                  </option>
                                  <option
                                    value="處理中"
                                    className="text-blue-500"
                                  >
                                    處理中
                                  </option>
                                  <option
                                    value="已完成"
                                    className="text-green-500"
                                  >
                                    已完成
                                  </option>
                                </select>
                              </div>
                              <div className="col-span-2">
                                <span className="font-bold">問題內容：</span>
                                {selectedRepair?.content}
                              </div>
                              <div>
                                <span className="font-bold">圖片：</span>
                                <div className="flex gap-2">
                                  {selectedRepair?.images.map((image) => (
                                    <Image
                                      key={image.id}
                                      src={image.url}
                                      alt="維修圖片"
                                      width={300}
                                      height={300}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="hidden">
                                <span className="font-bold">影片：</span>
                                <div className="flex gap-2"></div>
                              </div>
                            </div>
                          </DialogDescription>
                          <DialogFooter>
                            <button
                              onClick={() =>
                                window.open(
                                  `/dashboard/repair/${repair.id}`,
                                  "_blank"
                                )
                              }
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-800"
                            >
                              列印申請單
                            </button>
                            <button
                              onClick={handleStatusChange}
                              className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                            >
                              儲存處理狀態
                            </button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <button
                        onClick={() =>
                          window.open(
                            `/dashboard/repair/${repair.id}`,
                            "_blank"
                          )
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
