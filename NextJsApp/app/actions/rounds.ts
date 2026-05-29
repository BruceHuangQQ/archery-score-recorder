"use server"
import sql from "@/lib/db"
import { RangeDefinition } from "@/lib/types"

export async function getRounds() {
  const rows = await sql`SELECT * FROM "Round_Definition"`
  return rows
}

export async function getRangesByRound(roundId: number) {
    const rows = await sql`
      SELECT rd.*, fd."Size_cm"
      FROM "Range_Definition" rd
      JOIN "Face_Definition" fd ON rd."Face_ID" = fd."Face_ID"
      WHERE rd."Round_ID" = ${roundId}
      ORDER BY rd."Sequence"
    `
    return rows as RangeDefinition[]
}