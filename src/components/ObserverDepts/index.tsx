import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    depts: Array as PropType<any[]>,
  },

  render() {
    return null;
  },
});

export function collect(data?: Record<string, any>) {
  if (!data) {
    return [];
  }
  return Object.keys(data).map((s) => data[s]);
}
