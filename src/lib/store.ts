import type { UserProfile, UserSkill, Roadmap, ProgressEntry, ChatMessage, OnboardingData } from './types';

const KEYS = {
  PROFILE: 'careerly_profile',
  SKILLS: 'careerly_skills',
  ROADMAP: 'careerly_roadmap',
  PROGRESS: 'careerly_progress',
  CHAT: 'careerly_chat',
  ONBOARDING: 'careerly_onboarding',
  STREAK: 'careerly_streak',
  STUDY_LOG: 'careerly_study_log',
};

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Profile
export function getProfile(): UserProfile | null {
  return getItem<UserProfile | null>(KEYS.PROFILE, null);
}

export function saveProfile(profile: UserProfile): void {
  setItem(KEYS.PROFILE, profile);
}

// Skills
export function getSkills(): UserSkill[] {
  return getItem<UserSkill[]>(KEYS.SKILLS, []);
}

export function saveSkills(skills: UserSkill[]): void {
  setItem(KEYS.SKILLS, skills);
}

// Roadmap
export function getRoadmap(): Roadmap | null {
  return getItem<Roadmap | null>(KEYS.ROADMAP, null);
}

export function saveRoadmap(roadmap: Roadmap): void {
  setItem(KEYS.ROADMAP, { ...roadmap, updatedAt: new Date().toISOString() });
}

// Progress
export function getProgress(): ProgressEntry[] {
  return getItem<ProgressEntry[]>(KEYS.PROGRESS, []);
}

export function saveProgress(entries: ProgressEntry[]): void {
  setItem(KEYS.PROGRESS, entries);
}

export function toggleTopicComplete(weekNumber: number, topic: string): ProgressEntry[] {
  const entries = getProgress();
  const existingIdx = entries.findIndex(e => e.weekNumber === weekNumber && e.topic === topic);
  
  if (existingIdx >= 0) {
    entries[existingIdx].completed = !entries[existingIdx].completed;
    entries[existingIdx].completedAt = entries[existingIdx].completed ? new Date().toISOString() : undefined;
  } else {
    entries.push({
      id: crypto.randomUUID(),
      weekNumber,
      topic,
      completed: true,
      completedAt: new Date().toISOString(),
    });
  }
  
  saveProgress(entries);
  return entries;
}

// Chat
export function getChatMessages(): ChatMessage[] {
  return getItem<ChatMessage[]>(KEYS.CHAT, []);
}

export function saveChatMessages(messages: ChatMessage[]): void {
  setItem(KEYS.CHAT, messages);
}

export function addChatMessage(role: 'user' | 'assistant', content: string): ChatMessage[] {
  const messages = getChatMessages();
  messages.push({
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  });
  saveChatMessages(messages);
  return messages;
}

// Onboarding
export function getOnboardingData(): OnboardingData | null {
  return getItem<OnboardingData | null>(KEYS.ONBOARDING, null);
}

export function saveOnboardingData(data: OnboardingData): void {
  setItem(KEYS.ONBOARDING, data);
}

// Streak tracking
export function getStreak(): { current: number; lastDate: string | null; studyDates: string[] } {
  return getItem(KEYS.STREAK, { current: 0, lastDate: null, studyDates: [] });
}

export function recordStudyDay(): { current: number; lastDate: string; studyDates: string[] } {
  const streak = getStreak();
  const today = new Date().toISOString().split('T')[0];
  
  if (streak.lastDate === today) return streak as { current: number; lastDate: string; studyDates: string[] };
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const newCurrent = streak.lastDate === yesterday ? streak.current + 1 : 1;
  const studyDates = [...new Set([...streak.studyDates, today])];
  
  const newStreak = { current: newCurrent, lastDate: today, studyDates };
  setItem(KEYS.STREAK, newStreak);
  return newStreak;
}

// Study log
export function getStudyLog(): { date: string; hours: number }[] {
  return getItem(KEYS.STUDY_LOG, []);
}

export function logStudyHours(hours: number): void {
  const log = getStudyLog();
  const today = new Date().toISOString().split('T')[0];
  const existingIdx = log.findIndex(e => e.date === today);
  
  if (existingIdx >= 0) {
    log[existingIdx].hours += hours;
  } else {
    log.push({ date: today, hours });
  }
  
  setItem(KEYS.STUDY_LOG, log);
  recordStudyDay();
}

// Check if user has completed onboarding
export function isOnboarded(): boolean {
  return getProfile() !== null && getRoadmap() !== null;
}

// Clear all data  
export function clearAllData(): void {
  Object.values(KEYS).forEach(key => {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  });
}
