import { sql } from '@/lib/db'

export async function GET() {
  const rows = await sql<{ category: string }[]>`
    select distinct category from puns order by category`
  return Response.json(rows.map((row) => row.category))
}