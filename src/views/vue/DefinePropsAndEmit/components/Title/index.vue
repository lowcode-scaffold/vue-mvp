<template>
  <div @click="presenter.handleClick">{{ props.name }}</div>
</template>
<script setup lang="ts">
import { IProps, usePresenter, IEmit } from "./presenter";

const props = defineProps<IProps>();

const emit = defineEmits<IEmit>();

const presenter = usePresenter(props, emit);
const { model } = presenter;
</script>
