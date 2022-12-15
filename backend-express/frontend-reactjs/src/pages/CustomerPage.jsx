import React from "react";
import axios from "axios";
import { Form, Input, Button, Modal, Space, Table } from "antd";

function CustomerPage() {
  //Call API
  const [customers, setCustomers] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

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
      title: "Ho va Ten",
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
      title: "Thu dien tu",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button onClick={() => deleteCustomers(record.id)}>Delete</Button>
            <Button onClick={() => selectCustomers(record)}>Edit</Button>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/customers").then((response) => {
      // console.log(response.data);
      setCustomers(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/customers", values).then((response) => {
      if (response.status === 201) {
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
      .patch("http://localhost:9000/customers/" + selectedCustomer.id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectCustomers = (data) => {
    setEditModalVisible(true);
    setSelectedCustomer(data);
    updateForm.setFieldValue(data);
    console.log(data);
  };

  const deleteCustomers = (id) => {
    axios.delete("http://localhost:9000/customers/" + id).then((response) => {
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
        name="create-customer"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Ten"
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
          label="Ho"
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
          label="Thu dien tu"
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
        dataSource={customers}
        columns={columns}
        pagination={false}
        rowKey="id"
      ></Table>

      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
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
          name="updateCustomers"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          <Form.Item
            label="Ten"
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
            label="Ho"
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
            label="Thu dien tu"
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
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerPage;
