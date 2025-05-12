export type HelpRequest = {
  id: string;
  student: string;
  subject: string;
  type: string;
  body: string;
  response?: string;
  priorityLevel: number;
  state: string; //OPEN || RESOLVED
};