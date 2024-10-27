import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

// Task interface
interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  member: string;
  serviceId: number;
  isCompleted: boolean;
}

// Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

// State interface
interface TaskState {
  tasks: Task[];
  projects: Project[];
  addTask: (newTask: Omit<Task, 'id'>) => void; // Remove id from the new task
  deleteProject: (projectId: string) => void;
  setProjects: (newProjects: Project[]) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  toggleIsComplete: (taskId: number) => void;
  updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
  deleteTask: (taskId: number) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

// Function to get the next ID for new tasks
const getNextId = (tasks: Task[]) => tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

// Check if local storage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch {
    return false;
  }
};

// Load data from local storage with a fallback option
export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    console.error(`Error loading ${key} from localStorage.`);
    return fallback;
  }
};

// Save data to local storage
const saveToLocalStorage = <T>(key: string, data: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.error(`Error saving ${key} to localStorage.`);
  }
};

// Create Zustand store
export const useTaskStore = create<TaskState>()(
  immer((set, get) => {
    // Load initial state from localStorage once
    const initialTasks = loadFromLocalStorage<Task[]>('tasks', []);
    const initialProjects = loadFromLocalStorage<Project[]>('projects', []);

    return {
      tasks: initialTasks,
      projects: initialProjects,

      // Add a new task
      addTask: (newTask) => set((state) => {
        const id = getNextId(state.tasks);
        const updatedTask = { ...newTask, id };
        const updatedTasks = [...state.tasks, updatedTask];
        saveToLocalStorage('tasks', updatedTasks); // Save to localStorage after updating
        state.tasks = updatedTasks; // Update state
      }),

      // Delete a project
      deleteProject: (projectId) => set((state) => {
        const updatedProjects = state.projects.filter((project) => project.id !== projectId);
        saveToLocalStorage('projects', updatedProjects); // Save to localStorage after updating
        state.projects = updatedProjects; // Update state
      }),

      // Set new projects
      setProjects: (newProjects) => {
        saveToLocalStorage('projects', newProjects); // Save to localStorage
        set({ projects: newProjects }); // Update state
      },

      // Update a task
      updateTask: (taskId, updatedTask) => set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        );
        saveToLocalStorage('tasks', updatedTasks); // Save to localStorage after updating
        state.tasks = updatedTasks; // Update state
      }),

      // Toggle task completion status
      toggleIsComplete: (taskId) => set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        );
        saveToLocalStorage('tasks', updatedTasks); // Save to localStorage after updating
        state.tasks = updatedTasks; // Update state
      }),

      // Update task status
      updateTaskStatus: (taskId, newStatus) => set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        saveToLocalStorage('tasks', updatedTasks); // Save to localStorage after updating
        state.tasks = updatedTasks; // Update state
      }),

      // Delete a task
      deleteTask: (taskId) => set((state) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
        saveToLocalStorage('tasks', updatedTasks); // Save to localStorage after updating
        state.tasks = updatedTasks; // Update state
      }),

      // Get tasks by status
      getTasksByStatus: (status) => get().tasks.filter((task) => task.status === status),
    };
  })
);
