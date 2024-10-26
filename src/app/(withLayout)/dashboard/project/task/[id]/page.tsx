"use client"
import React, { useEffect, useState } from 'react';
import { Modal, Button, Col, message } from 'antd';
import { MdOutlineAddTask } from 'react-icons/md';
import { useTaskStore } from '@/stores/taskStore';
import { useStore } from 'zustand';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormTextArea from '@/components/Forms/FormTextArea';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import { useRouter } from 'next/navigation';



type IDProps = {
    params: any;
  };


const TaskEdit = ({params}:IDProps) => {
    const router = useRouter();
    const {id} = params;
    let taskId = parseInt(id)
  
    const [members, setMembers] = useState<string[]>([]);
    const [assignee, setAssignee] = useState<string>('');
    const [status, setStatus] = useState<string>('')
    // Filter tasks based on projectId
    const allTasks = useTaskStore((state) => state.tasks); 
    const task:any = allTasks.filter((task) => task?.id === taskId);
   
    useEffect(() => {
      // Fetch members from API
      const fetchMembers = async () => {
        try {
          // Replace 'fetchMembersURL' with the actual URL to fetch members from your API
          const response = await fetch(`https://api.mockfly.dev/mocks/123e6501-9342-4dcc-8c28-2ee94e3b7dd2/api/v1/projects/${task[0]?.serviceId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch members');
          }
          const data = await response.json();
          console.log(data,'40');
          setMembers(data.teamMembers);
        } catch (error) {
          console.error('Error fetching members:', error);
        }
      };
  
      fetchMembers();
    }, []);
 
    const onSubmit = async (values: any) => {
     console.log(values.member,'54');
   
     if (values.member === undefined ) {
        // Assign a default value to values.member
        values.member = task[0]?.member;
      } else {
        values.member = assignee;
      }
    
      values.status = "";
      console.log(values,'56');
    
        try {
         useTaskStore.getState().updateTask(taskId, values);
         message.success("Task Updated Successfully")
         setTimeout(() => {
            router.back();
        }, 3000);
       
        } catch (err: any) {
          console.error('Error adding task:', err.message);
        }
      };

      const defaultValues = {
        title: task[0]?.title || '',
        description: task[0]?.description || '',
        dueDate: task[0]?.dueDate || '',
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
          <label htmlFor="assignee" className="block text-sm font-medium ">Assignee</label>
          <select
            id="assignee"
            name="assignee"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setAssignee(e.target.value)}
          >
            
            {members?.map((member: string) => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </Col>

  

        <Col md={12} sm={15} xs={20} className="my-2">
          <FormDatePicker name="dueDate" label="Due Date" className="w-full" />
        </Col>

        <Button htmlType="submit" type="primary" className="mt-4">
          Update Task
        </Button>
      </Form>
     
        </div>
    );
};

export default TaskEdit;