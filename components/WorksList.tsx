import { api } from "@/utils/api";
import { useState } from "react";
import { useForm } from "react-hook-form";

type WorkFormData = {
  title: string;
  year: string;
  location: string;
  description: string;
  address: string;
  area: string;
  units: string;
  floors: string;
  houseTypes: string;
  architect: string;
  company: string;
};

export function WorksList() {
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: works, isLoading } = api.works.getAll.useQuery();
  const { data: selectedWork } = api.works.getById.useQuery(
    { id: selectedWorkId! },
    { enabled: !!selectedWorkId }
  );

  const { register, handleSubmit, reset } = useForm<WorkFormData>();

  const onSubmit = (data: WorkFormData) => {
    console.log(data);
    // TODO: 實作新增業績的 API
    setShowAddForm(false);
    reset();
  };

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    reset: editReset,
  } = useForm<WorkFormData>();

  const onEditSubmit = (data: WorkFormData) => {
    console.log(data);
    // TODO: 實作更新業績的 API
    setSelectedWorkId(null);
    editReset();
  };

  if (isLoading) return <div>載入中...</div>;

  if (showAddForm) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">新增業績</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                標題
              </label>
              <input
                {...register("title", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                年份
              </label>
              <input
                {...register("year", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                地點
              </label>
              <input
                {...register("location", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                地址
              </label>
              <input
                {...register("address", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                建地面積
              </label>
              <input
                {...register("area", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                戶數/車位
              </label>
              <input
                {...register("units", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                樓層
              </label>
              <input
                {...register("floors", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                格局
              </label>
              <input
                {...register("houseTypes")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                建築師事務所
              </label>
              <input
                {...register("architect", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                營造廠商
              </label>
              <input
                {...register("company", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              描述
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              儲存
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (selectedWork) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">編輯業績</h2>
        <form onSubmit={handleEditSubmit(onEditSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                標題
              </label>
              <input
                {...editRegister("title")}
                defaultValue={selectedWork.title}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                年份
              </label>
              <input
                {...editRegister("year")}
                defaultValue={selectedWork.year}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                地點
              </label>
              <input
                {...editRegister("location")}
                defaultValue={selectedWork.location}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                地址
              </label>
              <input
                {...editRegister("address")}
                defaultValue={selectedWork.address}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                建地面積
              </label>
              <input
                {...editRegister("area")}
                defaultValue={selectedWork.area}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                戶數/車位
              </label>
              <input
                {...editRegister("units")}
                defaultValue={selectedWork.units}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                樓層
              </label>
              <input
                {...editRegister("floors")}
                defaultValue={selectedWork.floors}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                格局
              </label>
              <input
                {...editRegister("houseTypes")}
                defaultValue={selectedWork.houseTypes}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                建築師事務所
              </label>
              <input
                {...editRegister("architect")}
                defaultValue={selectedWork.architect}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                營造廠商
              </label>
              <input
                {...editRegister("company")}
                defaultValue={selectedWork.company}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              描述
            </label>
            <textarea
              {...editRegister("description")}
              defaultValue={selectedWork.description}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setSelectedWorkId(null)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">業績作品管理</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          新增業績
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                編號
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                標題
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                年份
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                地點
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {works?.map((work) => (
              <tr key={work.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{work.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{work.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{work.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{work.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedWorkId(work.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    編輯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
