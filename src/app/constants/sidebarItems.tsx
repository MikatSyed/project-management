import { MenuProps } from "antd"
import Link from "next/link";
import { USER_ROLE } from "./role";
import { FaUserFriends,FaUserCircle ,FaFileAlt,FaMoneyCheck,FaClone    } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { AiFillCalendar,AiFillAppstore,AiFillSchedule   } from "react-icons/ai";
import { MdCategory,MdAdminPanelSettings  } from "react-icons/md";
import React from "react";


export const sidebarItems = ()=>{
  const setIconSize = (icon: React.ReactNode, size: string) =>
  React.cloneElement(icon as React.ReactElement, { style: { fontSize: size } });


    
      const adminSidebarItems: MenuProps["items"] = [
     
        {
          label: <Link href={`/dashboard`}>Dashboard</Link>,
          icon: setIconSize(<AiFillAppstore />, "1.2rem"),
          key: `dashboard`,
        },
        {
          label: <Link href={`/profile`}>Profile</Link>,
          icon: setIconSize(<FaUserCircle />, "1.2rem"),
          key: `/profile`,
        },
       
        {
          label: <Link href={`/dashboard/project`}> Project</Link>,
          icon: setIconSize(<FaMoneyCheck />,"1.2rem"),
          key: `/project`,
        },
        {
          label: <Link href={`/schedule`}> Schedule </Link>,
          icon: setIconSize(<AiFillSchedule />,"1.2rem"),
          key: `/schedule`,
        },
        {
          label: <Link href={`/category`}> Category</Link>,
          icon: setIconSize(<MdCategory />,"1.2rem"),
          key: `/category`,
        },
       
      ];
    
    
     
    
  return adminSidebarItems;


}