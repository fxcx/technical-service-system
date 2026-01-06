"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { User } from "@/types";
import { Switch } from "@/components/ui/switch";

interface TechnicianFormProps {
  technician?: User;
}

export function TechnicianForm({ technician }: TechnicianFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: technician?.name || "",
    email: technician?.email || "",
    phone: technician?.phone || "",
    password: "",
    isActive: technician?.isActive ?? true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const isEditing = !!technician;
      const url = isEditing
        ? `/api/technicians/${technician.id}`
        : "/api/technicians";
      const method = isEditing ? "PUT" : "POST";

      const body: any = {
        ...formData,
        role: "TECHNICIAN",
      };

      // Si es edición y el password está vacío, lo quitamos para no sobrescribirlo
      if (isEditing && !body.password) {
        delete body.password;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al guardar");
      }

      toast.success(
        isEditing
          ? "Técnico actualizado correctamente"
          : "Técnico creado exitosamente"
      );
      router.push("/admin/technicians");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al guardar el técnico"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{technician ? "Editar Técnico" : "Nuevo Técnico"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="juan@ejemplo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+56 9 1234 5678"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {technician ? "Nueva Contraseña (opcional)" : "Contraseña *"}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder={
                technician
                  ? "Dejar en blanco para mantener la actual"
                  : "Mínimo 6 caracteres"
              }
              required={!technician}
              minLength={6}
            />
          </div>

          {technician && (
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive">Técnico Activo</Label>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {technician ? "Guardar Cambios" : "Crear Técnico"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
