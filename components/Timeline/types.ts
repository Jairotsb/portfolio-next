export interface TimelineExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string; // ISO format for sorting
  endDate: string | null; // null if current
  description: string;
  current: boolean;
  achievements: string[];
  type: 'work' | 'education';
}
