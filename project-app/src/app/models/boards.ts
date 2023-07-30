import { ProfileUser } from './user-profile';

export interface Boards {
  id:string;
  uid?: string;
  title?: string;
  description?: string;
  condition?: boolean;
   columns?:BoardList[];
  userIds: string[];
  users: ProfileUser[];
}

export interface BoardList {
  id?: string;
  title?: string;
  description?: string;
  condition?: boolean;
  tasks?:Task[];
}

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  condition?: boolean;
}
