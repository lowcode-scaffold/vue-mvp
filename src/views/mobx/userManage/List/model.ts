import { makeAutoObservable } from "mobx";
import { IFetchUserListResult } from "./api";

export default class Model {
  filterForm = { name: "" };

  userList: IFetchUserListResult["result"]["rows"] = [];

  pagination = { size: 10, page: 1, total: 0 };

  loading = false;

  runFetch = 0;

  modalInfo: {
    action: "create" | "edit";
    title: "创建" | "编辑";
    visible: boolean;
    data?: IFetchUserListResult["result"]["rows"][0];
  } = {
    action: "create",
    title: "创建",
    visible: false,
    data: undefined,
  };
}
export const createModel = () => makeAutoObservable(new Model());
