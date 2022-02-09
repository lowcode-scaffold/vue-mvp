import { action } from "@formily/reactive";
import { createUser, editUser } from "../api";
import Model from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  init(data: Model["data"]) {
    action(() => {
      this.model.data = data || ({} as any);
      if (data && data.tags) {
        this.model.tagOptions = data.tags.map((s) => {
          return {
            label: s,
            value: s,
          };
        });
      } else {
        this.model.tagOptions = [];
      }
    });
  }

  changeForm(name: string, value: any) {
    action(() => {
      (this.model.data as any)[name] = value;
    });
  }

  async createUser() {
    this.model.loading = true;
    await createUser({
      name: this.model.data!.name,
      age: this.model.data!.age,
      mobile: this.model.data!.mobile,
      tags: this.model.data?.tags,
      address: this.model.data?.address,
    }).finally(() => {
      this.model.loading = false;
    });
  }

  async editUser() {
    this.model.loading = true;
    await editUser({
      name: this.model.data!.name,
      age: this.model.data!.age,
      mobile: this.model.data!.mobile,
      tags: this.model.data?.tags,
      address: this.model.data?.address,
      id: this.model.data!.id,
    }).finally(() => {
      this.model.loading = false;
    });
  }
}
