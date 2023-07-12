import { getItemsByCategories } from '@/composables/dynamodb'

export default defineEventHandler(async (event) => {
  if (!event.context || !event.context.params)
    throw new Error('Params is required for this operation.')

  const category = event.context.params.category

  if (!category)
    throw new Error('Category is required for this operation.')
  return await getItemsByCategories(category)
})
