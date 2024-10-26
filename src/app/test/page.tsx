
"use client"
import TaskManagement from '@/components/pages/TaskManagement';
import { Button } from 'antd';
import React from 'react';

const Test = () => {
    return (
        <div>
             <Button type="primary" danger>
      Primary
    </Button>
            <p className='text-red-900'>This is text</p>
            <TaskManagement/>
        </div>
    );
};

export default Test;