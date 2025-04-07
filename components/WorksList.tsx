import { api } from "@/utils/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { WorkForm } from "./WorkForm";
import { WorkFormData } from "@/types/types";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

export function WorksList() {
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: works, isLoading } = api.works.getAll.useQuery();
  const { data: selectedWork } = api.works.getById.useQuery(
    { id: selectedWorkId! },
    { enabled: !!selectedWorkId }
  );
  const utils = api.useUtils();
  const { mutate: createWork } = api.works.create.useMutation({
    onSuccess: () => {
      utils.works.getAll.invalidate();
    },
  });
  const { mutate: updateWork } = api.works.update.useMutation({
    onSuccess: () => {
      utils.works.getAll.invalidate();
      utils.works.getById.invalidate();
      setSelectedWorkId(null);
      toast("更新成功", {
        position: "top-center",
      });
      editReset();
    },
  });
  const deleteWork = api.works.delete.useMutation();

  const { reset } = useForm<WorkFormData>();

  const onSubmit = (data: WorkFormData) => {
    console.log(data);

    const createData = {
      ...data,
      bgimgId: data.bgimgId || undefined,
      coverImageId: data.coverImageId || undefined,
      images: data.images || [],
    };
    createWork({ data: createData });

    setShowAddForm(false);
    reset();
  };

  const { reset: editReset } = useForm<WorkFormData>();

  const onEditSubmit = (data: WorkFormData) => {
    if (!selectedWorkId) return;
    const updateData = {
      ...data,
      bgimgId: data.bgimgId || undefined,
      coverImageId: data.coverImageId || undefined,
    };

    console.log("Updating with data:", updateData); // 調試用
    updateWork({ id: selectedWorkId!, data: updateData });
  };
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setWorkToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!workToDelete) return;

    deleteWork.mutate(
      { id: workToDelete },
      {
        onSuccess: () => {
          utils.works.getAll.invalidate();
          toast("刪除成功", {
            position: "top-center",
          });
          setDeleteDialogOpen(false);
        },
        onError: () => {
          toast("刪除失敗", {
            position: "top-center",
          });
        },
      }
    );
  };

  if (isLoading) return <div>載入中...</div>;

  if (showAddForm) {
    return (
      <div className="container mx-auto p-4">
        <button
          onClick={() => setShowAddForm(false)}
          className="text-indigo-600 hover:text-indigo-900 flex  items-center"
        >
          <ChevronLeft />
          返回
        </button>
        <div className="flex flex-col  items-start mb-4">
          <h2 className="text-2xl font-bold mb-4">新增業績</h2>
          <p className="text-sm text-gray-500">
            精彩力作頁面，請填寫業績的相關資訊，包括標題、年份、地點、描述等。
          </p>
        </div>
        <WorkForm
          onSubmit={onSubmit}
          onCancel={() => setShowAddForm(false)}
          submitLabel="儲存"
        />
      </div>
    );
  }

  if (selectedWork) {
    return (
      <div className="container mx-auto p-4">
        <button
          onClick={() => setSelectedWorkId(null)}
          className="text-indigo-600 hover:text-indigo-900 flex  items-center"
        >
          <ChevronLeft />
          返回
        </button>
        <h2 className="text-2xl font-bold mb-4">編輯業績</h2>
        <WorkForm
          initialData={selectedWork}
          onSubmit={onEditSubmit}
          onCancel={() => setSelectedWorkId(null)}
          submitLabel="更新"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold">業績作品管理</h1>
          <p className="text-sm text-gray-500">精彩力作</p>
        </div>
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

                  <button
                    onClick={() => handleDelete(work.id)}
                    className="text-red-600 hover:text-red-900 ml-2"
                  >
                    刪除
                  </button>

                  <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                  >
                    <DialogContent className="bg-white backdrop-blur-sm bg-opacity-90">
                      <DialogHeader>
                        <DialogTitle>確認刪除</DialogTitle>
                        <DialogDescription>
                          您確定要刪除此業績嗎？此操作無法復原。
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setDeleteDialogOpen(false)}
                        >
                          取消
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                          確認刪除
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
