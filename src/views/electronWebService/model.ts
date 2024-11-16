import { reactive, ref } from "vue";

export const useModel = () => {
  const mac = ref("");

  return {
    mac,
  };
};

export type Model = ReturnType<typeof useModel>;
