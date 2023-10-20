export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "toDo" | "doing" | "done";
  createdBy: {
    _id: string;
    username: string;
    email: string;
    phone: string;
  };
  assignTo: {
    _id: string;
    username: string;
    email: string;
    phone: string;
  };
  deadline: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}


type RestNewTasks = Pick<Task, 'title' | 'description' | 'deadline'>

export interface NewTask extends RestNewTasks {
    assignTo: string
}
