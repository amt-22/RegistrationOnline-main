import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import {
  EditTwoTone,
  PlusOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
const MSO = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const columns = [
    {
      title: "SI. No.",
      dataIndex: "sno",
      key: "sno",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Subject Type",
      dataIndex: "subjectType",
      key: "subjectType",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "red" : "green";
            if (tag === "Active") {
              color = "green";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Space size="middle">
          <EditTwoTone twoToneColor="#5a73a3" />
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Space size="middle">
          <DeleteTwoTone twoToneColor="red" />
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      sno: "1",
      className: 32,
      streamType: "New York No. 1 Lake Park",
      tags: ["Active", "Disable"],
    },
    {
      key: "2",
      sno: "2",
      className: 42,
      streamType: "London No. 1 Lake Park",
      tags: ["Active"],
    },
    {
      key: "3",
      sno: "3",
      className: 32,
      streamType: "Sydney No. 1 Lake Park",
      tags: ["Disable"],
    },
  ];
  return (
    <div>
      <div className="border p-[10px]">
        <p className="font-bold text-[15px]">Manage Subject Option</p>
      </div>
      <div className="border p-[10px] px-[40px] flex justify-between">
        <p className="font-bold text-[15px]">Class</p>
        <Select
          defaultValue="XI"
          style={{
            width: "30rem",
          }}
          onChange={handleChange}
          options={[
            {
              value: "X",
              label: "X",
            },
            {
              value: "XI",
              label: "XI",
            },
            {
              value: "XII",
              label: "XII",
            },
          ]}
        />
        <Button
          onClick={showLoading}
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
        >
          New Subject Option
        </Button>
        <Modal
          style={{
            height: "800px", // increase the height to 600px
            overflowY: "auto", // add this to enable scrolling
          }}
          title={<p>New Subject Option</p>}
          footer={
            <>
              <Button type="primary" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button type="primary">Submit</Button>
            </>
          }
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <Form
            name="layout-multiple-horizontal"
            layout="horizontal"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Form.Item
              layout="vertical"
              label="Subject Option"
              name="Subject Option"
              style={{ marginBottom: "50px" }}
              rules={[
                {
                  required: true,
                },
              ]}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout="vertical"
              name="status"
              label="Status"
              style={{ marginBottom: "50px" }}
              rules={[
                {
                  required: true,
                  message: "Please select Option!",
                },
              ]}
            >
              <Select placeholder="--Select Status--">
                <Option value="female">Active</Option>
                <Option value="other">Inactive</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="border-b-rgb(217 216 213) border-b border-solid m-[1rem] text-[15px] font-semibold">
        Subject Option LIST
      </div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default MSO;
