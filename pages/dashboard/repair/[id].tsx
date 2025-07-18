import { useRouter } from "next/router";
import { api } from "@/utils/api";
import React from "react";
export default function RepairDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: repair, isLoading } = api.repair.getById.useQuery(
    id as string,
    {
      enabled: !!id,
    }
  );

  if (isLoading)
    return (
      <div className=" flex justify-center items-center text-black">
        載入中...
      </div>
    );
  if (!repair) return <div>找不到此維修單</div>;

  return (
    <div className="w-11/12 mx-auto p-4  justify-center print:w-full">
      {/* 第一頁：主要內容 */}
      <div className="min-h-[200mm] bg-white my-4 print:break-after-page print:break-inside-avoid">
        {/* 標題和編號 */}
        <div className="text-center mb-4 flex justify-center items-center gap-4 relative">
          <h1 className="text-2xl font-bold">維修申請單</h1>
          <div className="print:hidden mt-0 text-center">
            <button
              onClick={() => window.print()}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              列印維修單
            </button>
          </div>
          <div className="flex gap-4 justify-between absolute top-0 right-0">
            <div className="border border-black p-2">
              <span className="whitespace-nowrap">
                編號：{repair.serial_no}
              </span>
            </div>
          </div>
        </div>

        {/* 基本資訊表格 */}
        <div className="border border-black">
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-2 border-r border-black flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">填單日</div>
              <div>{repair.date}</div>
            </div>
            <div className="col-span-4 p-2 border-r border-black flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">聯絡人</div>
              <div>{repair.contactName}</div>
            </div>
            <div className="col-span-4 p-2 flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">社區</div>
              <div>{repair.community_name}</div>
            </div>
          </div>
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-2 border-r border-black flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">方便聯絡時間</div>
              <div>{repair.contact_time}</div>
            </div>
            <div className="col-span-4 p-2 border-r border-black flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">Email</div>
              <div>{repair.email}</div>
            </div>
            <div className="col-span-4 p-2 flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">聯絡電話</div>
              <div>{repair.phone}</div>
            </div>
          </div>

          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-2 border-r border-black flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">戶別</div>
              <div>{repair.unit}</div>
            </div>
            <div className="col-span-4 p-2 border-r border-black flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">區域 / 類型</div>
              <div>
                {repair.repair_area} / {repair.repair_class}
              </div>
            </div>
            <div className="col-span-4 p-2 flex justify-start items-center gap-2">
              <div className="whitespace-nowrap">附件</div>
              <div>
                圖片 {repair.images.length} 件 / 影片{" "}
                {repair.videoId ? "1" : "0"} 件
              </div>
            </div>
          </div>

          {/* 維修內容 */}
          <div className="p-2">
            <div className="flex justify-start items-center gap-2 mb-4">
              <div className="">維修內容：</div>
              <div className="whitespace-pre-wrap">{repair.content}</div>
            </div>
            {/* 移除圖片，圖片將在第二頁顯示 */}
          </div>

          {/* 簽名欄 */}
          <div className="grid grid-cols-2 border-t border-black">
            <div className="p-4 border-r border-black">
              <div>修繕人員：</div>
              <div className="min-h-[1px]"></div>
            </div>
            <div className="p-4 flex justify-between">
              <div className="">受理人員：</div>
              <div>受理日：＿＿年＿＿月＿＿日</div>
            </div>
          </div>
        </div>

        {/* 維修會勘記錄表 */}
        <div className="mt-8 border border-black">
          <div className="text-center p-2 font-bold border-b border-black">
            維修會勘記錄表
          </div>

          {/* 表格內容 */}
          <div className="grid grid-cols-12 text-sm">
            {/* 表頭 */}
            <div className="col-span-5 p-2  border-r border-black">
              現場會勘結果
            </div>
            <div className="col-span-1 p-2 border-b border-r border-black">
              責任歸屬級數
            </div>
            <div className="col-span-2 p-2 border-b border-r border-black">
              維修處理方式
            </div>
            <div className="col-span-2 p-2 border-b border-r border-black">
              <div className="flex justify-between">
                <span>維修費用</span>
              </div>
            </div>
            <div className="col-span-2 p-2 border-b border-black">
              <span>預計完成日期</span>
            </div>

            {/* 表格主體 - 6行 */}
            {[...Array(1)].map((_, index) => (
              <React.Fragment key={index}>
                <div className="col-span-5 p-2 border-b border-r border-black min-h-[100px]"></div>
                <div className="col-span-1 p-2 border-b border-r border-black"></div>
                <div className="col-span-2 p-2 border-b border-r border-black"></div>
                <div className="col-span-2 p-2 border-b border-r border-black">
                  <div className="flex justify-center gap-5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 border border-black"></span>有
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 border border-black"></span>無
                    </div>
                  </div>
                </div>
                <div className="col-span-2 p-2 border-b border-black"></div>
              </React.Fragment>
            ))}

            {/* 底部簽名欄 */}
            <div className="col-span-4 p-2 border-r border-black bg-gray-100">
              工務部主管
              <br />
              （會簽）
            </div>
            <div className="col-span-4 p-2 border-r border-black bg-gray-100">
              會勘人員
            </div>
            <div className="col-span-4 p-2 border-black bg-gray-100">
              修繕人員
            </div>
          </div>
        </div>
        <div className="text-xs text-blue-800 p-2">
          PS 責任歸屬分業主客戶公司及承包商四種
        </div>

        {/* 維修驗收表 */}
        <div className="mt-4 border border-black">
          <div className="text-center p-2 font-bold border-b border-black">
            維修驗收表
          </div>

          {/* 施工期間 */}
          <div className="p-4 border-b border-black">
            <div>1. 施工期間：＿＿年＿＿月＿＿日 ～ ＿＿年＿＿月＿＿日</div>
          </div>

          {/* 維修情形及結果 */}
          <div className="p-4 border-b border-black">
            <div>2. 維修情形及結果：</div>
            <div className="min-h-[100px]"></div>
          </div>

          {/* 簽核表格 */}
          <div className="grid grid-cols-12">
            {/* 結案流程 */}
            <div className="col-span-8 border-r border-black">
              <div className="text-center p-2 bg-gray-100 border-b border-black">
                結案流程
              </div>
              <div className="grid grid-cols-4 border-b border-black">
                <div className="p-2 border-r border-black">
                  <div className="text-center text-sm">總經理室建檔</div>
                </div>
                <div className="p-2 border-r border-black">
                  <div className="text-center text-sm">副總經理</div>
                </div>
                <div className="p-2 border-r border-black">
                  <div className="text-center text-sm">工務部主管會簽</div>
                </div>
                <div className="p-2">
                  <div className="text-center text-sm">業主</div>
                </div>
              </div>
              <div className="grid grid-cols-4">
                <div className="p-4 border-r border-black"></div>
                <div className="p-4 border-r border-black"></div>
                <div className="p-4 border-r border-black"></div>
                <div className="p-4"></div>
              </div>
            </div>

            {/* 驗收流程 */}
            <div className="col-span-4">
              <div className="text-center p-2 bg-gray-100 border-b border-black">
                驗收流程
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r border-black">
                  <div className="text-center text-sm">客戶簽字/評語</div>
                </div>
                <div className="p-2">
                  <div className="text-center text-sm">修繕人員</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="p-4 border-r border-black"></div>
                <div className="p-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 第二頁：圖片附件 */}
      {repair.images.length > 0 && (
        <>
          {/* 螢幕顯示時的分頁指示器 */}

          <div className="min-h-[200mm] bg-white my-4 print:break-before-page print:break-inside-avoid">
            {/* 第二頁標題和編號 */}
            <div className="text-center mb-4 flex justify-center items-center gap-4 relative">
              <h1 className="text-2xl font-bold">維修申請單 - 附件</h1>
              <div className="flex gap-4 justify-between absolute top-0 right-0">
                <div className="border border-black p-2">
                  <span>編號：{repair.serial_no}</span>
                </div>
              </div>
            </div>

            {/* 圖片區域 */}
            <div className="border border-black">
              <div className="text-center p-2 font-bold border-b border-black">
                維修現場照片
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4">
                  {repair.images.map((image, index) => (
                    <div key={index} className="border border-gray-300 p-2">
                      <div className="text-center text-sm text-gray-600 mb-2">
                        照片 {index + 1}
                      </div>
                      <img
                        src={image.url}
                        alt={`維修圖片 ${index + 1}`}
                        className="w-full h-auto max-h-[330px] object-contain mx-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
