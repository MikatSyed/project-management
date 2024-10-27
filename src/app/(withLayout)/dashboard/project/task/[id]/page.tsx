"use client";
import React, { useEffect, useState } from 'react';
import { Col, message } from 'antd';
import { useTaskStore, loadFromLocalStorage } from '@/stores/taskStore'; 
import { useRouter } from 'next/navigation';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormTextArea from '@/components/Forms/FormTextArea';
import FormDatePicker from '@/components/Forms/FormDatePicker';


type Task = {
  id: number;
  title: string;
  description: string;
  member: string;
  dueDate: string;
  status: string;
  serviceId: string; 
};


type IDProps = {
  params: { id: string };
};


const defaultMembers: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

const TaskEdit: React.FC<IDProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const taskId = parseInt(id);

  
  const loadedTasks: Task[] = loadFromLocalStorage('tasks', []);
  const task: Task | undefined = loadedTasks.find((task) => task.id === taskId);


  const [assignee, setAssignee] = useState<string>(task?.member || '');
  const [members, setMembers] = useState<string[]>(defaultMembers); 
  useEffect(() => {
    if (task) {
      const serviceId = task.serviceId;

      
      const loadedProjects:any = loadFromLocalStorage('projects', []);
      const project = loadedProjects.find((proj:any) => proj.id === serviceId);
      const projectMembers: string[] = project?.teamMembers || []; 

      
      if (projectMembers.length > 0) {
        setMembers(projectMembers);
      } else {
        setMembers(defaultMembers); 
      }
    }
  }, [task]);

  const onSubmit = async (values: any) => {
    values.member = assignee || task?.member; 
    values.status = values.status || task?.status; 
    try {
      useTaskStore.getState().updateTask(taskId, values);
      message.success("Task Updated Successfully");
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (err: any) {
      console.error('Error updating task:', err.message);
      message.error('Failed to update task. Please try again.');
    }
  };

  const defaultValues = {
    title: task?.title || '',
    description: task?.description || '',
    member: task?.member || '',
    dueDate: task?.dueDate || '',
  };

  return (
    <div>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Col md={12} sm={15} xs={20} className="my-2">
          <FormInput name="title" label="Title" className="w-full" />
        </Col>

        <Col md={12} sm={15} xs={20} className="my-2">
          <FormTextArea name="description" label="Description" rows={4} className="w-full" />
        </Col>

        <Col md={12} sm={15} xs={20} className="my-2">
          <label htmlFor="assignee" className="block text-sm font-medium">Assignee</label>
          <select
            id="assignee"
            name="assignee"
            className="mt-2 w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-700"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Select Assignee</option>
            {members.map((member: string) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </Col>

        <Col md={12} sm={15} xs={20} className="my-2">
          <FormDatePicker name="dueDate" label="Due Date" className="w-full" />
        </Col>

        <button type="submit" className="mt-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg h-10 px-6 py-3 border-none cursor-pointer ">
          Update Task
        </button>
      </Form>
    </div>
  );
};

export default TaskEdit;
