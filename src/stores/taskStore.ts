import create from 'zustand';

// Define the shape of the task object
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  member: string;
  serviceId: number;
}

// Define the shape of the state
interface TaskState {
  tasks: Task[];
  addTask: (newTask: Task) => void;
}

// Function to get the next available ID
const getNextId = (tasks: Task[]) => {
  const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 1);
  return maxId + 1;
};

// Load tasks from local storage
const loadTasksFromLocalStorage = (): Task[] => {
  const tasksJson = localStorage.getItem('tasks');
  return tasksJson ? JSON.parse(tasksJson) : [];
};

// Save tasks to local storage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Create the Zustand store
export const useTaskStore = create<TaskState>((set) => ({
  tasks: loadTasksFromLocalStorage(), // Load tasks from local storage
  addTask: (newTask) =>
    set((state) => {
      const id = state.tasks.length === 0 ? 0 : getNextId(state.tasks);
      const updatedTask = { ...newTask, id };
      const updatedTasks = [...state.tasks, updatedTask];
      saveTasksToLocalStorage(updatedTasks); // Save tasks to local storage
      return { tasks: updatedTasks };
    }),
}));
