import DashboardLayout from "@/components/layouts/Dashboardlayout";
import { WorksList } from "@/components/WorksList";

export default function WorksPage() {
  return (
    <DashboardLayout>
      <WorksList />
    </DashboardLayout>
  );
}
