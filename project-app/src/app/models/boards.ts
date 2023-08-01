import { ProfileUser } from './user-profile';

export interface Boards {
  id:string;
  uid?: string;
  board:Task[];
  // board:boolean;
  title?: string;
  description?: string;
  condition?: boolean;
  columns?:Task[];
  userId:string;
  userIds: string[];
  users: ProfileUser[];
}

export interface BoardList {
  id?: string;
  title?: string;
  description?: string;
  condition?: boolean;
  columns?:Task[];
  tasks?:Task[];
}

export interface Task {
  id?: string;
  title: string;
  description?: string;
  condition?: boolean;
}
