<template>
  <Modal
    :visible="$props.visible"
    :title="$props.title"
    okText="确定"
    cancelText="取消"
    @cancel="
      () => {
        $props.onCancel && $props.onCancel();
      }
    "
    @ok="
      () => {
        presenter.handleSubmit();
      }
    "
    :ok-button-props="{
      loading: model.value.loading,
    }"
  >
    <div>
      <Form :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <FormItem label="姓名" required>
          <Input
            :value="model.value.data?.name"
            autocomplete="off"
            @change="
              (e) => {
                presenter.handleFormChange('name', e.target.value);
              }
            "
          />
        </FormItem>
        <FormItem label="年龄" required>
          <Input
            :value="model.value.data?.age"
            autocomplete="off"
            @change="
              (e) => {
                presenter.handleFormChange('age', e.target.value);
              }
            "
          />
        </FormItem>
        <FormItem label="电话" required>
          <Input
            :value="model.value.data?.mobile"
            autocomplete="off"
            @change="
              (e) => {
                presenter.handleFormChange('mobile', e.target.value);
              }
            "
          />
        </FormItem>
        <FormItem label="tags">
          <Select
            mode="tags"
            :value="model.value.data?.tags"
            :options="model.value.tagOptions"
            @change="
              (value) => {
                presenter.handleFormChange('tags', value);
              }
            "
          />
        </FormItem>
        <FormItem label="住址">
          <Input
            :value="model.value.data?.address"
            autocomplete="off"
            @change="
              (e) => {
                presenter.handleFormChange('address', e.target.value);
              }
            "
          />
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Modal, Form, Input, Select } from "ant-design-vue";
import { Model } from "./model";
import usePresenter from "./presenter";

const FormItem = Form.Item;

const props = defineProps({
  visible: Boolean,
  action: String as PropType<"create" | "edit">,
  title: String as PropType<"创建" | "编辑">,
  onCancel: {
    type: Function as PropType<() => void>,
    default: () => {},
    required: true,
  },
  onOk: Function as PropType<() => void>,
  data: Object as PropType<Model["state"]["data"]>,
});

const presenter = usePresenter(props);
const { model } = presenter;
</script>
