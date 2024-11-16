<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    "
  >
    <Space>
      <Button @click="presenter.handleGetMac">获取 mac 地址</Button>
      <Button @click="presenter.handleMinimi">最小化窗口</Button>
      <Button @click="presenter.handleMaximize">最大化窗口</Button>
    </Space>
    <Alert
      style="margin-top: 10px"
      v-if="model.mac.value"
      :message="`mac 地址: ${model.mac.value}`"
      type="info"
    ></Alert>
  </div>
</template>
<script lang="ts" setup>
import { Button, Space, Alert } from "ant-design-vue";
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="scss" scoped></style>
