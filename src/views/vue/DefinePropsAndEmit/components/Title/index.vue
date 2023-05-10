<template>
  <div @click="presenter.handleClick">{{ props.name }}</div>
</template>
<script setup lang="ts">
import { usePresenter } from "./presenter";

export interface IProps {
  name: string;
}

export interface IEmit {
  (event: "update", name: string): void;
}

const props = defineProps<IProps>();

const emit = defineEmits<IEmit>();

const presenter = usePresenter(props, emit);
const { model } = presenter;
</script>
