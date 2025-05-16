import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { UserForm } from "./UserForm";
import { toast } from "sonner";

export function UsersList() {
  const { data: session } = useSession();
  const { data: users, refetch } = api.users.getAllUsers.useQuery();
  console.log(session);
  const updateStatus = api.users.updateUserStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("狀態更新成功");
    },
  });

  const handleActive = (user: { id: string; isActive: boolean }) => {
    if (user.id === session?.user?.id) {
      toast.error("您不能停用自己的帳號");
      return;
    }

    updateStatus.mutate({
      userId: user.id,
      isActive: !user.isActive,
    });
  };

  if (session?.user.role !== "admin") {
    return <div>沒有權限訪問此頁面</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">用戶管理</h1>
      <UserForm />
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">用戶名</th>
              <th className="px-6 py-3 text-left">角色</th>
              <th className="px-6 py-3 text-left">狀態</th>
              <th className="px-6 py-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">
                  {user.role === "admin"
                    ? "系統管理員"
                    : user.role === "manager"
                    ? "業務管理員(僅報修頁面)"
                    : "一般用戶"}
                </td>
                <td className="px-6 py-4">{user.isActive ? "啟用" : "停用"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleActive(user)}
                    className={`px-4 py-2 rounded ${
                      user.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {user.isActive ? "停用" : "啟用"}
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
