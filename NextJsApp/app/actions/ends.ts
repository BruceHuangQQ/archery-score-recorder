"use server"
import sql from "@/lib/db"

export async function createEnd(scoreId: number, sequence: number) {
  const rows = await sql`
    INSERT INTO "End_Result" ("Score_ID", "Sequence")
    VALUES (${scoreId}, ${sequence})
    RETURNING *
  `
  return rows[0]
}

export async function submitArrows(endId: number, arrows: string[]) {
  const values = arrows.map((arrow) => ({
    endId,
    score: arrow === "X" ? 10 : arrow === "M" ? 0 : parseInt(arrow),
  }))

  for (const v of values) {
    await sql`
      INSERT INTO "Arrow" ("End_ID", "Arrow_Score")
      VALUES (${v.endId}, ${v.score})
    `
  }
}