import { z } from 'zod'
import { item } from '~~/db/schema/item'
import { db } from '~~/server/utils/db-connection'
import { handleDatabaseError } from '~~/server/utils/db-error-handler'
import defineValidatedEventHandler from '~~/server/utils/define-validated-event-handler'

const itemSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  is_private: z.boolean(),
})

export default defineValidatedEventHandler(itemSchema, async (event) => {
  const { body: newItem } = event.context.validated

  try {
    await db
      .insert(item)
      .values(newItem)

    return null
  }
  catch (error) {
    const { statusMessage, statusCode } = handleDatabaseError(error)

    throw createError({
      statusCode,
      statusMessage,
    })
  }
})
