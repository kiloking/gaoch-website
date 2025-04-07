import { WorkFormData } from "@/types/types";
import { ImageUploadButton } from "./ImageUploadButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MultipleImageUpload } from "@/components/MultipleImageUpload";
interface WorkFormProps {
  initialData?: WorkFormData;
  onSubmit: (data: WorkFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function WorkForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "儲存",
}: WorkFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<WorkFormData>({
    defaultValues: {
      ...initialData,
      coverImageId: initialData?.coverImageId || undefined,
      bgimgId: initialData?.bgimgId || undefined,
      coverImage: initialData?.coverImage || undefined,
      bgimg: initialData?.bgimg || undefined,
      images: initialData?.images || [],
    },
  });

  // 監聽圖片欄位的值
  const coverImageId = watch("coverImageId");
  const bgimgId = watch("bgimgId");

  // 在 WorkForm component 中添加 state
  const [showSaveReminder, setShowSaveReminder] = useState(false);
  const [markedForDeletion, setMarkedForDeletion] = useState<number[]>([]);

  // 處理取消時的確認
  const handleCancel = () => {
    if (
      coverImageId !== initialData?.coverImageId ||
      bgimgId !== initialData?.bgimgId
    ) {
      if (confirm("您有未儲存的變更，確定要離開嗎？")) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            業績名稱
          </label>
          <input
            {...register("title", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-xl p-2"
            placeholder="e.g. 高誠君品"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-lg font-medium text-gray-700">
            描述
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 位於桃園市大園區，共有99戶105車位，建地面積800坪，樓層地上13層地下12層，格局26-39坪"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            年份(例：2024)
          </label>
          <input
            {...register("year", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 2024"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            地點(例：大園區)
          </label>
          <input
            {...register("location", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 大園區"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            地址
          </label>
          <input
            {...register("address", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 桃園市大園區"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            建地面積(例：800坪)
          </label>
          <input
            {...register("area", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 800坪"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            戶數/車位(例：99戶105車)
          </label>
          <input
            {...register("units", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 99戶105車"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            樓層(例：地上13層，地下12層)
          </label>
          <input
            {...register("floors", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 地上13層，地下12層"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            格局(例：26-39坪)
          </label>
          <input
            {...register("houseTypes")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 26-39坪"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            建築師事務所
          </label>
          <input
            {...register("architect", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 高誠建築師事務所"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            營造廠商
          </label>
          <input
            {...register("company", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            placeholder="e.g. 康文在建築師事務所"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            YouTube 影片連結
            <span className="text-xs text-gray-500 ml-2">（選填）</span>
          </label>
          <input
            {...register("ytVideoUrl")}
            type="url"
            placeholder="e.g. https://www.youtube.com/watch?v=..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
          />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              封面圖片
              <span className="text-xs text-gray-500 ml-2">
                （建議尺寸：700x400px）
              </span>
              <div className="text-xs text-gray-500">
                用於作品列表，建議使用較為寬廣的圖片
              </div>
            </label>
            <div className="mt-1 rounded-sm bg-gray-100 border-zinc-300 border p-2 flex flex-col gap-2">
              <>
                {initialData?.coverImage && (
                  <div className="flex items-center  flex-col relative">
                    <p className="text-sm text-gray-500">當前封面圖片</p>

                    <div className="mt-2">
                      <img
                        src={initialData.coverImage.url}
                        alt="當前封面圖片"
                        className="w-full object-cover rounded"
                      />
                    </div>
                    <button
                      type="button"
                      //confirm
                      onClick={() => {
                        if (confirm("確定要刪除這個封面圖片嗎？")) {
                          setValue("coverImageId", undefined);
                        }
                      }}
                      className="text-red-500 ml-2"
                    >
                      刪除這個封面圖片
                    </button>
                  </div>
                )}
              </>

              <ImageUploadButton
                onImagesChange={(url, imageId) => {
                  if (imageId) {
                    setValue("coverImageId", imageId);
                  }
                }}
                completedWord="上傳完成，儲存後將使用以下圖片"
                inputId="cover-image-upload"
                composeSize={700}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              背景圖片
              <span className="text-xs text-gray-500 ml-2">
                （建議尺寸：1920x1080px）
              </span>
              <div className="text-xs text-gray-500">
                用於作品單頁，建議使用較為寬廣的圖片
              </div>
            </label>
            <div className="mt-1 rounded-sm bg-gray-100 border-zinc-300 border p-2 flex flex-col gap-2">
              <>
                {bgimgId && initialData?.bgimg && (
                  <div className="flex items-center  flex-col relative">
                    <p className="text-sm text-gray-500">當前背景圖片</p>

                    <div className="mt-2">
                      <img
                        src={initialData.bgimg.url}
                        alt="當前背景圖片"
                        className="w-full object-cover rounded"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("確定要刪除這個背景圖片嗎？")) {
                          setValue("bgimgId", undefined);
                        }
                      }}
                      className="text-red-500 ml-2"
                    >
                      刪除這個背景圖片
                    </button>
                  </div>
                )}
              </>

              <ImageUploadButton
                onImagesChange={(url, imageId) => {
                  if (imageId) {
                    setValue("bgimgId", imageId);
                  }
                }}
                completedWord="上傳完成，儲存後將使用以下圖片"
                inputId="bg-image-upload"
                composeSize={1920}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            其他圖片
            <span className="text-xs text-gray-500 ml-2">
              （建議尺寸：960x540px）
            </span>
            <div className="text-xs text-gray-500">用於作品單頁</div>
          </label>
          <div className="mt-1 rounded-sm bg-gray-100 border-zinc-300 border p-4">
            <>
              {initialData?.images && initialData?.images.length > 0 && (
                <div className="flex items-  flex-col relative my-1">
                  <p className="text-sm text-gray-500">當前圖片</p>
                  <div className="grid grid-cols-3 gap-2">
                    {initialData.images.map((image) => (
                      <div
                        key={image.id}
                        className="w-full relative aspect-video overflow-hidden"
                      >
                        <div className="w-full aspect-video overflow-hidden">
                          <img
                            src={image.url}
                            alt="當前圖片"
                            className="w-full object-cover rounded overflow-hidden"
                          />
                          {markedForDeletion.includes(image.id) && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white text-sm">
                                將被移除
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="bg-red-500 text-white ml-2 absolute bottom-0 right-0 p-1 rounded-md text-xs"
                          onClick={() => {
                            if (
                              confirm("確定要刪除這張圖片嗎？請記得儲存變更。")
                            ) {
                              setMarkedForDeletion((prev) => [
                                ...prev,
                                image.id,
                              ]);
                              setValue(
                                "images",
                                initialData.images.filter(
                                  (img) => img.id !== image.id
                                )
                              );
                              setShowSaveReminder(true);
                              setTimeout(
                                () => setShowSaveReminder(false),
                                3000
                              );
                            }
                          }}
                        >
                          刪除這個圖片
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
            {showSaveReminder && (
              <div className="text-yellow-600 text-sm mt-2">
                圖片已從列表中移除，請記得儲存變更
              </div>
            )}
            <MultipleImageUpload
              onImagesChange={(images) => {
                const imagesData = images.map((img) => ({
                  id: img.id,
                  url: img.url,
                }));
                setValue("images", imagesData);
              }}
              inputId="work-images-upload"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {submitLabel}
        </button>
      </div>

      <input type="hidden" {...register("coverImageId")} />
      <input type="hidden" {...register("bgimgId")} />
    </form>
  );
}
