import React from 'react';

const FilterSection = ({
    statusFilter,
    dueDateFilter,
    assigneeFilter,
    assignees,
    setSearchQuery,
    setStatusFilter,
    setDueDateFilter,
    setAssigneeFilter
}: any) => {
    return (
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
                    <select
                        id="assignee"
                        name="assignee"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
