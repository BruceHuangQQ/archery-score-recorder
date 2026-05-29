"use server"
import sql from "@/lib/db"
import { Archer } from "@/lib/types"

export async function getArchers(): Promise<Archer[]> {
  const rows = await sql`
    SELECT a.*, e."Equipment_Name" 
    FROM "Archer" a
    JOIN "Equipment_Definition" e ON a."Def_Equipment_ID" = e."Equipment_ID"
  `
  return rows as Archer[]
}