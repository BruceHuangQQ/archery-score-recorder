"use server"
import sql from "@/lib/db"
import { Score } from "@/lib/types"

export async function createScore(
  archerId: number,
  compId: number,
  equipmentId: number
): Promise<Score> {
  const rows = await sql`
    INSERT INTO "Score" ("Archer_ID", "Comp_ID", "Equipment_ID", "Score_Date", "Status")
    VALUES (${archerId}, ${compId}, ${equipmentId}, CURRENT_DATE, 'in_progress')
    RETURNING *
  `
  return rows[0] as Score
}