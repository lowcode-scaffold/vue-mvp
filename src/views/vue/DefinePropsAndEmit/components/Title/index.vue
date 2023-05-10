<template>
  <div @click="presenter.handleClick">{{ props.name }}</div>
</template>
<script setup lang="ts">
import { withDefaults } from "vue";
import { usePresenter } from "./presenter";
interface IProps {
  name: string;
}
interface IEmit {
  (event: "update", name: string): void;
}

const props = withDefaults(defineProps<IProps>(), {
  name: "hello",
});

const emit = defineEmits<IEmit>();

const presenter = usePresenter(props, emit);
const { model } = presenter;
</script>
