import { useRouter } from "next/router";
import { api } from "@/utils/api";

export default function RepairDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: repair, isLoading } = api.repair.getById.useQuery(
    id as string,
    {
      enabled: !!id,
    }
  );

  if (isLoading) return <div>載入中...</div>;
  if (!repair) return <div>找不到此維修單</div>;

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg p-8 my-8">
        {/* 報修單標題 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">維修申請單</h1>
          <p className="text-gray-500 mt-2">單號：{repair.id}</p>
        </div>

        {/* 基本資訊 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <p>
              <span className="font-bold">申請日期：</span>
              {repair.date}
            </p>
            <p>
              <span className="font-bold">維修類型：</span>
              {repair.type}
            </p>
            <p>
              <span className="font-bold">申請戶別：</span>
              {repair.unit}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-bold">聯絡人：</span>
              {repair.contactName}
            </p>
            <p>
              <span className="font-bold">聯絡電話：</span>
              {repair.phone}
            </p>
            <p>
              <span className="font-bold">處理狀態：</span>
              {repair.status}
            </p>
          </div>
        </div>

        {/* 維修內容 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">維修內容</h2>
          <div className="border p-4 rounded min-h-[200px] whitespace-pre-wrap">
            {repair.content}
          </div>
        </div>

        {/* 簽名欄位 */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="border-t border-black pt-2">申請人簽名</div>
          </div>
          <div className="text-center">
            <div className="border-t border-black pt-2">維修人員簽名</div>
          </div>
          <div className="text-center">
            <div className="border-t border-black pt-2">主管簽名</div>
          </div>
        </div>

        {/* 列印按鈕 - 只在螢幕上顯示 */}
        <div className="print:hidden mt-8 text-center">
          <button
            onClick={() => window.print()}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            列印維修單
          </button>
        </div>
      </div>
    </div>
  );
}
