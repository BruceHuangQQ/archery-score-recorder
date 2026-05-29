"use server"
import sql from "@/lib/db"
import { Equipment } from "@/lib/types"

export async function getEquipment(): Promise<Equipment[]> {
  const rows = await sql`SELECT * FROM "Equipment_Definition"`
  return rows as Equipment[]
}