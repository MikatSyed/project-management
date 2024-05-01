import React, { useState } from 'react';

const TaskForm = ({ projectId }:any) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignee: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., sending data to backend
    console.log(formData);
    // Reset form data
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      assignee: '',
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700 font-semibold mb-2">Due Date</label>
          <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="assignee" className="block text-gray-700 font-semibold mb-2">Assignee</label>
          <input type="text" id="assignee" name="assignee" value={formData.assignee} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
