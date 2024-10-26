import React from 'react';
import { MdOutlineLegendToggle } from "react-icons/md";
import { Avatar, Button, Dropdown, Menu } from 'antd';

const HeaderPage = ({ collapsed, onToggleSidebar }: any) => {
  const logout = () => {
    // Implement logout functionality here
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center">
      <div className="h-12 w-12 text-[#008080] flex justify-center items-center rounded-full  transition-colors duration-300 cursor-pointer" onClick={onToggleSidebar}>
        <MdOutlineLegendToggle size={30} />
      </div>
      <div className="flex items-center">
        
      <button 
  onClick={logout} 
  className="py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg border-none "
>
  Logout
</button>

      </div>
    </header>
  );
};

export default HeaderPage;
