import { makeAutoObservable } from "mobx";
import { IFetchUserListResult } from "../api";

export default class Model {
  data?: IFetchUserListResult["result"]["rows"][0] = {} as any;

  tagOptions: { label: string; value: string }[] = [];

  loading = false;
}

export const createModel = () => makeAutoObservable(new Model());
