import { Table } from "antd";
import React, { useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from "react";
import Loading from "../LoadingComponent/LoadingComponent";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },

    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
    setRowSelectedKeys([]);
  };
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };
  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: "#1ccc",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={handleDeleteAll}>
          Xóa tất cả
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}>
        <button
          onClick={exportExcel}
          style={{
            padding: "6px",
            borderRadius: "4px",
            border: "2px solid #ccc",
            background: "#ccc",
            margin: "12px 0",
          }}>
          Export Excel
        </button>
        <button
          type="primary"
          style={{
            padding: "6px",
            borderRadius: "4px",
            border: "2px solid #ccc",
            background: "#ccc",
            margin: "12px 0",
          }}>
          Reload
        </button>
      </div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
