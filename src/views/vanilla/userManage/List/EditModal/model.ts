import { reactive, ref } from "vue";
import { IFetchUserListResult } from "../api";

export const useModel = () => {
  const data = reactive<IFetchUserListResult["result"]["rows"][0]>({} as any);

  const tagOptions = reactive<{ label: string; value: string }[]>([]);

  const loading = ref(false);

  return {
    data,
    tagOptions,
    loading,
  };
};

export type Model = ReturnType<typeof useModel>;
