import React from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Table,
  Popconfirm,
  DatePicker,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function OrdersPage() {
  //Call API
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedOrders, setSelectedOrders] = React.useState(null);

  //Refresh
  const [refresh, setRefresh] = React.useState(0);

  //columns of antd table
  const columns = [
    {
      title: "STT",
      key: "no",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{index + 1}</span>
          </div>
        );
      },
    },
    {
      title: "Ngày tạo đơn",
      key: "createdDate",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{record.createdDate}</strong>
          </div>
        );
      },
    },
    {
      title: "Ngày giao",
      key: "shippedDate",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{record.shippedDate}</strong>
          </div>
        );
      },
    },
    {
      title: "Hình thức thanh toán",
      key: "paymentType",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.paymentType}</span>
          </div>
        );
      },
    },
    {
      title: "Tình trạng đơn",
      key: "status",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.status}</span>
          </div>
        );
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>{record.customer.fullName}</strong>
          </div>
        );
      },
    },
    {
      title: "Nhân viên bán hàng",
      dataIndex: "employee",
      key: "employee",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>{record.employee.fullName}</strong>
          </div>
        );
      },
    },
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Popconfirm
              style={{ width: 1000 }}
              title="Bạn muốn xoá đơn hàng này?"
              description="Bạn muốn xoá đơn hàng này?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={() => {
                deleteOrders(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>

            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectOrders(record)}
            />
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/orders").then((response) => {
      // console.log(response.data);
      setOrders(response.data);
    });
  }, [refresh]);

  React.useEffect(() => {
    axios.get("http://localhost:9000/customers").then((response) => {
      setCustomers(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/employees").then((response) => {
      // console.log(response.data);
      setEmployees(response.data);
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/orders", values).then((response) => {
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
      .patch("http://localhost:9000/orders/" + selectedOrders._id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectOrders = (data) => {
    setEditModalVisible(true);
    setSelectedOrders(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const deleteOrders = (_id) => {
    axios.delete("http://localhost:9000/orders/" + _id).then((response) => {
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
        name="create-orders"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {/* createdDate */}
        <Form.Item
          label="Ngày tạo đơn"
          name="createdDate"
          rules={[
            {
              required: true,
              message: "Please choose the created date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        {/* shippedDate */}
        <Form.Item
          label="Ngày giao"
          name="shippedDate"
          rules={[
            {
              required: true,
              message: "Please choose the shipped date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        {/* STATUS */}
        <Form.Item
          label="Tình trạng đơn"
          name="status"
          rules={[
            {
              required: true,
              message: "Please choose the payment type!",
            },
          ]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              {
                value: "WAITING",
                label: "WAITING",
              },
              {
                value: "COMPLETED",
                label: "COMPLETED",
              },
              {
                value: "CANCELED",
                label: "CANCELED",
              },
            ]}
          />
        </Form.Item>

        {/* DESCRIPTION */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              type: "text",
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PAYMENT */}
        <Form.Item
          label="Hình thức thanh toán"
          name="paymentType"
          rules={[
            {
              required: true,
              message: "Please choose the payment type!",
            },
          ]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              {
                value: "CASH",
                label: "CASH",
              },
              {
                value: "CREDIT CARD",
                label: "CREDIT CARD",
              },
            ]}
          />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item
          label="Địa chỉ giao"
          name="address"
          rules={[
            {
              type: "text",
              required: false,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* CUSTOMER */}
        <Form.Item
          label="Khách hàng"
          name="customer"
          rules={[
            {
              required: true,
              message: "Please choose customer!",
            },
          ]}
        >
          <Select
            options={
              customers &&
              customers.map((c) => {
                return {
                  value: c._id,
                  label: c.fullName,
                };
              })
            }
          />
        </Form.Item>

        {/* EMPLOYEE */}
        <Form.Item
          label="Nhân viên bán hàng"
          name="employee"
          rules={[
            {
              required: true,
              message: "Please choose employee!",
            },
          ]}
        >
          <Select
            options={
              employees &&
              employees.map((c) => {
                return {
                  value: c._id,
                  label: c.fullName,
                };
              })
            }
          />
        </Form.Item>

        {/* SUBMIT */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Lưu thông tin
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <Table
        dataSource={orders}
        columns={columns}
        pagination={false}
        rowKey="id"
      />

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Update orders"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu thông tin"
        onOk={() => {
          alert("Edit successful");
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="updateOrders"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          {/* createdDate */}
          <Form.Item
            label="Ngày tạo đơn"
            name="createdDate"
            rules={[
              {
                required: true,
                message: "Please choose the created date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          {/* shippedDate */}
          <Form.Item
            label="Ngày giao"
            name="shippedDate"
            rules={[
              {
                required: true,
                message: "Please choose the shipped date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          {/* STATUS */}
          <Form.Item
            label="Tình trạng đơn"
            name="status"
            rules={[
              {
                required: true,
                message: "Please choose the payment type!",
              },
            ]}
          >
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: "WAITING",
                  label: "WAITING",
                },
                {
                  value: "COMPLETED",
                  label: "COMPLETED",
                },
                {
                  value: "CANCELED",
                  label: "CANCELED",
                },
              ]}
            />
          </Form.Item>

          {/* DESCRIPTION */}
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                type: "text",
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PAYMENT */}
          <Form.Item
            label="Hình thức thanh toán"
            name="paymentType"
            rules={[
              {
                required: true,
                message: "Please choose the payment type!",
              },
            ]}
          >
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: "CASH",
                  label: "CASH",
                },
                {
                  value: "CREDIT CARD",
                  label: "CREDIT CARD",
                },
              ]}
            />
          </Form.Item>

          {/* ADDRESS */}
          <Form.Item
            label="Địa chỉ giao"
            name="address"
            rules={[
              {
                type: "text",
                required: false,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* CUSTOMER */}
          <Form.Item
            label="Khách hàng"
            name="customer"
            rules={[
              {
                required: true,
                message: "Please choose customer!",
              },
            ]}
          >
            <Select
              options={
                customers &&
                customers.map((c) => {
                  return {
                    value: c._id,
                    label: c.fullName,
                  };
                })
              }
            />
          </Form.Item>

          {/* EMPLOYEE */}
          <Form.Item
            label="Nhân viên bán hàng"
            name="employee"
            rules={[
              {
                required: true,
                message: "Please choose employee!",
              },
            ]}
          >
            <Select
              options={
                employees &&
                employees.map((c) => {
                  return {
                    value: c._id,
                    label: c.fullName,
                  };
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OrdersPage;
