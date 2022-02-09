import { reactive, ref } from "vue";
import { IFetchUserListResult } from "./api";

export const useModel = () => {
  const filterForm = reactive({ name: "" });
  const userList = reactive<IFetchUserListResult["result"]["rows"]>([]);
  const pagination = reactive({
    size: 10,
    page: 1,
    total: 0,
  });
  const loading = ref(false);

  const runFetch = ref(0);

  const modalInfo = reactive<{
    action: "create" | "edit";
    title: "创建" | "编辑";
    visible: boolean;
    data?: IFetchUserListResult["result"]["rows"][0];
  }>({
    action: "create",
    title: "创建",
    visible: false,
    data: undefined,
  });

  return {
    filterForm,
    userList,
    pagination,
    loading,
    runFetch,
    modalInfo,
  };
};

export type Model = ReturnType<typeof useModel>;
