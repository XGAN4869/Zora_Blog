---
title: 用 Nuxt 3 重构个人博客的第一步
description: 从目录结构、内容模型和统一配置开始，先把博客项目的骨架搭稳。
date: 2026-04-08
slug: rebuilding-a-personal-blog-with-nuxt
tags:
  - Nuxt 3
  - 博客系统
  - 工程化
readingTime: 6 分钟
draft: false
---

个人博客项目最容易踩坑的地方，不是页面做不出来，而是前面没有先把内容结构和目录边界定清楚。

这一版项目先把几件基础事情定下来：

- 文章统一放在 `contnet/posts`
- 每篇文章都用 frontmatter 描述元信息
- 列表页和详情页后续都从同一套内容源读取

这样后面做标签筛选、文章详情页和 SEO 时，就不会出现页面各写一套数据的情况。
