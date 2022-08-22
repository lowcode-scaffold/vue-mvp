<template>
  <div :class="styles.index">
    <div :class="styles.filter">
      <Row :gutter="[20, 0]">
        <Col :span="8">
          <FormItem label="名称">
            <Input
              :value="model.filterForm.name"
              placeholder="输入名称搜索"
              @change="handleFormChange"
              @press-enter="presenter.handleSearch"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" style="text-align: right">
          <Button type="primary" @click="presenter.handleSearch"> 查询 </Button>
          <Button style="margin-left: 10px" @click="presenter.handleReset">
            重置
          </Button>
          <Button
            style="margin-left: 10px"
            type="primary"
            @click="presenter.handleCreate"
          >
            创建
          </Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Table,
  Pagination,
  Row,
  Col,
  Button,
  Form,
  Input,
  Tag,
} from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import usePresenter from "./presenter";
import styles from "./index.module.less";
import { ColumnsType } from "ant-design-vue/lib/table";
import EditModal from "./EditModal";

const FormItem = Form.Item;

const presenter = usePresenter();
const { model } = presenter;
const culumns: ColumnsType = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 150,
  },
  {
    title: "电话",
    dataIndex: "mobile",
    key: "mobile",
    width: 150,
  },
  {
    title: "tags",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 300,
  },
  {
    title: "Action",
    key: "action",
    width: 200,
  },
];
const handleFormChange = (e: any) => {
  presenter.handleFormChange("name", e.target.value);
};
</script>
