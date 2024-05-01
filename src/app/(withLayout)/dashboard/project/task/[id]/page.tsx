"use client"
import React, { useState } from 'react';
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
    const [messageApi, contextHolder] = message.useMessage();
    const {id} = params;
    let taskId = parseInt(id)
  
    const allTasks = useTaskStore((state) => state.tasks); 
   
    // Filter tasks based on projectId
    const task:any = allTasks.filter((task) => task?.id === taskId);
  
 
    const onSubmit = async (values: any) => {
        
    
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
        assignee: task[0]?.assignee || '',
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
          <FormInput name="assignee" label="Assignee" className="w-full" />
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