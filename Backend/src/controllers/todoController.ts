import Todo from "../models/todo";

export const createTodo = async (req: any, res: any) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description, user: req.user.id });
    await todo.save();
    res.status(201).json(todo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req: any, res: any) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req: any, res: any) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req: any, res: any) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
