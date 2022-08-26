import {
  defineComponent,
  PropType,
  ExtractPropTypes,
  watch,
  onMounted,
} from "vue";
import { Modal, Form, Input, Select } from "ant-design-vue";
import usePresenter from "./presenter";
import Model from "./model";
import { observer } from "@formily/reactive-vue";
const props = {
  visible: Boolean,
  action: String as PropType<"create" | "edit">,
  title: String as PropType<"创建" | "编辑">,
  onCancel: {
    type: Function as PropType<() => void>,
    default: () => {},
    required: true,
  },
  onOk: Function as PropType<() => void>,
  data: Object as PropType<Model["data"]>,
};

export type Props = ExtractPropTypes<typeof props>;

const EditModal = defineComponent({
  props: props,
  setup(props) {
    const presenter = usePresenter(props as any);
    const { model } = presenter;

    return {
      model,
      presenter,
    };
  },
  render() {
    return (
      <Modal
        visible={this.$props.visible}
        title={this.$props.title}
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          this.$props.onCancel();
        }}
        onOk={() => {
          this.presenter.handleSubmit();
        }}
        okButtonProps={{
          loading: this.model.loading,
        }}
      >
        <div>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="姓名" required>
              <Input
                value={this.model.data?.name}
                autocomplete="off"
                onChange={(e) => {
                  const { value } = e.target;
                  this.presenter.handleFormChange("name", value);
                }}
              />
            </Form.Item>
            <Form.Item label="年龄" required>
              <Input
                value={this.model.data?.age}
                autocomplete="off"
                onChange={(e) => {
                  const { value } = e.target;
                  this.presenter.handleFormChange("age", value);
                }}
              />
            </Form.Item>
            <Form.Item label="电话" required>
              <Input
                value={this.model.data?.mobile}
                autocomplete="off"
                onChange={(e) => {
                  const { value } = e.target;
                  this.presenter.handleFormChange("mobile", value);
                }}
              />
            </Form.Item>
            <Form.Item label="tags">
              <Select
                mode="tags"
                value={this.model.data?.tags}
                options={this.model.tagOptions}
                onChange={(value) => {
                  this.presenter.handleFormChange("tags", value);
                }}
              />
            </Form.Item>
            <Form.Item label="住址">
              <Input
                value={this.model.data?.address}
                autocomplete="off"
                onChange={(e) => {
                  const { value } = e.target;
                  this.presenter.handleFormChange("address", value);
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  },
});

export default observer(EditModal);
