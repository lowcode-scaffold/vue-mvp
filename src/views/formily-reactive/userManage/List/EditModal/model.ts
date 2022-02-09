import { observable } from "@formily/reactive";
import { IFetchUserListResult } from "../api";

export default class Model {
  data?: IFetchUserListResult["result"]["rows"][0] = {} as any;

  tagOptions: { label: string; value: string }[] = [];

  loading = false;
}

export const createModel = () => observable(new Model());
