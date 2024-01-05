import { Project } from './Projects';

export interface ProjectRespose {
  projectId: string;
  project: Project;
  userId: string;
  role: string;
}
