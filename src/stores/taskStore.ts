import create from 'zustand';

// Define the shape of the task object
interface Task {
  id: number;
  title: string;
  description: string;
  status: string; // "To Do", "In Progress", "Done"
  dueDate: string;
  member: string;
  serviceId: number;
  isCompleted: boolean;
}

// Define the shape of the state
interface TaskState {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void; 
  toggleIsComplete: (taskId: number) => void;
}

// Function to get the next available ID
const getNextId = (tasks: Task[]) => {
  const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 1);
  return maxId + 1;
};

// Load tasks from local storage (optional)
const loadTasksFromLocalStorage = (): Task[] => {
  const tasksJson = localStorage.getItem('tasks');
  return tasksJson ? JSON.parse(tasksJson) : [];
};

// Save tasks to local storage (optional)
const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Create the Zustand store
export const useTaskStore = create<TaskState>((set) => ({
  tasks: loadTasksFromLocalStorage(), // Load tasks from local storage (optional)
  addTask: (newTask) =>
    set((state) => {
      const id = state.tasks.length === 0 ? 1 : getNextId(state.tasks);
      const updatedTask = { ...newTask, id };
      const updatedTasks = [...state.tasks, updatedTask];
      saveTasksToLocalStorage(updatedTasks); // Save tasks to local storage (optional)
      return { tasks: updatedTasks };
    }),
  updateTask: (taskId, updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );
      saveTasksToLocalStorage(updatedTasks); // Save tasks to local storage (optional)
      return { tasks: updatedTasks };
    }),
  toggleIsComplete: (taskId:any) =>
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        );
        saveTasksToLocalStorage(updatedTasks); // Save tasks to local storage (optional)
        return { tasks: updatedTasks };
      }),
}));
