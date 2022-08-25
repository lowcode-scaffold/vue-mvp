import { createUser, editUser } from "../api";
import { Model, IState } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  init(data: IState["data"]) {
    this.model.setState((s) => {
      s.data = data || ({} as any);
    });
    if (data && data.tags) {
      this.model.setState((s) => {
        s.tagOptions = data.tags.map((tag) => ({
          label: tag,
          value: tag,
        }));
      });
    } else {
      this.model.setState((s) => {
        s.tagOptions = [];
      });
    }
  }

  changeForm(name: string, value: any) {
    this.model.setState((s: any) => {
      s.data[name] = value;
    });
  }

  async createUser() {
    this.model.setState((s) => {
      s.loading = true;
    });
    await createUser({
      name: this.model.state.data!.name,
      age: this.model.state.data!.age,
      mobile: this.model.state.data!.mobile,
      tags: this.model.state.data?.tags,
      address: this.model.state.data?.address,
    }).finally(() => {
      this.model.setState((s) => {
        s.loading = false;
      });
    });
  }

  async editUser() {
    this.model.setState((s) => {
      s.loading = true;
    });
    await editUser({
      name: this.model.state.data!.name,
      age: this.model.state.data!.age,
      mobile: this.model.state.data!.mobile,
      tags: this.model.state.data?.tags,
      address: this.model.state.data?.address,
      id: this.model.state.data!.id,
    }).finally(() => {
      this.model.setState((s) => {
        s.loading = false;
      });
    });
  }
}
