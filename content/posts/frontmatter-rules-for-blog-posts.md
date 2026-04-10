---
title: 个人博客文章元信息规范
description: 给文章建立统一的 frontmatter 规则，后续列表页、详情页和筛选能力都会更稳定。
date: 2026-04-09
slug: frontmatter-rules-for-blog-posts
tags:
  - Frontmatter
  - 内容管理
  - 规范设计
readingTime: 7 分钟
draft: false
---

一篇博客文章至少需要这些字段：

- `title`：文章标题
- `description`：列表摘要和 SEO 描述
- `date`：发布时间，用于排序和展示
- `slug`：详情页路由标识
- `tags`：标签筛选来源
- `readingTime`：列表和详情页都会展示

这一步先不追求内容渲染细节，而是先把“内容怎么存、怎么读、后面怎么复用”固定下来。

## 为什么 frontmatter 很重要

如果没有统一的 frontmatter 规范，博客项目后期通常会出现几个问题：

- 列表页不知道该取哪些字段
- 文章详情页的 SEO 信息不完整
- 标签筛选没有稳定来源
- 同一批文章格式不统一，后期很难维护

所以 frontmatter 本质上不是“写给机器看的额外负担”，而是你给整个博客系统定的一份合同。

## JavaScript 里也有类似的设计思想

其实前端工程里很多规范化动作，背后都和 JavaScript 数据结构设计有关。

比如我们在 JS 里会强调“对象结构稳定”，因为一旦结构经常变化，代码可读性和可维护性都会迅速下降：

```js
const post = {
  title: 'Vue 响应式原理入门',
  description: '用更容易理解的方式梳理 reactive 和 ref。',
  date: '2026-04-09',
  slug: 'vue-reactivity-intro',
  tags: ['Vue 3', 'JavaScript'],
  readingTime: '6 分钟',
}
```

当每篇文章都遵守同一份结构时：

- 列表页能稳定渲染
- 详情页能稳定取值
- 筛选逻辑不用写很多兜底

## 字段怎么设计才算够用

对于个人博客，我更建议字段先少后多。

一个最小但够用的版本：

- `title`
- `description`
- `date`
- `slug`
- `tags`
- `readingTime`
- `draft`

只有当你后面真的需要时，再加：

- `cover`
- `category`
- `series`
- `updatedAt`
- `recommend`

这样做的好处是不会一开始就把内容管理搞得很重。

## Vue 项目里怎么消费这些数据

如果你是用 Vue 或 Nuxt 做博客，前端最好把这份文章数据当成只读内容源。

页面组件不要自己发明额外字段，也不要在模板里散落默认值判断。更好的方式是：

- 内容目录负责“原始文章数据”
- composable 负责“筛选和排序”
- 页面组件负责“展示”

这个思路和我们写 Vue 项目时强调的“单向数据流”和“职责分离”是一致的。

## 小结

博客文章的 frontmatter 规范，表面上是在整理内容，实际上是在给整个项目减少后期维护成本。只要这一步做得稳，后面无论是加博客详情页还是加搜索，都会轻松很多。
