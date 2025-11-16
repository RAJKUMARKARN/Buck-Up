import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodosAPI,
  createTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from "../api/todoApi";

interface Todo {
  _id: string;
  title: string;
  description: string;
}

export default function TodoDashboard() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  //  useQuery call
  const { data: todos, isLoading } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodosAPI,
  });

  // typed create mutation
  const createTodoMutation = useMutation<Todo, Error, { title: string; description: string }>({
  mutationFn: (newTodo) => createTodoAPI(newTodo),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});


//   typed update mutation
  const updateTodoMutation = useMutation<
  Todo,
  Error,
  { id: string; data: { title: string; description: string } }
>({
  mutationFn: ({ id, data }) => updateTodoAPI(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    setEditId(null);
    setTitle("");
    setDescription("");
  },
});

  // ✅ Properly typed delete mutation
 const deleteTodoMutation = useMutation<void, Error, string>({
  mutationFn: async (id) => {
    await deleteTodoAPI(id);
  },
  onSuccess: () => queryClient.invalidateQueries({
  queryKey: ["todos"],
  exact: true,
}),

});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateTodoMutation.mutate({ id: editId, data: { title, description } });
    } else {
      createTodoMutation.mutate({ title, description });
    }
    setTitle("");
    setDescription("");
  };

  const handleEdit = (todo: Todo) => {
    setEditId(todo._id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  return (
  <div className="w-full h-screen bg-[#EFECEC] flex items-start justify-center pt-10">
  <div className="p-[10px] mt-[30px] max-w-xl bg-white rounded-[30px] shadow-lg shadow-gray-500/50 flex flex-col justify-start items-center w-[400px] max-h-[80vh] overflow-y-auto">
    <h1 className="text-[50px] bg-gradient-to-b from-[#0A325D]  to-[#0FA9E3] bg-clip-text text-transparent font-bold mb-4">My Todos</h1>

    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 w-full">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="rounded-md font-medium text-[#848484] focus:bg-white bg-[#EFECEC] p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="rounded-md font-medium text-[#848484] focus:bg-white bg-[#EFECEC] p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        {editId ? "Update Todo" : "Add Todo"}
      </button>
    </form>

    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <ul className="space-y-2 w-full">
        {todos?.map((todo) => (
          <li
            key={todo._id}
            className="p-2 border border-zinc-300 rounded flex justify-between items-center w-full"
          >
            <div>
              <h3 className="font-bold">{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(todo)}
                className="bg-yellow-500 p-1 rounded text-white text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodoMutation.mutate(todo._id)}
                className="bg-red-500 p-1 rounded text-white text-xs"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
}
