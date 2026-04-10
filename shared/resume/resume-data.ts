import { siteConfig } from '../config/site-config'
import type { ResumeVersion } from '../types/resume'

const profile = siteConfig.profile

export const resumeVersions: ResumeVersion[] = [
  {
    id: 'frontend-current',
    label: '当前版本',
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
]

export const defaultResumeVersion = resumeVersions[0]
