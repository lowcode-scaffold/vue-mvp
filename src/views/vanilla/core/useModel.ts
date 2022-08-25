import { onMounted, onUnmounted, reactive, ref, readonly } from "vue";
import { MVPModel } from "./model";

// eslint-disable-next-line @typescript-eslint/ban-types
export function useModel<T>(model: MVPModel<T>) {
  const state = reactive<{ value: T }>({ value: model.state });
  const unSubscribe = ref<(() => void) | undefined>(undefined);

  onMounted(() => {
    unSubscribe.value = model.subscribe((newState) => {
      state.value = newState as any;
    });
  });

  onUnmounted(() => unSubscribe.value && unSubscribe.value());
  return state;
}
