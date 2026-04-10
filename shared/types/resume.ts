import type {
  ContactItem,
  EducationItem,
  ExperienceItem,
  HeroStat,
  ProjectExperienceItem,
  SkillGroup,
} from './site'

export interface ResumeProfileCard {
  label: string
  value: string
  detail?: string
}

export interface ResumeNarrativeBlock {
  eyebrow: string
  title: string
  items: string[]
}

export interface ResumePlaceholderBlock {
  eyebrow: string
  title: string
  description: string
  hint?: string
}

export interface ResumeQuoteBlock {
  eyebrow: string
  title: string
  description: string
}

export interface ResumeVersion {
  id: string
  label: string
  period: string
  switcherHint: string
  eyebrow: string
  pageTitle: string
  pageDescription: string
  headerTitle: string
  headerSubtitle: string
  contactItems: ContactItem[]
  heroStats: HeroStat[]
  profileCards: ResumeProfileCard[]
  summary: ResumeNarrativeBlock
  skillGroups: SkillGroup[]
  projectExperiences: ProjectExperienceItem[]
  experiences: ExperienceItem[]
  educationList: EducationItem[]
  placeholder: ResumePlaceholderBlock
  quote: ResumeQuoteBlock
}
