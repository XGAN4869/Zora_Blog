import type { BlogPostPreview } from '~/shared/types/blog'

type BlogSource = {
  title?: string
  description?: string
  date?: string
  slug?: string
  tags?: string[] | null
  readingTime?: string
  draft?: boolean
  path?: string
}

export function normalizeBlogPost<T extends BlogSource>(post: T): T & BlogPostPreview {
  const slug = post.slug ?? ''

  return {
    ...post,
    title: post.title ?? '',
    description: post.description ?? '',
    date: post.date ?? '',
    slug,
    tags: Array.isArray(post.tags) ? post.tags : [],
    readingTime: formatReadingTime(post.readingTime),
    draft: Boolean(post.draft),
    path: post.path ?? `/blog/${slug}`,
  }
}

export function sortPostsByDateDesc<T extends { date: string }>(posts: T[]): T[] {
  return [...posts].sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })
}

export function extractBlogTags<T extends { tags: string[] }>(posts: T[]): string[] {
  return Array.from(new Set(posts.flatMap(post => post.tags)))
    .sort((left, right) => left.localeCompare(right, 'zh-Hans-CN'))
}

export function formatBlogDate(date: string): string {
  if (!date) {
    return ''
  }

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsed)
}

export function formatReadingTime(readingTime: string | undefined): string {
  if (!readingTime) {
    return '未估算'
  }

  const trimmed = readingTime.trim()

  if (!trimmed) {
    return '未估算'
  }

  if (/[分分鐘钟]/.test(trimmed)) {
    return trimmed
  }

  return `${trimmed} 分钟`
}
