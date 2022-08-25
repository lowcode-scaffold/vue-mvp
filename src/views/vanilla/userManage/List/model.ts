import { MVPModel } from "../../core/model";
import { IFetchUserListResult } from "./api";

export interface IState {
  filterForm: { name: string };
  userList: IFetchUserListResult["result"]["rows"];
  pagination: { size: number; page: number; total: number };
  loading: boolean;
  runFetch: number;
  modalInfo: {
    action: "create" | "edit";
    title: "创建" | "编辑";
    visible: boolean;
    data?: IFetchUserListResult["result"]["rows"][0];
  };
}

export class Model extends MVPModel<IState> {
  private static singleton: Model;

  static getSingleton() {
    if (!Model.singleton) {
      Model.singleton = new Model();
    }
    return Model.singleton;
  }

  constructor() {
    super();
    this.state = {
      filterForm: {
        name: "",
      },
      userList: [],
      pagination: { page: 1, size: 10, total: 0 },
      loading: false,
      runFetch: 0,
      modalInfo: {
        action: "create",
        title: "创建",
        visible: false,
        data: undefined,
      },
    };
  }
}
