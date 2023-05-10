<template>
  <div>
    <Title @update="presenter.handleUpdate"></Title>
  </div>
</template>
<script setup lang="ts">
import { usePresenter } from "./presenter";
import Title from "./components/Title/index.vue";

const presenter = usePresenter();
const { model } = presenter;
</script>
