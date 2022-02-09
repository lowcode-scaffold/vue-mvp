import { shallowRef, triggerRef, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import { IFetchUserListResult } from "./api";
import { createModel } from "./model";
import Service from "./service";
import { reaction } from "@formily/reactive";

const usePresenter = () => {
  const model = createModel();
  const service = new Service(model);
  reaction(
    () => model.runFetch,
    () => {
      service.getUserList();
    },
    { fireImmediately: true },
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
    refresh,
  };
};

export default usePresenter;
