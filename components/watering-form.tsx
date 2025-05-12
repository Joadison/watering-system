"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { addWateringRecord } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Registrando..." : "Registrar Rega"}
    </Button>
  );
}

export function WateringForm() {
  const [name, setName] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await addWateringRecord(formData);

    if (result.success) {
      toast(result.message);
      setName("");
    } else {
      toast(result.message);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Quem regou a planta?</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
