import { api } from "@/utils/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectsForm } from "./ProjectsForm";
import { ProjectFormData } from "@/types/types";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function ProjectsList() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: projects, isLoading } = api.projects.getAll.useQuery();
  const { data: selectedProject } = api.projects.getById.useQuery(
    { id: selectedProjectId! },
    { enabled: !!selectedProjectId }
  );
  const utils = api.useUtils();
  const { mutate: createProject } = api.projects.create.useMutation({
    onSuccess: () => {
      utils.projects.getAll.invalidate();
    },
  });
  const { mutate: updateProject } = api.projects.update.useMutation({
    onSuccess: () => {
      utils.projects.getAll.invalidate();
      utils.projects.getById.invalidate();
      setSelectedProjectId(null);
      toast("更新成功", {
        position: "top-center",
      });
      editReset();
    },
  });

  const { reset } = useForm<ProjectFormData>();

  const onSubmit = (data: ProjectFormData) => {
    const createData = {
      ...data,
      coverImageId: data.coverImageId ? data.coverImageId : null,
      status: data.status as "熱銷中" | "即將完工" | "即將開案" | "已完銷",
    };
    createProject({ data: createData });

    setShowAddForm(false);
    reset();
  };

  const { reset: editReset } = useForm<ProjectFormData>();

  const onEditSubmit = (data: ProjectFormData) => {
    if (!selectedProjectId) return;
    const updateData = {
      ...data,
      coverImageId: data.coverImageId ? data.coverImageId : null,
      status: data.status as "熱銷中" | "即將完工" | "即將開案" | "已完銷",
    };

    updateProject({ id: selectedProjectId!, data: updateData });
  };

  const deleteProject = api.projects.delete.useMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    deleteProject.mutate(
      { id: itemToDelete },
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
        {/* back button */}
        <button
          onClick={() => setShowAddForm(false)}
          className="text-indigo-600 hover:text-indigo-900 flex  items-center"
        >
          <ChevronLeft />
          返回
        </button>
        <div className="flex flex-col items-start mb-4">
          <h2 className="text-2xl font-bold mb-4">新增新案</h2>
          <p className="text-sm text-gray-500">
            新案頁面，請填寫新案的相關資訊，包括標題、地點、價格、面積等。
          </p>
        </div>
        <ProjectsForm
          onSubmit={onSubmit}
          onCancel={() => setShowAddForm(false)}
          submitLabel="儲存"
        />
      </div>
    );
  }

  if (selectedProject) {
    return (
      <div className="container mx-auto p-4">
        {/* back button */}
        <button
          onClick={() => setSelectedProjectId(null)}
          className="text-indigo-600 hover:text-indigo-900 flex  items-center"
        >
          <ChevronLeft />
          返回
        </button>
        <h2 className="text-2xl font-bold mb-4">編輯新案</h2>
        <ProjectsForm
          initialData={selectedProject}
          onSubmit={onEditSubmit}
          onCancel={() => setSelectedProjectId(null)}
          submitLabel="更新"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold">新案管理</h1>
          <p className="text-sm text-gray-500">新建案</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          新增新案
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
                連結
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects?.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{project.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.link}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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
