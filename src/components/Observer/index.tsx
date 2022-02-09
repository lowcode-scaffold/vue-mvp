import { reaction } from "mobx";
import { defineComponent, PropType } from "vue";

export const Observer = defineComponent({
  props: {
    debuggerInfo: String,
  },
  data: () => ({
    dispose: () => {},
  }),
  mounted() {
    this.dispose = reaction(
      () => {
        return this.$slots.default!();
      },
      () => {
        this.$forceUpdate();
      },
      {
        requiresObservable: true,
      },
    );
  },
  unmounted() {
    this.dispose();
  },
  render() {
    return this.$slots.default!();
  },
});
