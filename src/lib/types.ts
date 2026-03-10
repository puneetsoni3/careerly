// ============ CORE TYPES ============

export interface UserProfile {
  id?: string;
  name: string;
  college: string;
  branch: string;
  year: number;
  cgpa?: number;
  targetRole: string;
  hoursPerDay: number;
  timelineMonths: number;
  obstacles: string[];
  createdAt?: string;
}

export interface UserSkill {
  id?: string;
  skillName: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'documentation' | 'tool';
  duration?: string;
}

export interface RoadmapProject {
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  githubUrl?: string;
}

export interface RoadmapWeek {
  week: number;
  theme: string;
  topics: string[];
  resources: RoadmapResource[];
  project: RoadmapProject;
  hours: number;
  milestone: string;
  completed?: boolean;
}

export interface Roadmap {
  id?: string;
  careerPath: string;
  totalWeeks: number;
  skillGaps: string[];
  weeks: RoadmapWeek[];
  projects: RoadmapProject[];
  interviewTopics: string[];
  resumeTips: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProgressEntry {
  id?: string;
  weekNumber: number;
  topic: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'technical' | 'hr' | 'dsa' | 'system-design';
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  careerPath: string;
}

export interface ProjectSuggestion {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  careerPath: string;
  githubUrl?: string;
  addedToRoadmap?: boolean;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// Onboarding form data
export interface OnboardingData {
  personalInfo: {
    name: string;
    college: string;
    branch: string;
    year: number;
    cgpa?: number;
  };
  skills: UserSkill[];
  targetRole: string;
  hoursPerDay: number;
  timelineMonths: number;
  obstacles: string[];
}
