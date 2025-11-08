import { api } from '@/lib/apiConfig';
import { ITodo } from '@/types/todos.interface';

export interface IPostBody {
  description: string;
  username: string;
}

class TodoService {
  async getNC(username: string | undefined) {
    const params = new URLSearchParams();
    if (username) params.append('username', username);
    const response = await api.get<ITodo[]>(`/todo/nc?${params.toString()}`);
    return response.data;
  }

  async getC(username: string | undefined) {
    const params = new URLSearchParams();
    if (username) params.append('username', username);
    const response = await api.get<ITodo[]>(`/todo/c?${params.toString()}`);
    return response.data;
  }

  async postTodo(body: IPostBody) {
    const response = await api.post('/todo', body);
    return response;
  }

  async pathTodo(id: string) {
    const response = await api.patch(`/todo/${id}`);
    return response.data;
  }

  async deleteTodo(id: string) {
    const response = await api.delete(`/todo/${id}`);
    return response.data;
  }
}

const todoService = new TodoService();
export default todoService;
