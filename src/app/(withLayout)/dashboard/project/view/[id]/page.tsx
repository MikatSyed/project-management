"use client"
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
 // Import the component for adding new tasks
 import { FaBookmark } from "react-icons/fa6";
 import { CiBookmark } from "react-icons/ci";
import { FiClock, FiDelete, FiUser } from 'react-icons/fi';
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import ActionBar from '@/components/UI/ActionBar';
import { message } from 'antd';
import TaskModal from '@/components/UI/TaskModal';
import { useTaskStore } from '@/stores/taskStore';
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
    console.log(typeof id);
  const { isLoading, isError, data, error }:any = useQuery(['project', id], () => fetchProjectDetails(id))
  const allTasks = useTaskStore((state) => state.tasks); 
  console.log(allTasks,'36');// Load all tasks from Zustand store

  // Filter tasks based on projectId
  const tasks = allTasks.filter((task) => task.serviceId?.id === id);
  console.log(tasks,'40');
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center">Error: {error.message}</div>;
  }

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
        
          <button className="btn bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-2"  onClick={() => deleteHandler(projectId)}>
          <FaPlus/> Add Task
        </button>
          
        
        </div>
      </div>
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Add Task Form */}
   


        {/* Tasks */}
        <div className="">
      <div className=" mx-auto">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <div className="">
          {tasks.map((task: any) => (
            <div
              key={task._id}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-6 relative mb-3"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                <div className="flex items-center">
               
                  {/* <p className="text-gray-500 text-sm">{task.dueDate}</p> */}
                  <CiBookmark size={24} className="text-gray-500" />
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
</div>     {/* <div className="absolute top-2 right-2">
                {task.isComplete ? (
                  <CiBookmark size={24} className="text-green-500" />
                ) : (
                  <CiBookmark size={24} className="text-gray-500" />
                )}
              </div> */}
              <div className="flex justify-between">
             {/* <div>   <p className="text-gray-500 text-sm"><FiClock  />  Due Date : {task.dueDate}</p></div> */}
             <div className="flex items-center py-4">
                <FiClock className="mr-1" />
                <p className="text-gray-500 text-sm">Due Date : {task.dueDate}</p>
              </div>
             <div>   
                <Link href={`/task/${task._id}`}>
                  <button className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-3 py-1 rounded-md mr-3"><BiEditAlt/></button>
                </Link>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md"><MdDelete/></button></div>
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
