import { computed, ref } from 'vue'
import { extractBlogTags } from '~/shared/blog/blog-utils'
import type { BlogPostPreview } from '~/shared/types/blog'

export function useBlogFilter(posts: Ref<BlogPostPreview[]>) {
  const selectedTag = ref<string | null>(null)

  const availableTags = computed(() => {
    return extractBlogTags(posts.value)
  })

  const filteredPosts = computed(() => {
    if (!selectedTag.value) {
      return posts.value
    }

    return posts.value.filter(post => post.tags.includes(selectedTag.value as string))
  })

  const hasPosts = computed(() => posts.value.length > 0)
  const hasFilteredPosts = computed(() => filteredPosts.value.length > 0)

  const setTag = (tag: string | null) => {
    selectedTag.value = tag
  }

  const clearTag = () => {
    selectedTag.value = null
  }

  return {
    selectedTag,
    availableTags,
    filteredPosts,
    hasPosts,
    hasFilteredPosts,
    setTag,
    clearTag,
  }
}
