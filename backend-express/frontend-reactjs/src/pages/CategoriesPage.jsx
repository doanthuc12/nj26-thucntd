import React from "react";
import axios from "axios";
import { Form, Input, Button, Modal, Space, Table } from "antd";

function CategoriesPage() {
  //Call API
  const [categories, setCategories] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState(null);

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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button onClick={() => deleteCategories(record.id)}>Delete</Button>
            <Button onClick={() => selectCategories(record)}>Edit</Button>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/categories").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/categories", values).then((response) => {
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
      .patch(
        "http://localhost:9000/categories/" + selectedCategories.id,
        values
      )
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectCategories = (data) => {
    setEditModalVisible(true);
    setSelectedCategories(data);
    updateForm.setFieldValue(data);
    console.log(data);
  };

  const deleteCategories = (id) => {
    axios.delete("http://localhost:9000/categories/" + id).then((response) => {
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
        name="create-categories"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name of category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
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
        dataSource={categories}
        columns={columns}
        pagination={false}
        rowKey="id"
      ></Table>

      <Modal
        open={editModalVisible}
        centered
        title="Update categories"
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
          name="updateCategories"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name of category!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
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

export default CategoriesPage;
