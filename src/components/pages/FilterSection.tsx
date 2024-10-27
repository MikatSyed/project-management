import React from 'react';
import { MdRefresh } from 'react-icons/md';

const FilterSection = ({
    statusFilter,
    dueDateFilter,
    assigneeFilter,
    assignees,
    setSearchQuery,
    setStatusFilter,
    setDueDateFilter,
    setAssigneeFilter,
    onResetFilters // Added the onResetFilters prop
}: any) => {
    return (
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg shadow-lg p-8 mb-8">
           <div className='flex justify-between' >
           <div><h2 className="text-lg font-semibold mb-5 text-white">Filters</h2></div>
           <div >
           <button
                    className="flex items-center justify-center bg-white border-none text-teal-500 font-semibold py-2 px-4 rounded-md shadow cursor-pointer "
                    onClick={onResetFilters} 
                >
                    <MdRefresh size={20} className="mr-2" />
                    
                </button>
            </div>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Status filter */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-white mb-2">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="block w-full h-12 py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out"
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
                    <label htmlFor="dueDate" className="block text-sm font-medium text-white mb-2">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className="block w-full h-12 py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                        value={dueDateFilter}
                        onChange={(e) => setDueDateFilter(e.target.value)}
                    />
                </div>

                {/* Assignee filter */}
                <div>
                    <label htmlFor="assignee" className="block text-sm font-medium text-white mb-2">Assignee</label>
                    <select
                        id="assignee"
                        name="assignee"
                        className="block w-full h-12 py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                        value={assigneeFilter}
                        onChange={(e) => setAssigneeFilter(e.target.value)}
                    >
                        <option value="">All Assignees</option>
                        {assignees?.map((assignee: any) => (
                            <option key={assignee} value={assignee}>{assignee}</option>
                        ))}
                    </select>
                </div>
            </div>
        
          
        </div>
    );
};

export default FilterSection;
