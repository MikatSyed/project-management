import React, { useState } from 'react';
import { Modal, Col } from 'antd';
import { MdOutlineAddTask } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import FormTextArea from '../Forms/FormTextArea';
import FormInput from '../Forms/FormInput';
import Form from '../Forms/Form';
import FormDatePicker from '../Forms/FormDatePicker';
import { useTaskStore } from '@/stores/taskStore';

const TaskModal: React.FC<{
  title: string;
  visible: boolean;
  onCancel: () => void;
  projectId: string;
  members: string[]; // Accept members as props
  onTaskAdded: () => void; // Add onTaskAdded prop
}> = ({ title, visible, onCancel, projectId, members, onTaskAdded }) => {
  const [assignee, setAssignee] = useState<string>('');

  const addTask = useTaskStore((state) => state.addTask);

  const onSubmit = async (values: any) => {
    const newTask = {
      ...values,
      status: 'To Do',
      serviceId: projectId,
      isCompleted: false,
      member: assignee,
    };

    try {
      await addTask(newTask); // Assuming addTask is an async function
      onTaskAdded(); // Call the onTaskAdded function to refresh tasks
      onCancel(); // Close the modal after adding the task
    } catch (err: any) {
      console.error('Error adding task:', err.message);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center text-teal-600 font-semibold text-lg">
          <MdOutlineAddTask className="mr-2" size={22} />
          {title}
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closeIcon={<CgClose className="text-teal-600 cursor-pointer" size={20} />}
      bodyStyle={{ padding: '0', borderRadius: '0' }}
      className="rounded-lg shadow-lg max-w-lg mx-auto overflow-hidden"
    >
      <div className="p-6 bg-gray-50 rounded-lg">
        <Form submitHandler={onSubmit}>
          <Col md={24} sm={15} xs={20} className="">
            <FormInput name="title" label="Title" className="w-full" />
          </Col>

          <Col md={24} sm={15} xs={20} className="my-3">
            <FormTextArea
              name="description"
              label="Description"
              rows={4}
              className="w-full"
            />
          </Col>

          <Col md={24} sm={15} xs={20} className="my-3">
            <label
              htmlFor="assignee"
              className="block text-sm font-medium text-gray-600"
            >
              Assignee
            </label>
            <select
              id="assignee"
              name="assignee"
              className="mt-2 w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-700"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value="">All Assignees</option>
              {members.map((member: string) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </Col>

          <Col md={24} sm={15} xs={20} className="mt-3">
            <FormDatePicker name="dueDate" label="Due Date" className="w-full" />
          </Col>

          <button
            type="submit"
            className="mt-4 border-none py-3 px-6 rounded-md font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-300"
          >
            Add Task
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default TaskModal;
