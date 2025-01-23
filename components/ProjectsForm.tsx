import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImageUploadButton } from "./ImageUploadButton";
import { ProjectFormData } from "@/types/types";

interface ProjectsFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function ProjectsForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "儲存",
}: ProjectsFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      ...initialData,
      coverImageId: initialData?.coverImageId || undefined,
      coverImage: initialData?.coverImage || undefined,
    },
  });

  const [resetImages, setResetImages] = useState(false);

  const handleFormSubmit = (data: ProjectFormData) => {
    onSubmit(data);
    setResetImages(true);
    setTimeout(() => setResetImages(false), 0);
  };

  // const handleImageUpload = useCallback(
  //   (url: string, imageId?: number) => {
  //     setValue("coverImageId", imageId || null);
  //   },
  //   [setValue]
  // );

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className=" grid grid-cols-2 gap-4"
    >
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium">
          標題
        </label>
        <Input
          id="title"
          {...register("title", { required: "請輸入標題" })}
          placeholder="e.g. 高誠君品"
          className="bg-white"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="location" className="block text-sm font-medium">
          地點
        </label>
        <Input
          id="location"
          {...register("location", { required: "請輸入地點" })}
          placeholder="e.g. 桃園市大園區"
          className="bg-white"
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="status" className="block text-sm font-medium">
          狀態
        </label>
        <select
          id="status"
          {...register("status", { required: "請選擇狀態" })}
          className="w-full p-2 border rounded"
        >
          <option value="">選擇狀態</option>
          <option value="熱銷中">熱銷中</option>
          <option value="即將完工">即將完工</option>
          <option value="即將開案">即將開案</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-medium">
          價格
        </label>
        <Input
          id="price"
          {...register("price", { required: "請輸入價格" })}
          placeholder="e.g. 1075~1610萬/戶  "
          className="bg-white"
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="link" className="block text-sm font-medium">
          連結
        </label>
        <Input
          id="link"
          {...register("link", { required: "請輸入連結" })}
          placeholder="e.g. https://newhouse.591.com.tw/136741"
          className="bg-white"
        />
        {errors.link && (
          <p className="text-sm text-red-500">{errors.link.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="base" className="block text-sm font-medium">
          基地位置
        </label>
        <Input
          id="base"
          {...register("base", { required: "請輸入基地位置" })}
          placeholder="e.g. 桃園市大園區園學路與文治路"
          className="bg-white"
        />
        {errors.base && (
          <p className="text-sm text-red-500">{errors.base.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="area" className="block text-sm font-medium">
          基地面積
        </label>
        <Input
          id="area"
          {...register("area", { required: "請輸入區域" })}
          placeholder="e.g. 953.5坪"
          className="bg-white"
        />
        {errors.area && (
          <p className="text-sm text-red-500">{errors.area.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="size" className="block text-sm font-medium">
          建物坪數
        </label>
        <Input
          id="size"
          {...register("size", { required: "請輸入坪數" })}
          placeholder="e.g. 26~39坪"
          className="bg-white"
        />
        {errors.size && (
          <p className="text-sm text-red-500">{errors.size.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="floors" className="block text-sm font-medium">
          樓層
        </label>
        <Input
          id="floors"
          {...register("floors", { required: "請輸入樓層" })}
          placeholder="e.g. 地上13層，地下12層"
        />
        {errors.floors && (
          <p className="text-sm text-red-500">{errors.floors.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="household" className="block text-sm font-medium">
          戶數車位
        </label>
        <Input
          id="household"
          {...register("household", { required: "請輸入戶數" })}
          placeholder="e.g. 99戶105車"
          className="bg-white"
        />
        {errors.household && (
          <p className="text-sm text-red-500">{errors.household.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="design_company" className="block text-sm font-medium">
          建築設計公司
        </label>
        <Input
          id="design_company"
          {...register("design_company", { required: "請輸入設計公司" })}
          placeholder="e.g. 高誠建築師事務所"
          className="bg-white"
        />
        {errors.design_company && (
          <p className="text-sm text-red-500">
            {errors.design_company.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="construction_company"
          className="block text-sm font-medium"
        >
          營造建設公司
        </label>
        <Input
          id="construction_company"
          {...register("construction_company", { required: "請輸入建設公司" })}
          placeholder="e.g. 高誠建設公司"
          className="bg-white"
        />
        {errors.construction_company && (
          <p className="text-sm text-red-500">
            {errors.construction_company.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          封面圖片
          <span className="text-xs text-gray-500 ml-2">
            （建議尺寸：295x374px）
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
            inputId="bg-image-upload"
            composeSize={500}
            reset={resetImages}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-auto">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
