import { MVPModel } from "@/views/vanilla/core/model";
import { IFetchUserListResult } from "../api";

export interface IState {
  data: IFetchUserListResult["result"]["rows"][0];
  tagOptions: { label: string; value: string }[];
  loading: boolean;
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
      data: {} as any,
      tagOptions: [],
      loading: false,
    };
  }
}
