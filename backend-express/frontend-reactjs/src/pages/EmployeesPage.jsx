import React from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Table,
  Select,
  InputNumber,
} from "antd";

function EmployeesPage() {
  //Call API
  const [employees, setEmployees] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedEmployees, setSelectedEmployees] = React.useState(null);

  //Refresh
  const [refresh, setRefresh] = React.useState(0);

  //columns of antd table
  const columns = [
    {
      title: "STT",
      key: "TT",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ textAlign: "right" }}>{index + 1}</span>
          </div>
        );
      },
    },
    {
      title: "Name",
      key: "fullName",
      render: (text, record, index) => {
        return (
          <div>
            <span>
              {record.firstName} {record.lastName}
            </span>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button onClick={() => deleteEmployees(record.id)}>Delete</Button>
            <Button onClick={() => selectEmployees(record)}>Edit</Button>
          </Space>
        );
      },
    },
  ];

  //Phone Number
  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  React.useEffect(() => {
    axios.get("http://localhost:9000/employees").then((response) => {
      // console.log(response.data);
      setEmployees(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/employees", values).then((response) => {
      if (response.status === 201) {
        alert("Create successful");
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
      console.log(response.data);
    });
  };

  const onEditFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios
      .patch("http://localhost:9000/employees/" + selectedEmployees.id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectEmployees = (data) => {
    setEditModalVisible(true);
    setSelectedEmployees(data);
    updateForm.setFieldValue(data);
    console.log(data);
  };

  const deleteEmployees = (id) => {
    axios.delete("http://localhost:9000/employees/" + id).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <div>
      <Form
        form={createForm}
        name="create-employees"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input your valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              type: "number",
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <InputNumber addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={employees}
        columns={columns}
        pagination={false}
        rowKey="id"
      ></Table>

      <Modal
        open={editModalVisible}
        centered
        title="Update information"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Save"
        onOk={() => {
          alert("Edit successful");
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="updateEmployees"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please input your valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <InputNumber
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployeesPage;
