import { useTaskStore } from '@/stores/taskStore';
import Link from 'next/link';
import React from 'react';
import { BiBookmark, BiEditAlt } from 'react-icons/bi';
import { FaBookmark } from 'react-icons/fa';
import { FiClock, FiUser } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const TaskList = ({filteredTasks}:any) => {
    const toggleCompletion = (taskId: number) => {
        console.log(taskId,'53');
        useTaskStore.getState().toggleIsComplete(taskId);
      };
    return (
        <div>
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
        </div>
    );
};

export default TaskList;