import type { SiteConfig } from '../types/site'

export const siteConfig: SiteConfig = {
  siteName: 'ZORA', 
  siteTitle: '小甘的前端开发主页',
  siteDescription: '具有工业设计背景的前端开发工程师，熟悉 Vue 生态、后台管理系统与移动端业务开发。',
  siteUrl: 'https://example.com',
  githubActivity: {
    title: 'GitHub 活跃度',
    description: '把个人项目、前端练习和博客相关沉淀逐步汇总到 GitHub，方便在主页和简历页统一展示。',
    profileUrl: 'https://github.com/XGAN4869',
    username: 'XGAN4869',
    focusAreas: ['后台管理系统', '移动端业务', '组件抽象', '博客内容沉淀'],
  },
  comments: {
    provider: 'giscus',
    enabled: false,
    repo: '',
    repoId: '',
    category: 'General',
    categoryId: '',
    mapping: 'pathname',
    inputPosition: 'top',
    lang: 'zh-CN',
    reactionsEnabled: '1',
  },
  profile: {
    name: '甘林涵',
    englishName: 'Gan Linhan',
    title: '前端开发工程师',
    subtitle: '工业设计背景出身，擅长把设计思维、Vue 工程化和业务体验一起落到页面里。',
    avatar: '/avatar.png',
    location: '上海 / 杭州方向',
    phone: '15158150573',
    email: '2421605030@qq.com',
    intention: '前端开发 | 随时到岗',
    experience: '1年',
    education: '统招本科 | 全日制',
  },
  navItems: [
    { label: '首页', to: '/' },
    { label: '博客', to: '/blog' },
    { label: '简历', to: '/resume' },
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/XGAN4869' },
    { label: '邮箱', href: 'mailto:2421605030@qq.com' },
    { label: '电话', href: 'tel:15158150573' },
  ],
  contacts: [
    {
      label: '电话',
      value: '15158150573',
      href: 'tel:15158150573',
    },
    {
      label: '邮箱',
      value: '2421605030@qq.com',
      href: 'mailto:2421605030@qq.com',
    },
    {
      label: '求职意向',
      value: '前端开发 | 随时到岗',
    },
  ],
  projectCategories: [
    { key: 'technology', label: '业务项目' },
    { key: 'study', label: '学习积累' },
    { key: 'resume', label: '简历重点' },
    { key: 'education', label: '教育背景' },
    { key: 'health', label: '个人成长' },
  ],
  projects: [
    {
      name: 'PC端商品电商后台管理系统',
      description: '基于 Vue3 + Element Plus 的商品电商后台，覆盖商品、订单、权限、分销和数据统计等核心模块。',
      tags: ['Vue3', 'Element Plus', 'Pinia', 'Axios', 'ECharts'],
      category: 'technology',
      href: '/resume',
      featured: true,
    },
    {
      name: '移动端外卖点餐系统',
      description: '基于 Vue3 + Vant UI 的移动端点餐应用，完成购物车、地址、订单生成和多页面状态联动。',
      tags: ['Vue3', 'Vant UI', 'Pinia', '移动端适配'],
      category: 'technology',
      href: '/resume',
      featured: true,
    },
  ],
  motto: '把设计感、业务感和代码质量一起做扎实。',
  summary: [
    '具有工业设计专业背景，擅长将设计思维与前端开发结合，能够高效还原设计稿并持续优化用户体验。',
    '自学半年成功转向前端开发，已经具备后台管理系统和移动端业务项目的真实落地经验。',
    '熟悉 Vue2 / Vue3、Pinia、Element Plus、Vant UI、Axios 二次封装、ECharts 与 AI 辅助开发工作流。',
  ],
  strengths: [
    '后台工程化能力：做过动态路由权限、通用组件库和组合式函数沉淀。',
    '移动端业务落地：完整参与购物车、地址、订单生成和状态同步链路。',
    '设计协同优势：会 Figma、Sketch、蓝湖、PS、AI，能更顺畅地把设计稿转成可交付页面。',
  ],
  interests: ['乒乓球', '摄影', 'UI 设计'],
  skillGroups: [
    {
      title: '前端基础',
      items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Less', '响应式布局', '移动端适配'],
    },
    {
      title: 'Vue 生态',
      items: ['Vue2', 'Vue3', 'Vue Router', 'Vuex', 'Pinia', 'Composition API'],
    },
    {
      title: '工程与接口',
      items: ['Vite', 'Axios 二封', 'Token 无感刷新', '请求取消', 'Git', 'Node.js 基础'],
    },
    {
      title: 'UI 与效率工具',
      items: ['Element Plus', 'Vant UI', 'ECharts', 'Copilot', 'ChatGPT', 'Claude', 'Figma', 'Sketch', '蓝湖'],
    },
  ],
  experiences: [
    {
      company: '上海食万优选商贸有限公司',
      role: '前端开发工程师',
      period: '2025.03 - 2026.03',
      description: '参与电商后台和移动端点餐系统开发，围绕商品管理、分销配置、地址管理、订单流转和数据看板等业务模块持续迭代。',
      highlights: [
        '累计参与 40+ 业务页面开发，封装 20+ 通用组件，沉淀 10+ 组合式函数。',
        '负责 Axios 二次封装、动态路由权限、列表/表单通用逻辑抽象，提升团队开发效率。',
        '同时具备后台管理系统和移动端点餐业务的落地经验，兼顾工程化与用户体验。',
      ],
    },
  ],
  educationList: [
    {
      school: '浙大城市学院',
      major: '工业设计',
      period: '2021.09 - 2025.07',
      highlights: [
        '专业成绩前 13%。',
        '主修课程包括高数(91)、交互设计、用户体验设计、产品系统设计、设计思维表达、Java、HTML 等。',
        '校内证书与荣誉包括 CET-6、工业互联网平台开发工程师、学业奖学金二等奖 / 三等奖。',
        '校外获奖包括浙江省第十四届蓝桥杯 JavaB 组三等奖、浙江省第十六届工业设计竞赛产业赛三等奖。',
      ],
    },
  ],
  projectExperiences: [
    {
      name: 'PC端商品电商后台管理系统',
      period: '2025.06 - 2026.03',
      stack: ['Vue3', 'Element Plus', 'Pinia', 'Axios', 'ECharts'],
      summary: '面向商品、订单、用户、权限、分销和数据统计等核心业务场景的后台管理系统，针对商品成色描述、多规格属性和审核流程做了定制化开发。',
      highlights: [
        '实现 Axios 二次封装，覆盖请求/响应拦截器、无感刷新 Token、统一错误处理和请求取消机制。',
        '基于后端菜单动态生成路由，并结合路由守卫完成菜单级权限控制与刷新恢复。',
        '沉淀 useInitTable 和 useInitForm 等组合式函数，统一管理分页、搜索与增删改查流程。',
        '开发 FormDrawer、ListHeader、ChooseImage、Search 等 20+ 通用组件，降低重复开发成本。',
        '参与 SKU 规格管理、图库模块、分销配置和 ECharts 后台看板等复杂业务模块建设。',
      ],
    },
    {
      name: '移动端外卖点餐系统',
      period: '2025.03 - 2025.06',
      stack: ['Vue3', 'Vant UI', 'Pinia', 'postcss-px-to-viewport'],
      summary: '基于 Vue3 + Vant UI 的移动端点餐应用，覆盖店铺浏览、菜品点购、购物车管理、地址管理、订单生成等核心流程。',
      highlights: [
        '通过 Pinia 统一管理购物车和地址状态，保证点餐页、购物车页、订单页之间的数据实时同步。',
        '实现购物车数量增减、全选/取消全选、编辑删除和 localStorage 持久化。',
        '完成地址增删改查、默认地址与地址联动逻辑，确保订单页自动带出收货地址。',
        '落地订单确认、价格计算、提交防抖、成功弹窗、页面跳转和购物车自动清空等完整下单流程。',
        '结合 Vant UI 和 px-to-viewport 完成多端适配，保证不同移动设备下的界面一致性。',
      ],
    },
  ],
}
