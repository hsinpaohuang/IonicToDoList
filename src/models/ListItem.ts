export type ListItem = {
  id: number;
  type: ListItemType;
  title: string;
  content: string;
  images?: string[];
  createdAt: string;
  completedAt?: string;
  dueAt?: string;
  archivedAt?: string;
}

export enum ListItemType {
  Todo = 'todo',
  Completed = 'completed',
  Archived = 'archived',
}

export const base64Header = 'data:image/jpeg;base64,';
