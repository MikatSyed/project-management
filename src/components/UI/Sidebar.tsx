import React from 'react';
import { Layout, Menu } from 'antd';
import { sidebarItems } from '@/app/constants/sidebarItems';
import { FaTasks } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

const SideBar = ({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) => {
  const router = useRouter();

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      collapsedWidth={80}
      width={260}
      className="sticky top-0 bottom-0 bg-gradient-to-r from-teal-600 to-teal-500 text-white h-screen overflow-hidden" // Set height to full screen and hide overflow
    >
      <div className="py-5 px-7 flex items-center">
        <a href="/" className="flex items-center text-white">
          <FaTasks className="text-xl" />
          {!collapsed && <h3 className="text-xl ml-3 font-semibold">TaskTrack</h3>}
        </a>
      </div>

      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        items={sidebarItems()}
        className="text-sm text-black bg-transparent border-0"
      />

      {/* Uncomment and modify this logout button as needed */}
      {/* 
      <div 
        className={`flex items-center justify-center cursor-pointer ${collapsed ? 'fixed bottom-5 left-1/2 transform -translate-x-1/2' : 'p-8 mt-auto'}`} 
        onClick={logout}
      >
        <p className="text-white text-lg flex items-center">
          <CgLogOut className="mr-2" />
          {!collapsed && 'Logout'}
        </p>
      </div> 
      */}
    </Sider>
  );
};

export default SideBar;
