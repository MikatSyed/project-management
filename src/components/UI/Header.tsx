import React from 'react';
import { MdOutlineLegendToggle } from "react-icons/md";

import { Avatar, Button, Dropdown, MenuProps } from 'antd';
const HeaderPage = ({ collapsed, onToggleSidebar }: { collapsed: boolean; onToggleSidebar: () => void }) => {

  
  const logout = () => {
   
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  

  return (
    <header style={{ backgroundColor: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ height: '40px', width: '40px', backgroundColor: '#27ae60', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {collapsed ? (
         
           <MdOutlineLegendToggle onClick={onToggleSidebar} style={{ cursor: 'pointer', color: '#fff' }} size={30} />
         
        ) : (
          <MdOutlineLegendToggle onClick={onToggleSidebar} style={{ cursor: 'pointer', color: '#fff' }} size={30} />
        )}
    </div>
      <div>
      
        <p> <span style={{padding:'0px 5px'}}>Mikat</span> </p>

        {/* <Dropdown menu={{ items }} placement="topRight" arrow={{ pointAtCenter: true }}>
      <Button>topRight</Button>
    </Dropdown> */}
      </div>
    </header>
  );
};

export default HeaderPage;
