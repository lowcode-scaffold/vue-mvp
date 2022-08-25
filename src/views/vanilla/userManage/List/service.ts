import { delUser, fetchUserList } from "./api";
import { IState, Model } from "./model";

export default class Service {
  private model!: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async getUserList() {
    if (this.model.state.loading) {
      return;
    }
    this.model.setState((s) => {
      s.loading = true;
    });
    const res = await fetchUserList({
      page: this.model.state.pagination.page,
      size: this.model.state.pagination.size,
      name: this.model.state.filterForm.name,
    }).catch(() => {});
    if (res) {
      this.model.setState((s) => {
        s.userList = res.result.rows;
        s.pagination.total = res.result.total;
        s.loading = false;
      });
    }
  }

  changePage(page: number, pageSize: number) {
    this.model.setState((s) => {
      if (pageSize !== this.model.state.pagination.size) {
        s.pagination.page = 1;
        s.pagination.size = pageSize;
      } else {
        s.pagination.page = page;
        s.runFetch += 1;
      }
    });
  }

  changeFilterForm(name: string, value: any) {
    this.model.setState((s: any) => {
      s.filterForm[name] = value;
    });
  }

  resetForm() {
    this.model.setState((s) => {
      s.filterForm = {} as any;
      s.pagination.page = 1;
      s.runFetch += 1;
    });
  }

  doSearch() {
    this.model.setState((s) => {
      s.pagination.page = 1;
      s.runFetch += 1;
    });
  }

  edit(data: IState["modalInfo"]["data"]) {
    this.model.setState((s) => {
      s.modalInfo.action = "edit";
      s.modalInfo.data = data;
      s.modalInfo.visible = true;
      s.modalInfo.title = "编辑";
    });
  }

  async del(id: number) {
    this.model.setState((s) => {
      s.loading = true;
    });
    await delUser({ id }).finally(() => {
      this.model.setState((s) => {
        s.loading = false;
      });
    });
  }
}
