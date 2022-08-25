import { defineComponent } from "vue";
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

const Index = defineComponent({
  setup() {
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
        customRender(data) {
          return data.value.map((s: string) => {
            return (
              <Tag color="blue" key={s}>
                {s}
              </Tag>
            );
          });
        },
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
        customRender(data) {
          return (
            <span>
              <Button
                type="link"
                onClick={() => {
                  presenter.handelEdit(data.record);
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                danger
                onClick={() => {
                  presenter.handleDel(data.record);
                }}
              >
                删除
              </Button>
            </span>
          );
        },
      },
    ];
    return { model, presenter, culumns };
  },
  render() {
    return (
      <div>
        <div class={styles.index}>
          <div class={styles.filter}>
            <Row gutter={[20, 0]}>
              <Col span={8}>
                <Form.Item label="名称">
                  <Input
                    value={this.model.value.filterForm.name}
                    placeholder="输入名称搜索"
                    onChange={(e) => {
                      this.presenter.handleFormChange("name", e.target.value);
                    }}
                    onPressEnter={this.presenter.handleSearch}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={this.presenter.handleSearch}>
                  查询
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={this.presenter.handleReset}
                >
                  重置
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  type="primary"
                  onClick={() => {
                    this.presenter.handleCreate();
                  }}
                  icon={<PlusOutlined />}
                >
                  创建
                </Button>
              </Col>
            </Row>
          </div>
          <Table
            columns={this.culumns}
            dataSource={this.model.value.userList}
            loading={this.model.value.loading}
            pagination={false}
          />
          <Pagination
            current={this.model.value.pagination.page}
            total={this.model.value.pagination.total}
            showQuickJumper
            hideOnSinglePage
            style={{ marginTop: "20px" }}
            pageSize={this.model.value.pagination.size}
            onChange={(page, pageSize) => {
              this.presenter.handlePageChange(page, pageSize);
            }}
          />
        </div>
        {/* <EditModal
          visible={this.model.modalInfo.visible}
          data={this.model.modalInfo.data}
          title={this.model.modalInfo.title}
          onCancel={() => {
            this.model.modalInfo.visible = false;
          }}
          onOk={() => {
            this.model.modalInfo.visible = false;
            this.presenter.refresh();
          }}
        /> */}
      </div>
    );
  },
});
export default Index;
