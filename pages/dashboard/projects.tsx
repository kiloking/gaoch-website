import DashboardLayout from "@/components/layouts/Dashboardlayout";
import { ProjectsList } from "@/components/ProjectsList";

export default function WorksPage() {
  return (
    <DashboardLayout>
      <ProjectsList />
    </DashboardLayout>
  );
}
