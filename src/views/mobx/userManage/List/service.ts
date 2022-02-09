import { runInAction } from "mobx";
import { delUser, fetchUserList } from "./api";
import Model from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async getUserList() {
    if (this.model.loading) {
      return;
    }
    this.model.loading = true;
    const res = await fetchUserList({
      page: this.model.pagination.page,
      size: this.model.pagination.size,
      name: this.model.filterForm.name,
    }).catch(() => {});
    if (res) {
      runInAction(() => {
        this.model.userList = res.result.rows;
        this.model.pagination.total = res.result.total;
        this.model.loading = false;
      });
    }
  }

  changePage(page: number, pageSize: number) {
    if (pageSize !== this.model.pagination.size) {
      runInAction(() => {
        this.model.pagination.page = 1;
        this.model.pagination.size = pageSize;
        this.model.runFetch += 1;
      });
    } else {
      runInAction(() => {
        this.model.pagination.page = page;
        this.model.runFetch += 1;
      });
    }
  }

  changeFilterForm(name: string, value: any) {
    runInAction(() => {
      (this.model.filterForm as any)[name] = value;
    });
  }

  resetForm() {
    runInAction(() => {
      this.model.filterForm = {} as any;
      this.model.pagination.page = 1;
      this.model.runFetch += 1;
    });
  }

  doSearch() {
    runInAction(() => {
      this.model.pagination.page = 1;
      this.model.runFetch += 1;
    });
  }

  edit(data: Model["modalInfo"]["data"]) {
    runInAction(() => {
      this.model.modalInfo.action = "edit";
      this.model.modalInfo.data = data;
      this.model.modalInfo.visible = true;
      this.model.modalInfo.title = "编辑";
    });
  }

  async del(id: number) {
    runInAction(() => {
      this.model.loading = true;
    });
    await delUser({ id: id }).finally(() => {
      runInAction(() => {
        this.model.loading = false;
      });
    });
  }
}
