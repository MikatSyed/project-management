import React from 'react';
import { Layout } from 'antd';
import Header from './Header';

const { Content: AntContent } = Layout;

const ContentPage = ({ collapsed, onToggleSidebar, children }: { collapsed: boolean; onToggleSidebar: () => void; children: React.ReactNode }) => {
  return (
    <Layout>
      <Header collapsed={collapsed} onToggleSidebar={onToggleSidebar} />
      <AntContent style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
        {children}
      </AntContent>
    </Layout>
  );
};

export default ContentPage;
