export interface Boards {
    id?: string;
    title?: string;
    description?: string;
    condition?: boolean;
    columns?:BoardList[];
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