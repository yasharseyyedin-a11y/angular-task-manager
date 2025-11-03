export interface Task {
    id: number;
    title: string;
    dateCreated: Date;
    dueDate?: Date;
    description: string;
}
