import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Row,
  Col,
  DatePicker,
  message, Upload, Checkbox,
} from "antd";
import React, { useState } from "react";
import { EditTwoTone, PlusOutlined, DeleteTwoTone,UploadOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const MAF = () => {
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
      width: 70,
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Class",
      width: 90,
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
      width: 300,
      align: "center",
    },
    {
      title: "From Date",
      dataIndex: "fromDate",
      key: "2",
      width: 120,
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "3",
      width: 120,
    },
    {
      title: "Form Charge",
      dataIndex: "formCharge",
      key: "4",
      width: 90,
    },
    {
      title: "Allow Same School",
      dataIndex: "allowSameSchool",
      key: "5",
      width: 100,
    },
    {
      title: "Same School Form Charge",
      dataIndex: "sameSchoolFormCharge",
      key: "6",
      width: 100,
    },
    {
      title: "Allow Student photo",
      dataIndex: "allowStudentPhoto",
      key: "7",
      width: 100,
    },
    {
      title: "Allow Mother Photo ",
      dataIndex: "allowMotherPhoto",
      key: "8",
      width: 100,
    },
    {
      title: "Thumbnail",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "red" : "green";
            if (tag === "Two") {
              color = "green";
            }
            if (tag === "Three") {
              color = "blue";
            }
            if (tag === "XI") {
              color = "orange";
            }
            if (tag === "XII") {
              color = "purple";
            }
            if (tag === "X") {
              color = "pink";
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
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <EditTwoTone twoToneColor="#5a73a3" />
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <DeleteTwoTone twoToneColor="red" />
        </Space>
      ),
    },
  ];
  const data = [];
  const tagsList = ["Two", "Three", "XI", "XII", "X"];

  for (let i = 1; i < 100; i++) {
    const randomTag = tagsList[Math.floor(Math.random() * tagsList.length)];
    data.push({
      key: i,
      sno: `${i}`,
      class: "XI",
      name: "Online Registration for Admission to Two",
      fromDate: "05-05-2024",
      toDate: "05-05-2024",
      formCharge: "2,000",
      allowSameSchool: "True",
      sameSchoolFormCharge: 1200,
      allowStudentPhoto: "False",
      allowMotherPhoto: "True",
      tags: [randomTag],
    });
  }
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [editorHtml, setEditorHtml] = useState('');

  const handleTextEditor = (html) => {
    setEditorHtml(html);
  };
  return (
    <div>
      <div className="border p-[10px]">
        <p className="font-bold text-[15px]">Manage Application Form</p>
      </div>
      <div className="border p-[10px] px-[40px] flex justify-between">
        <p className="font-bold text-[15px]">Select Session</p>
        <Select
          defaultValue="2023-2024"
          style={{
            width: "30rem",
          }}
          onChange={handleChange}
          options={[
            {
              value: "2022-2023",
              label: "2022-2023",
            },
            {
              value: "2023-2024",
              label: "2023-2024",
            },
          ]}
        />
        <Button
          onClick={showLoading}
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
        >
          New Application Form
        </Button>
        <Modal
          width={1000}
          // height={600}
          title={<p>New Application Form</p>}
          footer={
            <div className="flex justify-center items-center gap-2">
              <Button type="primary" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button type="primary">Submit</Button>
            </div>
          }
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <Form
            name="layout-multiple-horizontal"
            labelCol={{
              style: {
                fontWeight: 600,
              },
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Select Class"
                  name="selectClass"
                  rules={[
                    {
                      required: true,
                      message: "Please select an option!",
                    },
                  ]}
                >
                  <Select placeholder="--Select Class--">
                    <Option value="XI">XI</Option>
                    <Option value="XII">XII</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="From Date"
                  name="fromDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select Date!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="To Date"
                  name="toDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select Date!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="From DOB"
                  name="fromDOB"
                  rules={[
                    {
                      required: true,
                      message: "Please select DOB!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="To DOB"
                  name="toDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select DOB!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Form Charge"
                  name="formCharge"
                  rules={[
                    {
                      required: true,
                      message: "Please select Form Charge!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Form Charge" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Same School From Charge"
                  name="ssfc"
                  rules={[
                    {
                      required: true,
                      message: "Please select Form Charge!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Same School Form Charge" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Thumbnail" name="thumbnail">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Choose file</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Allow Same Schools"
                  name="allowSameSchool"
                  rules={[
                    {
                      required: true,
                      message: "Please select!",
                    },
                  ]}
                >
                 <Checkbox onChange={onChange}/>
                </Form.Item>
              </Col>
            </Row>
            <Col span={12}>
                <Form.Item
                  label="Allow Student Photo"
                  name="allowStudentPhoto"
                  rules={[
                    {
                      required: true,
                      message: "Please select!",
                    },
                  ]}
                >
                 <Checkbox onChange={onChange}/>
                </Form.Item>
              </Col><Col span={12}>
                <Form.Item
                  label="Allow Mother Photo"
                  name="allowMotherPhoto"
                  rules={[
                    {
                      required: true,
                      message: "Please select!",
                    },
                  ]}
                >
                 <Checkbox onChange={onChange}/>
                </Form.Item>
              </Col>
              <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleTextEditor}
      />
          </Form>
        </Modal>
      </div>
      <div className="border-b-rgb(217 216 213) border-b border-solid m-[1rem] text-[15px] font-semibold">
        LIST APPLICATION FORM
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 1500,
        }}
      />{" "}
    </div>
  );
};

export default MAF;
