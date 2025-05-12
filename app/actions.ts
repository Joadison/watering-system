"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"
import type { NewWateringRecord } from "@/lib/types"

export async function addWateringRecord(formData: FormData) {
    const name = formData.get("name") as string

    if (!name || name.trim() === "") {
        return {
            success: false,
            message: "Por favor, informe quem regou a planta.",
        }
    }

    const newRecord: NewWateringRecord = {
        name: name.trim(),
        plant_name: "Plantas",
    }

    const { error } = await supabase.from("watering_records").insert([
        {
            ...newRecord,
            watered_at: new Date().toISOString(),
        },
    ])

    if (error) {
        console.error("Error adding watering record:", error)
        return {
            success: false,
            message: "Erro ao registrar a rega. Tente novamente.",
        }
    }

    revalidatePath("/")
    return {
        success: true,
        message: "Rega registrada com sucesso!",
    }
}
