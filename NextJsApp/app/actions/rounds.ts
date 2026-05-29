"use server"
import sql from "@/lib/db"

export async function getRounds() {
  const rows = await sql`SELECT * FROM "Round_Definition"`
  return rows
}