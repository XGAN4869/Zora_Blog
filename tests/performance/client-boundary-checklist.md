# 首屏与客户端组件边界清单

## 首屏关键路径

- 首页首屏保留在服务端直接输出的内容：导航、标题、副标题、核心数据卡片、行动按钮、个人概览与优势摘要。
- 博客列表页保留在服务端直接输出的内容：页面标题、筛选区、文章列表。
- 博客详情页保留在服务端直接输出的内容：返回入口、文章元信息、正文内容。

## 客户端专属模块

- `components/common/ThemeToggle.vue`
  - 依赖 `localStorage` 和系统主题检测，必须仅客户端运行。
- `components/blog/CommentsHost.vue`
  - 依赖 `document` 动态插入 Giscus 脚本，只适合客户端挂载。
- `components/profile/GithubActivityPanel.vue` 内的 GitHub 周活跃度图
  - 依赖外部动态图资源，当前改为客户端进入可视区域后再加载。

## 按需加载策略

- 首页的 `GithubActivityPanel` 与 `ProfileQuoteCard`
  - 已切换为 `Lazy` 组件，并使用 `hydrate-on-visible`，避免它们占用首屏 hydration。
- 简历页的 `GithubActivityPanel` 与 `ProfileQuoteCard`
  - 已切换为 `Lazy` 组件，并使用 `hydrate-on-visible`。
- 关于页底部的 `ProfileQuoteCard`
  - 已切换为 `Lazy` 组件，并使用 `hydrate-on-visible`。
- 博客详情页的 `CommentsHost`
  - 已切换为 `Lazy` 组件，并使用 `hydrate-on-visible`，保留正文优先。

## 手动验收建议

- 打开首页，确认首屏文字和卡片先出现，底部 GitHub / Motto 模块滚动到附近时再参与交互。
- 打开博客详情页，确认正文先稳定渲染，评论区不影响正文显示。
- 打开浏览器 DevTools 的 Network / Performance，观察首屏阶段是否不再优先请求底部模块相关脚本。
- 在深色和浅色主题下分别查看 GitHub 模块，确认周活跃度图仍能正确出现。
