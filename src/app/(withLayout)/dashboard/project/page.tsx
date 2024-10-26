"use client";
import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import UMTable from "@/components/UI/Table"; // Assuming this is your custom table component
import ActionBar from "@/components/UI/ActionBar"; // Your action bar component
import { BsEyeFill } from "react-icons/bs";
import { useTaskStore } from "@/stores/taskStore";

const ProjectPage = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { setProjects } = useTaskStore();
  const projects = useTaskStore((state) => state.projects);
  const { deleteProject }: any = useTaskStore();

  // Simulated JSON data
  const demoProjects:any = [
    {
      id: "1",
      title: "Project Alpha",
      description: "Description of Project Alpha",
      status: "In Progress",
      created_at: "2023-10-01T12:00:00Z",
      updated_at: "2023-10-15T12:00:00Z",
    },
    {
      id: "2",
      title: "Project Beta",
      description: "Description of Project Beta",
      status: "Completed",
      created_at: "2023-09-10T12:00:00Z",
      updated_at: "2023-09-20T12:00:00Z",
    },
    {
      id: "3",
      title: "Project Gamma",
      description: "Description of Project Gamma",
      status: "Pending",
      created_at: "2023-08-05T12:00:00Z",
      updated_at: "2023-08-10T12:00:00Z",
    },
  ];

  // Simulate fetching data (you could replace this with an API call)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjects(demoProjects); // Set the demo data to the store
      setLoading(false);
    }, 1000);
  }, [setProjects]);

  const deleteHandler = async (id: string) => {
    try {
      deleteProject(id);
      // Optionally add a toast notification for successful deletion
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      render: (data: any) => {
        return (
          <>
            <Link href={`project/view/${data?.id}`}>
              <Button className="bg-[#008080] hover:bg-[#007474] text-white" style={{ margin: "0px 5px" }}>
                <BsEyeFill />
              </Button>
            </Link>
          </>
        );
      },
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
    setSearchTerm("");
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
        dataSource={projects}
        columns={columns}
        loading={loading} // Use the loading state
        onTableChange={onTableChange}
        onPaginationChange={onPaginationChange}
        pageSize={size}
        totalPages={projects.length} // Set total number of projects (for demo, this is the length of the array)
        showSizeChanger={true}
        showPagination={true}
        scroll={true}
      />
    </div>
  );
};

export default ProjectPage;
