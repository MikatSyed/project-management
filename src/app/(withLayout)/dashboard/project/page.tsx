"use client"
import { useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import UMTable from "@/components/UI/Table";
import ActionBar from "@/components/UI/ActionBar";

const fetchData = async () => {
  const response = await fetch('http://localhost:8000/projects/');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

const ManageDepartmentPage = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState<string>("");

  const { isLoading, isError, data, error }:any = useQuery('projects', fetchData);
  console.log(data,'30');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const meta = data.length || 10;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const deleteHandler = async (id: string) => {
    try {
      showModal();
      setId(id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleOk = async () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (data: any) => {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: (data: any) => {
        return (
          <>
            <Link href={`/admin/category/edit/${data?.id}`}>
              <Button style={{ margin: "0px 5px" }} type="primary">
                <EditOutlined />
              </Button>
            </Link>
            <Button type="primary" danger onClick={() => deleteHandler(data?.id)}>
              <DeleteOutlined />
            </Button>
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <ActionBar title="Project List"/>
        </div>
        <div> 
          <Link href="/admin/category/create">
          <button className="btn bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-2">
          <FaPlus/> Add Project
        </button>
          </Link>
          {(!!sortBy || !!sortOrder) && (
            <Button style={{ margin: "0px 5px" }} type="primary" onClick={resetFilters}>
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </div>

      <UMTable
        dataSource={data}
        columns={columns}
        loading={isLoading}
        onTableChange={onTableChange}
        onPaginationChange={onPaginationChange}
        pageSize={size}
        totalPages={meta}
        showSizeChanger={true}
        showPagination={true}
        scroll={true}
      />
    </div>
  );
};

export default ManageDepartmentPage;
