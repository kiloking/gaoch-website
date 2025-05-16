import DashboardLayout from "@/components/layouts/Dashboardlayout";
import { UsersList } from "@/components/UsersList";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UsersList />
    </DashboardLayout>
  );
}
