"use server"
import sql from "@/lib/db"
import { EndResult, Score, ScoreDetail } from "@/lib/types"

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

export async function getScore(scoreId: number) {
    const rows = await sql`
      SELECT 
        s.*,
        a."Name" as "Archer_Name",
        e."Equipment_Name",
        r."Round_Name",
        r."Round_ID",
        c."Comp_Name"
      FROM "Score" s
      JOIN "Archer" a ON s."Archer_ID" = a."Archer_ID"
      JOIN "Equipment_Definition" e ON s."Equipment_ID" = e."Equipment_ID"
      JOIN "Competition" c ON s."Comp_ID" = c."Comp_ID"
      JOIN "Round_Definition" r ON c."Round_ID" = r."Round_ID"
      WHERE s."Score_ID" = ${scoreId}
    `
      return rows[0] as ScoreDetail
}

export async function completeScore(scoreId: number) {
    await sql`
      UPDATE "Score" SET "Status" = 'completed'
      WHERE "Score_ID" = ${scoreId}
    `
}

export async function getScoreResult(scoreId: number) {
    const rows = await sql`
      SELECT 
        er."End_ID",
        er."Sequence",
        rd."Distance",
        fd."Size_cm",
        json_agg(a."Arrow_Score" ORDER BY a."Arrow_ID") as arrows
      FROM "End_Result" er
      JOIN "Score" s ON er."Score_ID" = s."Score_ID"
      JOIN "Competition" c ON s."Comp_ID" = c."Comp_ID"
      JOIN "Range_Definition" rd ON c."Round_ID" = rd."Round_ID" AND rd."Sequence" = 1
      JOIN "Face_Definition" fd ON rd."Face_ID" = fd."Face_ID"
      JOIN "Arrow" a ON a."End_ID" = er."End_ID"
      WHERE er."Score_ID" = ${scoreId}
      GROUP BY er."End_ID", er."Sequence", rd."Distance", fd."Size_cm"
      ORDER BY er."Sequence"
    `
    return rows as EndResult[]
}