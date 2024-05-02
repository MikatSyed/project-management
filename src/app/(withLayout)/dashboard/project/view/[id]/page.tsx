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

        {/* Add Task Form */}


        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status filter */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-white">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    {/* Due Date filter */}
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-white">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={dueDateFilter}
                            onChange={(e) => setDueDateFilter(e.target.value)}
                        />
                    </div>

                    {/* Assignee filter */}
                    <div>
                        <label htmlFor="assignee" className="block text-sm font-medium text-white">Assignee</label>
                        <input
                            type="text"
                            id="assignee"
                            name="assignee"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={assigneeFilter}
                            onChange={(e) => setAssigneeFilter(e.target.value)}
                        />
                    </div>
                </div>
            </div>
   

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
        <div className="">
      <div className=" mx-auto">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <div className="">
          {filteredTasks.map((task: any) => (
            <div
              key={task._id}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-6 relative mb-3"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                <div className="flex items-center">
                {task.isCompleted ? (
  <FaBookmark 
    size={24}
    className="text-gray-500 cursor-pointer"
    onClick={() => toggleCompletion(task.id)}
  />
) : (
  <BiBookmark
    size={24}
    className="text-gray-500 cursor-pointer"
    onClick={() => toggleCompletion(task.id)}
  />
)}
                </div>
              </div>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <div className="flex items-center">
  <div>
    <p><FiUser className="mr-1" /> Member:</p>
  </div>
  <div className="flex flex-wrap ml-2"> {/* Add margin-left for spacing */}
    
      <div  className="flex items-center mr-2 mb-2">
        <p className="text-gray-500 text-sm pt-2">
      {task?.assignee}
        </p>
      </div>
    
  </div>
</div>    
              <div className="flex justify-between">
           
             <div className="flex items-center py-4">
                <FiClock className="mr-1" />
                <p className="text-gray-500 text-sm">Due Date : {task.dueDate}</p>
              </div>
             <div>   
                <Link href={`/dashboard/project/task/${task.id}`}>
                  <button className="rounded-md bg-[#1e3d9c] text-white px-4 py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3 border-none"><BiEditAlt/></button>
                </Link>
                <button className="rounded-md bg-red-500 text-white px-4 py-2 font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border-none"><MdDelete/></button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

        {/* Team Members */}
        <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Team Members</h2>
  <div className="grid grid-cols-2 gap-4">
    {teamMembers.map((member: any) => (
      <div key={member} className="bg-white rounded-lg shadow-md p-4 flex items-center">
        <div className="rounded-full overflow-hidden mr-4 bg-gray-200 w-12 h-12 flex justify-center items-center">
          <span className="text-gray-600 text-lg">{member[0]}</span>
        </div>
        <p className="text-gray-800 font-medium">{member}</p>
      </div>
    ))}
  </div>
</div>

<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
  <ul>
    {recentActivities.map((activity: any) => (
      <li key={activity.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
        <p className="text-gray-800 font-medium">{activity.description}</p>
        <p className="text-gray-500 text-sm">{activity.timestamp}</p>
      </li>
    ))}
  </ul>
</div>
      </div>
    </div>


    </>
   
  );
};

export default ProjectDetailsPage;
