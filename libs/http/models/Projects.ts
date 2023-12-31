import { Address } from './address';
import { User } from './User';

export interface Project {
    id?: string;
    name: string;
    address: Address;
    createdDate?: string;
    users?: User[];
}
