export type Comment = {
    id: number;
    taskId:number;
    userName?: string;
    description:string| null;
  };
  
  export type ProjectViewProps = {
    title: string;
    projectId: number;
    creator: string;
    description:string;
    tasksCount: number;
  };

  export type TaskViewProps = {
    taskId:number;
    title: string;
    projectTitle: string;
    creator: string;
    asignedTo?: string;
    description:string;
    status: string;
    comment?: Comment[]  | undefined;
  };

  export type TaskDetails = {
    title: string;
    description: string | null;
    creator: {
      name: string;
    };
    assignedUser?: {
      name: string;
    } | null;
    project: {
      title: string;
    };
    comments: {
      id: number;
      description: string;
      user: {
        name: string;
      };
    }[];
  };