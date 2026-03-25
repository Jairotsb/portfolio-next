export interface Course {
  id: number;
  name: string;
  institution: 'Rocketseat' | 'Uniamérica';
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Mobile' | 'DevOps' | 'Design';
  image: string;
  certificateUrl?: string;
  completedAt?: string;
}
