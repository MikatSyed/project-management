"use client"
import React, { useState } from 'react';
import { Layout } from 'antd';
import SideBar from '@/components/UI/Sidebar';
import ContentPage from '@/components/UI/Contents';


const { Header } = Layout;

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar collapsed={collapsed} onCollapse={toggleSidebar} /> 
      <ContentPage collapsed={collapsed} onToggleSidebar={toggleSidebar}>{children}</ContentPage>
    </Layout>
  );
};

export default LayoutPage;
