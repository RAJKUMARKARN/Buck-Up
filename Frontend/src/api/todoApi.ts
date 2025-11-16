import axios from "axios";
import type { Todo } from "../types";


const API_URL = "http://localhost:5000/api/todos";

export const getTodosAPI = async (): Promise<Todo[]> => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data; // important!
};

export const createTodoAPI = async (newTodo: { title: string; description: string }) => {
  const res = await axios.post(API_URL, newTodo, { withCredentials: true });
  return res.data; // <--- this is important, returns the created Todo
};

export const updateTodoAPI = async (
  id: string,
  data: { title: string; description: string }
): Promise<Todo> => {
  const res = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
  return res.data; // return the updated todo
};

export const deleteTodoAPI = async (id: string): Promise<Todo> => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data; // important: return the response
};
