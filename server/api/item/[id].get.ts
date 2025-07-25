import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { item } from '~~/db/schema/item'
import { db } from '~~/server/utils/db-connection'

export default defineEventHandler(async (event) => {
  const itemId = getRouterParam(event, 'id') as string
  if (!z.string().safeParse(itemId).success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid item id',
    })
  }

  return db
    .select()
    .from(item)
    .where(eq(item.id, itemId as string))
})
