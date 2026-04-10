import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        slug: z.string(),
        tags: z.array(z.string()).default([]),
        readingTime: z.string(),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
