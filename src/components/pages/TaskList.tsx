import { useTaskStore } from '@/stores/taskStore';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiBookmark, BiEditAlt } from 'react-icons/bi';
import { FaBookmark } from 'react-icons/fa';
import { FiClock, FiUser } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const TaskList = ({ filteredTasks, onTaskAdded }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 2; // Set the number of tasks per page

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const toggleCompletion = (taskId: number) => {
        useTaskStore.getState().toggleIsComplete(taskId);
        onTaskAdded();
    };

    const deleteTask = (taskId: number) => {
        useTaskStore.getState().deleteTask(taskId);
        onTaskAdded();
    };

    // Paginated tasks based on the current page
    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    return (
        <div className="">
        {filteredTasks.length > 0  && <h2 className="text-3xl font-bold mb-8 text-gray-800">Tasks</h2>}

            {filteredTasks.length === 0 ? (
                <div className="text-center text-gray-600 py-10">
                    <p className="text-lg">No tasks available. Please add a task.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-10">
                    {paginatedTasks.map((task: any) => (
                        <div
                            key={task._id}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 relative transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300 ease-in-out"
                        >
                            {/* Task Title and Completion Toggle */}
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex">
                                    <h3 className="text-2xl font-bold text-gray-800">{task.title}</h3>
                                    <div
                                        className={`ml-4 mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                                            task.status === 'To Do'
                                                ? 'bg-blue-500 text-white'
                                                : task.status === 'In Progress'
                                                ? 'bg-yellow-500 text-white'
                                                : task.status === 'Done'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-300 text-gray-700'
                                        }`}
                                    >
                                        {task.status}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {task.isCompleted ? (
                                        <FaBookmark
                                            size={28}
                                            className="text-teal-600 cursor-pointer hover:text-teal-400"
                                            onClick={() => toggleCompletion(task.id)}
                                        />
                                    ) : (
                                        <BiBookmark
                                            size={28}
                                            className="text-teal-600 cursor-pointer hover:text-teal-400"
                                            onClick={() => toggleCompletion(task.id)}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Task Description */}
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{task.description}</p>

                            {/* Member and Due Date Information */}
                            <div className="flex items-center mb-3">
                                <FiUser className="mr-2 text-gray-500" />
                                <p className="text-lg text-gray-700 font-semibold">
                                    Assign To: <span className="text-gray-600 font-normal">{task?.member}</span>
                                </p>
                            </div>
                            <div className="flex items-center text-gray-600 mb-6">
                                <FiClock className="mr-2 text-gray-500" />
                                <p className="text-lg text-gray-700 font-semibold">
                                    Due Date: <span className="text-gray-600 font-normal">
                                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end mt-5 space-x-3">
                                <Link href={`/dashboard/project/task/${task.id}`}>
                                    <button className="flex items-center justify-center rounded-lg bg-teal-600 text-white px-4 py-3 font-semibold border-none hover:bg-teal-500">
                                        <BiEditAlt className="mr-1" />
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className="flex items-center justify-center rounded-lg bg-red-600 text-white px-4 py-3 font-semibold border-none hover:bg-red-500"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    <MdDelete className="mr-1" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {filteredTasks.length > 0 && (
                <div className="flex justify-center my-8 space-x-2">
                    <button
                        className={`px-4 py-3 font-semibold rounded-lg border-none ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-500'}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-3 font-semibold rounded-lg border-none ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-teal-500 hover:text-white'}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className={`px-4 py-3 font-semibold rounded-lg border-none ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-500'}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
