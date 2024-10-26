"use client";
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query'; // This will be removed as we won't be fetching data
import { FaPlus } from 'react-icons/fa';
import ActionBar from '@/components/UI/ActionBar';
import TaskModal from '@/components/UI/TaskModal';
import { message } from 'antd';
import FilterSection from '@/components/pages/FilterSection';
import RecentActivities from '@/components/pages/RecentActivities';
import TeamMember from '@/components/pages/TeamMember';
import TaskList from '@/components/pages/TaskList';
import TaskManagement from '@/components/pages/TaskManagement';
import { loadFromLocalStorage } from '@/stores/taskStore';

// Static project data
const projectData = {
  "projects": [
    {
      "id": "1",
      "title": "E-commerce Website Redesign",
      "description": "Revamp the user interface and functionality of the e-commerce website to enhance user experience and increase conversions.",
      "tasks": [
        {
          "id": 101,
          "title": "UI Design Mockups",
          "description": "Create high-fidelity UI design mockups for the homepage, product pages, and checkout process.",
          "status": "In Progress",
          "dueDate": "2024-05-10",
          "assignee": "Sarah Adams"
        },
        {
          "id": 102,
          "title": "Backend Integration",
          "description": "Integrate backend APIs to handle user authentication, product inventory, and order management.",
          "status": "Pending",
          "dueDate": "2024-05-15",
          "assignee": "John Smith"
        }
      ],
      "teamMembers": [
        "Sarah Adams",
        "John Smith",
        "Emily White"
      ],
      "recentActivities": [
        {
          "id": 201,
          "description": "Project kick-off meeting held",
          "timestamp": "2024-04-25T09:00:00"
        },
        {
          "id": 202,
          "description": "Task 101 started",
          "timestamp": "2024-04-26T10:30:00"
        }
      ]
    },
    // Additional projects can be added here...
  ]
};
const demoMembers = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

type IDProps = {
  params: { id: string };
};

const ProjectDetailsPage = ({ params }: IDProps) => {
  const { id } = params; // Extract project ID from params
  const [statusFilter, setStatusFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]); 
  // Find the current project using the static data
  const currentProject = projectData.projects.find(project => project.id === id);
  
  // Handle case when the project is not found
  if (!currentProject) {
    return <div className="text-center">Project not found</div>;
  }

  const { title, description, teamMembers, recentActivities } = currentProject;

  useEffect(() => {
    // Load tasks from local storage
    const loadedTasks = loadFromLocalStorage('tasks', []);
    // Filter tasks for the current project
    const projectTasks = loadedTasks.filter(task => task.serviceId === id);
    setTasks(projectTasks);
  }, [id]);

  const handleAddTask = () => {
    const loadedTasks = loadFromLocalStorage('tasks', []);
    const projectTasks = loadedTasks.filter(task => task.serviceId === id);
    setTasks(projectTasks);
  };

  // Filter tasks based on the provided filters and search query
  const filteredTasks = tasks.filter((task) => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Filter by status
    if (statusFilter && task.status !== statusFilter) return false;

    // Filter by due date
    if (dueDateFilter && task.dueDate !== dueDateFilter) return false;

    // Filter by assignee
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
        members={demoMembers}
        onTaskAdded={handleAddTask} 
      />
      <div className="container mx-auto ">
        <div className="max-w-4xl mx-auto">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ActionBar title={title} />
            <button className="btn bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg h-10 px-6 py-3 border-none cursor-pointer" onClick={showModal}>
              <FaPlus /> Add Task
            </button>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>

          <FilterSection
            statusFilter={statusFilter}
            dueDateFilter={dueDateFilter}
            assigneeFilter={assigneeFilter}
            assignees={teamMembers} // Pass the teamMembers data
            setSearchQuery={setSearchQuery}
            setStatusFilter={setStatusFilter}
            setDueDateFilter={setDueDateFilter}
            setAssigneeFilter={setAssigneeFilter}
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

          {/* Tasks */}
          <TaskList filteredTasks={filteredTasks}  onTaskAdded={handleAddTask} />
          <TaskManagement tasks={filteredTasks}  onTaskAdded={handleAddTask} />

          {/* Team Members */}
          <TeamMember teamMembers={teamMembers} />

          {/* Recent Activities */}
          <RecentActivities recentActivities={recentActivities} />
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
