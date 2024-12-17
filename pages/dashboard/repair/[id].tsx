import { useRouter } from "next/router";
import { api } from "@/utils/api";
import React from "react";
import Image from "next/image";
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
    <div className="w-11/12 mx-auto p-4 flex justify-center">
      <div className=" min-h-[297mm] bg-white   my-8">
        {/* 標題和編號 */}
        <div className="text-center mb-8 flex justify-center items-center gap-4">
          <h1 className="text-2xl font-bold">維修申請單</h1>
          <div className="print:hidden mt-0 text-center">
            <button
              onClick={() => window.print()}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              列印維修單
            </button>
          </div>
        </div>

        {/* 基本資訊表格 */}
        <div className="flex gap-4 justify-between">
          <div className="col-span-1 p-2 gap-4 flex ">
            <div>
              <input
                type="checkbox"
                checked={repair.type === "公設"}
                readOnly
              />{" "}
              公設
            </div>
            <div>
              <input
                type="checkbox"
                checked={repair.type === "非公設"}
                readOnly
              />{" "}
              非公設
            </div>
          </div>
          <div className=" border-t border-r border-l border-black p-2">
            <span>編號：{repair.id}</span>
          </div>
        </div>

        <div className="border border-black">
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-2 border-r border-black">
              <div>工程名稱</div>
            </div>
            <div className="col-span-4 p-2 border-r border-black">
              <div>業主(客戶)</div>
              <div>{repair.contactName}</div>
            </div>
            <div className="col-span-3 p-2">
              <div>聯絡人</div>
              <div>{repair.contactName}</div>
            </div>
          </div>

          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-2 border-r border-black">
              <div>戶別</div>
              <div>{repair.unit}</div>
            </div>
            <div className="col-span-4 p-2 border-r border-black">
              <div>聯絡電話</div>
              <div>{repair.phone}</div>
            </div>
            <div className="col-span-3 p-2">
              <div>填單日</div>
              <div>{repair.date}</div>
            </div>
          </div>

          {/* 維修內容 */}
          <div className="p-2">
            <div className=" mb-2">維修內容：</div>
            <div className="min-h-[100px] whitespace-pre-wrap">
              {repair.content}
            </div>
            {repair.images.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt="維修圖片"
                width={300}
                height={300}
              />
            ))}
          </div>

          {/* 簽名欄 */}
          <div className="grid grid-cols-2 border-t border-black">
            <div className="p-4 border-r border-black">
              <div>修繕人員：</div>
              <div className="h-10"></div>
            </div>
            <div className="p-4 flex flex-col justify-between">
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
            <div className="col-span-5 p-2 border-b border-r border-black">
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
              {" "}
              <span>預計完成日期</span>
            </div>

            {/* 表格主體 - 6行 */}
            {[...Array(6)].map((_, index) => (
              <React.Fragment key={index}>
                <div className="col-span-5 p-2 border-b border-r border-black min-h-[40px]"></div>
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

          {/* PS 註記 */}
        </div>
        <div className="text-xs text-blue-800 p-2">
          PS 責任歸屬分業主客戶公司及承包商四種
        </div>

        {/* 維修驗收表 */}
        <div className="mt-8 border border-black">
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
            <div className="min-h-[150px]"></div>
          </div>

          {/* 簽核表格 */}
          <div className="grid grid-cols-12">
            {/* 結案流程 */}
            <div className="col-span-8 border-r border-black">
              <div className="text-center p-2 bg-gray-100 border-b border-black">
                結案流程
              </div>
              <div className="grid grid-cols-4 border-b border-black">
                <div className="p-2 border-r  border-black ">
                  <div className="text-center text-sm">總經理室建檔</div>
                </div>
                <div className="p-2 border-r  border-black">
                  <div className="text-center text-sm">副總經理</div>
                </div>
                <div className="p-2 border-r  border-black">
                  <div className="text-center text-sm">工務部主管會簽</div>
                </div>
                <div className="p-2">
                  <div className="text-center text-sm">業主</div>
                </div>
              </div>
              <div className="grid grid-cols-4 ">
                <div className="p-9 border-r border-black "></div>
                <div className="p-8 border-r border-black"></div>
                <div className="p-8 border-r border-black"></div>
                <div className="p-8"></div>
              </div>
            </div>

            {/* 驗收流程 */}
            <div className="col-span-4">
              <div className="text-center p-2 bg-gray-100 border-b border-black">
                驗收流程
              </div>
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-2 border-r  border-black ">
                  <div className="text-center text-sm">客戶簽字/評語</div>
                </div>
                <div className="p-2">
                  <div className="text-center text-sm">修繕人員</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="p-9 border-r border-black">
                  {/* <div className="text-sm">客戶簽字：</div> */}
                </div>
                <div className="p-6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 列印按鈕 */}
      </div>
    </div>
  );
}
