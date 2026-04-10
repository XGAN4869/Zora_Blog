export interface BlogPostMeta {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  readingTime: string
  draft?: boolean
}

export interface BlogPostPreview extends BlogPostMeta {
  path: string
}
