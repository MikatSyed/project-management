import React, { useState } from 'react';
import { Modal, Button, Col } from 'antd';
import { MdOutlineAddTask } from 'react-icons/md';
import FormTextArea from '../Forms/FormTextArea';
import FormInput from '../Forms/FormInput';
import Form from '../Forms/Form';
import FormDatePicker from '../Forms/FormDatePicker';
import { useTaskStore } from '@/stores/taskStore';
import { useStore } from 'zustand';


const TaskModal: React.FC<{
  title: string;
  visible: boolean;
  onCancel: () => void;
  projectId: string;
}> = ({ title, visible, onCancel, projectId }) => {
  const id = projectId;
  console.log(id,'19');

  const addTask = useTaskStore((state) => state.addTask); // Access the addTask function from the store
  const tasks = useStore(useTaskStore); 
  console.log(tasks,'30');

  const onSubmit = async (values: any) => {
    const newTask = { ...values, status: 'To Do',serviceId:{id},isCompleted:false };

    try {
      addTask(newTask); // Add the new task to the store
      onCancel();
    } catch (err: any) {
      console.error('Error adding task:', err.message);
    }
  };

  const handleOk = () => {
   
  };


  return (
    <Modal
      title={
        <div className='flex items-center'>
          <MdOutlineAddTask style={{ marginRight: 8, color: 'blue' }} size={22} />
          {title}
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      onOk={handleOk}
    >
      <Form submitHandler={onSubmit}>
        <Col md={24} sm={15} xs={20} className="my-2">
          <FormInput name="title" label="Title" className="w-full" />
        </Col>

        <Col md={24} sm={15} xs={20} className="my-2">
          <FormTextArea name="description" label="Description" rows={4} className="w-full" />
        </Col>

        <Col md={24} sm={15} xs={20} className="my-2">
          <FormInput name="assignee" label="Assignee" className="w-full" />
        </Col>

        <Col md={24} sm={15} xs={20} className="my-2">
          <FormDatePicker name="dueDate" label="Due Date" className="w-full" />
        </Col>

        <Button htmlType="submit" type="primary" className="mt-4">
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};

export default TaskModal;