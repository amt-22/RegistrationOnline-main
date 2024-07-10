import React, { useState } from "react";
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  EditTwoTone,
  DeleteTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  HomeTwoTone,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Select,
  Button,
  Table,
  Space,
  Tag,
  Dropdown,
  Avatar,
  Modal,
  Input,
  Form,
} from "antd";
import MST from "../Components/ManageStreamType/MST";
import MSO from "../Components/ManageStreamType/ManageSubjectOption/MSO";
import OR from "../Components/OnlineRegistration/OR";
import MAF from "../Components/ManageApplicationForm/MAF";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const Dashitems = [
  getItem("Dashboard", "Dashboard", <PieChartOutlined />),
  getItem("Online Registration", "OnlineRegistration", <UserOutlined />, [
    getItem("Manage Stream Type", "ManageStreamType", <FileOutlined />),
    getItem("Manage Subject Option", "ManageSubjectOption", <FileOutlined />),
    getItem("Manage Application Form","ManageApplicationForm",<FileOutlined /> ),]),
     getItem("Team", "ub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState(["Home"]);
  const [currentPath, setCurrentPath] = useState("OnlineRegistration");
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (item) => {
    console.log(item);
    const newPath = item.key;
    setBreadcrumb([breadcrumb[0], newPath]);
    setCurrentPath(newPath);
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },

    {
      key: "2",
      danger: true,
      label: "Log out",
    },
  ];
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider width="250px" trigger={null} collapsible collapsed={collapsed}>
        <div
          className={`flex  ${collapsed ? "justify-center" : "items-center"}`}
        >
          {!collapsed ? (
            <div className="flex items-center justify-between  my-[15px] mt-[80px]">
              <Avatar size="large" icon={<UserOutlined />} />
              <div className="w-[180px]">
                <p className="break-all font-bold">
                  Akaal Websoft Private Limited
                </p>
                <p>AWS12345</p>
              </div>

              <SettingOutlined size="large" />
            </div>
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )}
        </div>

        <p className="font-semibold m-[1rem]">Main</p>
        <div className="flex justify-between mx-[27px]">
          <SearchOutlined size={64} />
          {!collapsed && (
            <Select
              mode="multiple"
              placeholder="Select Menu"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{
                width: "175px",
              }}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          )}
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={Dashitems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                marginLeft: 15,
                marginRight: 15,
                width: 30,
                height: 30,
              }}
            />
            <Tag color="success">success</Tag>
          </div>
          <Dropdown menu={{ items }} className="mx-5">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size="large" icon={<UserOutlined />} />
                <p>Akaal Websoft</p>

                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <HomeTwoTone className="mx-2" />
            {breadcrumb.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              // padding: 14,
              border: "1px solid rgb(217 216 213)",
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {currentPath === "Dashboard" ? (
              <p>Dashboard content</p>
            ) : currentPath === "ManageStreamType" ? (
              <MST />
            ) : currentPath === "ManageSubjectOption" ? (
              <MSO />
            ) : currentPath === "OnlineRegistration" ? (
              <OR />
            ) : currentPath === "ManageApplicationForm" ? (
              <MAF />

            ): null}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©{new Date().getFullYear()}{" "}
          <a href="https://www.ggpsbokaro.org/">
            Guru Gobind Singh Public School, Bokaro
          </a>{" "}
          Al right reserved. Design and Developed by{" "}
          <a href="https://akaalwebsoft.com/">Akaal WebSoftware limited</a>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashBoard;
