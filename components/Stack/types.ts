export interface SkillCategory {
  id: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}
