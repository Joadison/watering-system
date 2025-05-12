export type WateringRecord = {
    id: string
    name: string
    plant_name: string
    watered_at: string
    created_at: string
}

export type NewWateringRecord = {
    name: string
    plant_name: string
}
