"use client";
import { useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { ReloadOutlined } from "@ant-design/icons";
import UMTable from "@/components/UI/Table"; 
import ActionBar from "@/components/UI/ActionBar"; 
import { BsEyeFill } from "react-icons/bs";
import { useTaskStore } from "@/stores/taskStore";
import { useRouter } from "next/navigation";
import { projectData, projectPhases } from "@/utils/data";



const ProjectPage = () => {
  const {push} = useRouter();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);

 
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      render: (data: any) => (
        <Button
          onClick={() => handleAddProjectPhases(data.id)}
          className="bg-[#008080] hover:bg-[#007474] text-white"
          style={{ margin: "0px 5px" }}
        >
          <BsEyeFill />
        </Button>
      ),
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
  };

  // Handler for adding project phases when clicking the eye icon
  const handleAddProjectPhases = async (projectId: string) => {
    const isFirstVisit = !localStorage.getItem(`projectPhasesAdded_${projectId}`);

    if (isFirstVisit && projectId) {
      // Use projectId to define the desired serviceId
      const desiredServiceId = projectId; // This assumes projectId directly corresponds to serviceId
    
      for (const phase of projectPhases) {
        // Check if the phase's serviceId matches the desiredServiceId and if a task already exists
        const taskExists = tasks.some((task: any) => task.id === phase.id);
        if (!taskExists && phase.serviceId === desiredServiceId) {
          await addTask(phase as any); // Add the phase as a task if it does not already exist
        }
      }
    
      // Mark that the project phases were added for this projectId
      localStorage.setItem(`projectPhasesAdded_${projectId}`, "true"); 
      // Redirect to the project view
      push(`/dashboard/project/view/${projectId}`);
    } else {
      // Redirect to the project view if not the first visit or projectId is not set
      push(`/dashboard/project/view/${projectId}`);
    }
    
   
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <ActionBar title="Project List" />
        <div>
          {(!!sortBy || !!sortOrder) && (
            <Button className="bg-[#008080] hover:bg-[#007474] text-white" style={{ margin: "0px 5px" }} onClick={resetFilters}>
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </div>

      <UMTable
        dataSource={projectData?.projects}
        columns={columns}
        onTableChange={onTableChange}
        onPaginationChange={onPaginationChange}
        pageSize={size}
        totalPages={projectData?.projects.length}
        showSizeChanger={true}
        showPagination={true}
        scroll={true}
      />
    </div>
  );
};

export default ProjectPage;
