"use client"
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FaBookmark, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
 import { CiBookmark } from "react-icons/ci";
import { FiClock, FiUser } from 'react-icons/fi';
import { BiBookmark, BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import ActionBar from '@/components/UI/ActionBar';
import { message } from 'antd';
import TaskModal from '@/components/UI/TaskModal';
import { useTaskStore } from '@/stores/taskStore';
import { BsFillBookmarkFill } from 'react-icons/bs';
import FilterSection from '@/components/pages/FilterSection';
import RecentActivities from '@/components/pages/RecentActivities';
import TeamMember from '@/components/pages/TeamMember';
import TaskList from '@/components/pages/TaskList';

 type IDProps = {
    params: any;
  };


const fetchProjectDetails = async (id:string) => {
    
  const response = await fetch(`http://localhost:8000/projects/${id}`);
  console.log(response,'15');
  if (!response.ok) {
    throw new Error('Failed to fetch project details');
  }
  return response.json();
};

const ProjectDetailsPage = ({params}:IDProps) => {
    const {id} = params;
    const [statusFilter, setStatusFilter] = useState('');
    const [dueDateFilter, setDueDateFilter] = useState('');
    const [assigneeFilter, setAssigneeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, isError, data, error }:any = useQuery(['project', id], () => fetchProjectDetails(id))
  const allTasks = useTaskStore((state) => state.tasks); 


  // Filter tasks based on projectId
  const tasks = allTasks.filter((task) => task.serviceId?.id === id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center">Error: {error.message}</div>;
  }
  

  const filteredTasks = tasks.filter((task:any) => {

    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Filter by status
    if (statusFilter && task.status !== statusFilter) return false;

    // Filter by due date
    if (dueDateFilter && task.dueDate !== dueDateFilter) return false;

    // Filter by assignee
    if (assigneeFilter && task.assignee !== assigneeFilter) return false;

    return true;
});

  const toggleCompletion = (taskId: number) => {
    console.log(taskId,'53');
    useTaskStore.getState().toggleIsComplete(taskId);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const deleteHandler = async (id: string) => {
    
    try {
      showModal()
    //   setId(id)
     
    
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  
  const handleOk = async () => {
   
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const { title, description, teamMembers, recentActivities,id:projectId } = data;
  
  


  return (
    <>
      <TaskModal
        title="Add New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        projectId={projectId}
      />
     <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* <h1 className="text-3xl font-semibold mb-4">{title}</h1> */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <ActionBar title={title}/>
        </div>
        <div> 
        
          <button className="btn bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-3 border-none"  onClick={() => deleteHandler(projectId)}>
          <FaPlus/> Add Task
        </button>
          
        
        </div>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

{/* Tasks */}
<TaskList filteredTasks={filteredTasks}/>
{/* Team Members */}
<TeamMember teamMembers={teamMembers}/>

<RecentActivities  recentActivities={recentActivities}/>
      </div>
    </div>


    </>
   
  );
};

export default ProjectDetailsPage;
