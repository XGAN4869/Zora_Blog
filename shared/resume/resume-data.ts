import { siteConfig } from '../config/site-config'
import type { ResumeVersion } from '../types/resume'

const profile = siteConfig.profile

export const resumeVersions: ResumeVersion[] = [
  {
    id: 'frontend-current',
    label: '当前版本',
    period: '2026',
    switcherHint: '突出业务项目、工程化能力与前端岗位匹配度。',
    eyebrow: 'Resume',
    pageTitle: '在线简历',
    pageDescription: '把简历做成结构化页面，先清晰展示能力边界，后续再继续接版本切换与复用模块。',
    headerTitle: `${profile.name} | ${profile.title}`,
    headerSubtitle: profile.subtitle,
    contactItems: siteConfig.contacts,
    heroStats: siteConfig.heroStats,
    profileCards: [
      {
        label: '求职方向',
        value: profile.intention ?? '前端开发',
        detail: `${profile.experience ?? '1年'}前端经验 / ${profile.education ?? '统招本科'}`,
      },
      {
        label: '当前城市',
        value: profile.location ?? '上海',
        detail: `${profile.phone ?? ''} ${profile.email ?? ''}`.trim(),
      },
      {
        label: '擅长方向',
        value: 'Vue 工程化与业务页面',
        detail: '后台管理系统、移动端业务、设计协同落地',
      },
    ],
    summary: {
      eyebrow: 'Summary',
      title: '个人总结',
      items: siteConfig.summary,
    },
    skillGroups: siteConfig.skillGroups,
    projectExperiences: siteConfig.projectExperiences,
    experiences: siteConfig.experiences,
    educationList: siteConfig.educationList,
    placeholder: {
      eyebrow: 'Timeline',
      title: '更多经历正在整理中',
      description: '这一块先保留为经历占位区，后续可以继续补充阶段性项目、证书、竞赛或成长节点。',
      hint: '下一步会在这里接入简历版本切换，让当前版和历史版都能独立查看。',
    },
    quote: {
      eyebrow: 'Motto',
      title: siteConfig.motto,
      description: '希望把页面表达、业务理解和工程质量一起做扎实，让简历也能像作品一样被浏览和判断。',
    },
  },
  {
    id: 'transition-archive',
    label: '转型版本',
    period: '2025',
    switcherHint: '强调设计背景、学习迁移能力与前端转型路径。',
    eyebrow: 'Archive',
    pageTitle: '转型阶段简历',
    pageDescription: '保留一份偏转型表达的历史版本，用来展示从工业设计走向前端开发时的能力迁移路径。',
    headerTitle: `${profile.name} | 设计转前端阶段`,
    headerSubtitle: '用设计理解用户体验，用前端工程把体验真正落到页面里，这是我从工业设计转向前端时最明确的主线。',
    contactItems: siteConfig.contacts,
    heroStats: [
      { label: '转型周期', value: '6 个月' },
      { label: '学习项目', value: '10+' },
      { label: '设计协作工具', value: '8+' },
    ],
    profileCards: [
      {
        label: '转型目标',
        value: '前端开发 / 设计协同方向',
        detail: '希望进入能兼顾业务实现与体验落地的前端岗位。',
      },
      {
        label: '能力迁移',
        value: '工业设计 -> 前端开发',
        detail: '从用户体验、信息层级和交互细节出发理解页面实现。',
      },
      {
        label: '当前优势',
        value: '学习速度与落地意愿',
        detail: '持续用真实项目练习组件封装、状态管理和接口联调。',
      },
    ],
    summary: {
      eyebrow: 'Summary',
      title: '转型总结',
      items: [
        '工业设计专业背景让我更习惯先理解用户场景、信息优先级和视觉节奏，再进入具体页面实现。',
        '自学前端阶段重点补齐了 JavaScript、Vue3、组件通信、状态管理和接口联调等能力，并通过后台与移动端项目做密集练习。',
        '这一版简历更强调成长曲线和迁移能力，适合展示从设计走向前端开发的完整过程。',
      ],
    },
    skillGroups: [
      siteConfig.skillGroups[0],
      siteConfig.skillGroups[1],
      {
        title: '设计协同',
        items: ['Figma', 'Sketch', '蓝湖', 'Photoshop', 'Illustrator', '设计还原'],
      },
      {
        title: '学习沉淀',
        items: ['组件拆分', '接口联调', '状态管理', '移动端适配', '问题复盘', 'AI 辅助开发'],
      },
    ],
    projectExperiences: siteConfig.projectExperiences,
    experiences: [
      {
        company: '前端转型阶段',
        role: '自学与项目实践',
        period: '2024.09 - 2025.02',
        description: '围绕 Vue3、Pinia、Element Plus 和 Vant UI 持续练习，通过成体系的项目拆解，把知识点变成可展示的页面与组件能力。',
        highlights: [
          '从零搭建练习项目，熟悉路由、状态管理、组件拆分、表单交互和接口联调。',
          '把设计理解转成页面实现习惯，更关注信息结构、层级和用户操作路径。',
          '通过持续复盘和 AI 辅助工具，缩短问题定位和知识吸收的周期。',
        ],
      },
    ],
    educationList: siteConfig.educationList,
    placeholder: {
      eyebrow: 'Timeline',
      title: '历史版本保留区',
      description: '这份版本保留了从工业设计转向前端开发时的表达方式，后续也可以继续扩展成更多时间节点。',
      hint: '你后面可以继续加入校招版、业务版或英文版，让简历页真正像一个可切换的在线作品。',
    },
    quote: {
      eyebrow: 'Growth',
      title: '把设计思维转成工程表达',
      description: '历史版本不只是备份，更能让人看到能力是怎么积累出来的。',
    },
  },
]

export const defaultResumeVersion = resumeVersions[0]
