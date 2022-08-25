<template>
  <div :class="styles.index">
    <div :class="styles.filter">
      <Row :gutter="[20, 0]">
        <Col :span="8">
          <FormItem label="名称">
            <Input
              :value="model.value.filterForm.name"
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
            <template #icon>
              <PlusOutlined />
            </template>
            创建
          </Button>
        </Col>
      </Row>
    </div>
    <Table
      :columns="columns"
      :dataSource="model.value.userList"
      :loading="model.value.loading"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tags'">
          <Tag v-for="tag in record.tags" :key="tag" color="blue">{{
            tag
          }}</Tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <Button type="link" @click="() => presenter.handelEdit(record)">
              编辑
            </Button>
            <Button
              type="link"
              danger
              @click="
                () => {
                  presenter.handleDel(record);
                }
              "
            >
              删除
            </Button>
          </span>
        </template>
      </template>
    </Table>
    <Pagination
      :current="model.value.pagination.page"
      :total="model.value.pagination.total"
      showQuickJumper
      hideOnSinglePage
      style="margin-top: 20px"
      :pageSize="model.value.pagination.size"
      @change="
        (page, pageSize) => {
          presenter.handlePageChange(page, pageSize);
        }
      "
    />
    <!-- <EditModal
      :visible="model.modalInfo.visible"
      :data="model.modalInfo.data"
      :title="model.modalInfo.title"
      :onCancel="
        () => {
          model.modalInfo.visible = false;
        }
      "
      :onOk="
        () => {
          model.modalInfo.visible = false;
          presenter.refresh();
        }
      "
    /> -->
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
import EditModal from "./EditModal/index.vue";

const FormItem = Form.Item;

const presenter = usePresenter();
const { model } = presenter;
const columns: ColumnsType = [
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
    title: "操作",
    key: "action",
    width: 200,
  },
];
const handleFormChange = (e: any) => {
  presenter.handleFormChange("name", e.target.value);
};
</script>
