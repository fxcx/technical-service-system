import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TechnicianForm } from "@/components/technicians/technician-form";

export default async function NewTechnicianPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Nuevo Técnico</h1>
        <p className="text-muted-foreground">
          Registra un nuevo técnico en el sistema
        </p>
      </div>

      <TechnicianForm />
    </div>
  );
}
