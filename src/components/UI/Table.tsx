"use client"
import { Table } from 'antd';

type UMTableProps = {
    loading?: boolean;
    columns: any;
    dataSource: any;
    pageSize?: number;
    totalPages?: number;
    showSizeChanger?: boolean;
    onPaginationChange?: (page: number, pageSize: number) => void;
    onTableChange?: (pagination: any, filter: any, sorter: any) => void;
    showPagination?: boolean;
    scroll?: boolean; 
  };

const UMTable = ({ loading = false,
    columns,
    dataSource,  
    pageSize,
    totalPages,
    onPaginationChange,
    onTableChange,
    showPagination = true,
    showSizeChanger = true,
    scroll = false
  }:UMTableProps) => {

    const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;
    return (
       <>
        <Table
          dataSource={dataSource}
           columns={columns}
           loading={loading}
            pagination={paginationConfig}
            onChange={onTableChange}
            scroll={scroll ? { x: 'max-content' } : undefined}
            />
       </>
    );
};

export default UMTable;