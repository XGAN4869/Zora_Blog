export type ProjectCategoryKey =
  | 'resume'
  | 'study'
  | 'technology'
  | 'education'
  | 'health'

export interface NavItem {
  label: string
  to: string
}

export interface SocialLink {
  label: string
  href: string
  icon?: string
}

export interface ContactItem {
  label: string
  value: string
  href?: string
}

export interface ProjectCategory {
  key: ProjectCategoryKey
  label: string
  description?: string
}

export interface ProjectItem {
  name: string
  description: string
  tags: string[]
  category: ProjectCategoryKey
  href: string
  featured?: boolean
}

export interface HeroStat {
  label: string
  value: string
}

export interface GithubActivityConfig {
  title: string
  description: string
  profileUrl?: string
  username?: string
  stats: HeroStat[]
  focusAreas: string[]
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

export interface EducationItem {
  school: string
  major: string
  period: string
  highlights: string[]
}

export interface ProjectExperienceItem {
  name: string
  period: string
  stack: string[]
  summary: string
  highlights: string[]
}

export interface CommentConfig {
  provider: 'giscus'
  enabled: boolean
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping: 'pathname' | 'url' | 'title' | 'og:title'
  inputPosition: 'top' | 'bottom'
  lang: string
  reactionsEnabled: '0' | '1'
 }

export interface SiteProfile {
  name: string
  englishName: string
  title: string
  subtitle: string
  avatar: string
  location?: string
  phone?: string
  email?: string
  intention?: string
  experience?: string
  education?: string
}

export interface SiteConfig {
  siteName: string
  siteTitle: string
  siteDescription: string
  siteUrl: string
  githubActivity: GithubActivityConfig
  comments: CommentConfig
  profile: SiteProfile
  navItems: NavItem[]
  socialLinks: SocialLink[]
  contacts: ContactItem[]
  projectCategories: ProjectCategory[]
  projects: ProjectItem[]
  heroStats: HeroStat[]
  motto: string
  summary: string[]
  strengths: string[]
  interests: string[]
  skillGroups: SkillGroup[]
  experiences: ExperienceItem[]
  educationList: EducationItem[]
  projectExperiences: ProjectExperienceItem[]
}
