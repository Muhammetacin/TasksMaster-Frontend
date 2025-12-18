// src/app/tasks/models/task.model.ts

export enum TaskStatus {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Completed',
  Cancelled = 'Cancelled'
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  createdOn: Date;
  createdBy: string;
  lastModifiedOn: Date;
  status: TaskStatus;
  completedOn?: Date;
}