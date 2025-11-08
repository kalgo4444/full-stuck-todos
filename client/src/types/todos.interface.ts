export interface ITodo {
  _id: string;
  description: string;
  completed: boolean;
  username: string;
  createdAt: string; // Typically a string representing an ISO date/time
  updatedAt: string; // Typically a string representing an ISO date/time
  __v: number;
}
