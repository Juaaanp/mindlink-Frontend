export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface StudyGroup {
  id: number;
  topic: string;
  description?: string;
  students: Student[];
  contents: string[];
}