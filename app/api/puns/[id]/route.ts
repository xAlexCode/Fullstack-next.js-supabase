import { sql, type Pun } from '@/lib/db'

/**
 * /api/puns/[id]: the same as router.get/delete('/:punId') in the Express API.
 * PATCH is missing on purpose: you write it yourself in the exercise
 * [id] in the folder name is :punId, and ctx.params is req.params (a Promise: await it)
 */

// GET one pun: /api/puns/9f1c2e4a-...
export async function GET(_request: Request, ctx: RouteContext<'/api/puns/[id]'>) {
  const { id } = await ctx.params // Express: req.params.punId

  try {
    const [pun] = await sql<Pun[]>`select * from puns where id = ${id}`
    if (!pun) {
      return Response.json({ message: 'Pun not found' }, { status: 404 })
    }
    return Response.json(pun)
  } catch {
    // /api/puns/abc isn't a uuid: Postgres throws an error
    return Response.json({ message: 'Pun not found' }, { status: 404 })
  }
}

// PATCH one pun: { "content": "...", "category": "food" }
export async function PATCH(request: Request, ctx: RouteContext<'/api/puns/[id]'>) {
  const { id } = await ctx.params
  const body = await request.json()

  if (!body.content && !body.category) {
    return Response.json({ message: 'Content or category is required' }, { status: 400 })
  }

  try {
    const [pun] = await sql<Pun[]>`
      update puns
      set content = coalesce(${body.content ?? null}, content),
          category = coalesce(${body.category ?? null}, category)
      where id = ${id}
      returning *`

    if (!pun) {
      return Response.json({ message: 'Pun not found' }, { status: 404 })
    }
    return Response.json(pun)
  } catch {
    return Response.json({ message: 'Pun not found' }, { status: 404 })
  }
}

// DELETE one pun
export async function DELETE(_request: Request, ctx: RouteContext<'/api/puns/[id]'>) {
  const { id } = await ctx.params

  try {
    const deleted = await sql`delete from puns where id = ${id}`
    if (deleted.count === 0) {
      return Response.json({ message: 'Pun not found' }, { status: 404 })
    }
    return Response.json({ message: 'Pun deleted' })
  } catch {
    return Response.json({ message: 'Pun not found' }, { status: 404 })
  }
}
