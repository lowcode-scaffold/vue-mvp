import { watch } from "vue";
import { message, Modal } from "ant-design-vue";
import { IFetchUserListResult } from "./api";
import Service from "./service";
import { useModel } from "./model";

const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  watch(
    () => model.runFetch.value,
    () => {
      service.getUserList();
    },
    { immediate: true },
  );

  const handlePageChange = (page: number, pageSize: number) => {
    service.changePage(page, pageSize);
  };

  const handleFormChange = (name: string, value: any) => {
    service.changeFilterForm(name, value);
  };

  const handleSearch = () => {
    service.doSearch();
  };

  const handleReset = () => {
    service.resetForm();
  };

  const handelEdit = (data: IFetchUserListResult["result"]["rows"][0]) => {
    service.edit(data);
  };

  const handleDel = (data: IFetchUserListResult["result"]["rows"][0]) => {
    Modal.confirm({
      title: "确认",
      content: "确认删除当前记录？",
      cancelText: "取消",
      okText: "确认",
      onOk: () => {
        service.del(data.id).then(() => {
          message.success("删除成功");
          service.getUserList();
        });
      },
    });
  };

  const handleCreate = () => {
    model.modalInfo.visible = true;
    model.modalInfo.title = "创建";
    model.modalInfo.data = undefined;
  };

  const refresh = () => {
    service.getUserList();
  };

  return {
    model,
    handlePageChange,
    handleFormChange,
    handleSearch,
    handleReset,
    handelEdit,
    handleDel,
    handleCreate,
    refresh,
  };
};

export default usePresenter;
