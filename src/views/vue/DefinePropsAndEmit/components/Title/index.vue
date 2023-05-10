<template>
  <div @click="presenter.handleClick">{{ props.name }}</div>
</template>
<script setup lang="ts">
import { usePresenter, IProps, IEmit } from "./presenter";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends IProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Emit extends IEmit {}

const props = defineProps<Props>();

const emit = defineEmits<Emit>();

const presenter = usePresenter(props, emit);
const { model } = presenter;
</script>
