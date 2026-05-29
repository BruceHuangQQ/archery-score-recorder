"use server"
import sql from "@/lib/db"
import { Competition } from "@/lib/types"

export async function getCompetitions(): Promise<Competition[]> {
    const rows = await sql`
      SELECT c.*, r."Round_Name"
      FROM "Competition" c
      JOIN "Round_Definition" r ON c."Round_ID" = r."Round_ID"
    `
    return rows as Competition[]
  }