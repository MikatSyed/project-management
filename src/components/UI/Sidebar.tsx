import React from 'react';
import { Layout, Menu } from 'antd';
import { sidebarItems } from '@/app/constants/sidebarItems';
import { FaHouseChimneyWindow } from 'react-icons/fa6';
import { CgLogOut } from "react-icons/cg";

const { Sider } = Layout;

const SideBar = ({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) => {
  
  const logout = () => {
    // Implement logout functionality here
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800">
      <Sider
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        collapsedWidth={80}
        width={260}
        style={{ position: 'sticky', top: 0, bottom: 0 }}
      >
        <div className="py-5  px-7 bg-gradient-to-r from-blue-900 to-blue-800">
          <a href="/">
            {collapsed ? 
              <h3 className="text-white text-xl"><FaHouseChimneyWindow/></h3> : 
              <h3 className="text-white text-xl"><FaHouseChimneyWindow/> Project Wave</h3>
            }
          </a>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          items={sidebarItems()}
          className='text-[15px] bg-gradient-to-r from-blue-900 to-blue-800'
          
        />
      </Sider>

      {collapsed ? 
        <div className=" p-8  cursor-pointer" onClick={logout}>
          <p className="text-white text-lg"><CgLogOut/></p>
        </div> 
        :
        <div className=" p-8 cursor-pointer " onClick={logout}>
          <p className="text-white text-[15px]">Logout</p>
        </div>
      }
    </div>
  );
};

export default SideBar;
