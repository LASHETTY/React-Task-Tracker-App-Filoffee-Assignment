export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
}
