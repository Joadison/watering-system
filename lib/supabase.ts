import { createClient } from "@supabase/supabase-js"
import type { WateringRecord } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getWateringRecords() {
    const { data, error } = await supabase.from("watering_records").select("*").order("watered_at", { ascending: false })

    if (error) {
        console.error("Error fetching watering records:", error)
        return []
    }

    return data as WateringRecord[]
}

// Add a function to check if the table exists
export async function checkTableExists() {
    try {
        const { error } = await supabase.from("watering_records").select("id").limit(1)

        if (error && error.message.includes("does not exist")) {
            return false
        }

        return true
    } catch (error) {
        console.error("Error checking if table exists:", error)
        return false
    }
}

// Add a function to create the table
export async function createWateringRecordsTable() {
    // This is a simplified version - in a real app, you'd use migrations
    // or the Supabase dashboard to create tables
    const { error } = await supabase.rpc("create_watering_records_table")

    if (error) {
        console.error("Error creating table:", error)
        return false
    }

    return true
}
