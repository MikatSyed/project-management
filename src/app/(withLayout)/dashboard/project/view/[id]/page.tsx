"use client"
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ActionBar from '@/components/UI/ActionBar';
import TaskModal from '@/components/UI/TaskModal';
import { message } from 'antd';
import FilterSection from '@/components/pages/FilterSection';
import TeamMember from '@/components/pages/TeamMember';
import TaskList from '@/components/pages/TaskList';
import TaskManagement from '@/components/pages/TaskManagement';
import { loadFromLocalStorage } from '@/stores/taskStore';
import { projectData, Task, teamMembers } from '@/utils/data';



type IDProps = {
  params: { id: string };
};

const ProjectDetailsPage: React.FC<IDProps> = ({ params }) => {
  const { id } = params; 
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dueDateFilter, setDueDateFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>(''); 
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const currentProject = projectData.projects.find(project => project.id === id);
  
  if (!currentProject) {
    return <div className="text-center">Project not found</div>;
  }

  const { title, description } = currentProject;

  useEffect(() => {
    loadTasks();
  }, [id]);

  const loadTasks = () => {
    const loadedTasks: Task[] = loadFromLocalStorage('tasks', []);
    const projectTasks = loadedTasks.filter(task => task.serviceId === id);
    setTasks(projectTasks);
  };

  const handleAddTask = () => {
    loadTasks(); // Reload tasks after adding
  };

  const resetFilters = () => {
    setStatusFilter('');
    setDueDateFilter('');
    setAssigneeFilter('');
    loadTasks(); // Reload all tasks
  };

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && task.status !== statusFilter) return false;
    if (dueDateFilter && task.dueDate !== dueDateFilter) return false;
    if (assigneeFilter && task.assignee !== assigneeFilter) return false;
    return true;
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TaskModal
        title="Create a New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        projectId={id}
        members={teamMembers}
        onTaskAdded={handleAddTask}
      />
      <div className="container mx-auto ">
        <div className="max-w-4xl mx-auto">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ActionBar title={title} />
            <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg h-10 px-6 py-3 border-none cursor-pointer" onClick={showModal}>
              <FaPlus /> Add Task
            </button>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>

          <FilterSection
            statusFilter={statusFilter}
            dueDateFilter={dueDateFilter}
            assigneeFilter={assigneeFilter}
            assignees={teamMembers}
            setSearchQuery={setSearchQuery}
            setStatusFilter={setStatusFilter}
            setDueDateFilter={setDueDateFilter}
            setAssigneeFilter={setAssigneeFilter}
            onResetFilters={resetFilters} // Pass the reset function to the FilterSection
          />

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TaskList filteredTasks={filteredTasks} onTaskAdded={handleAddTask} />
          <TaskManagement tasks={filteredTasks} onTaskAdded={handleAddTask} />

          <TeamMember teamMembers={teamMembers} />
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
