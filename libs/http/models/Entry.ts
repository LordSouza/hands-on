import { Project } from './Projects';
import { User } from './User';

export interface Entry {
    id: string;
    createdDate: string;
    description: string;
    filesUrl: string[];
    userDTO: User;
    projectDTO: Project;
}
