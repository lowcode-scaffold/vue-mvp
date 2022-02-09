import { delUser, fetchUserList } from "./api";
import { Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async getUserList() {
    if (this.model.loading.value) {
      return;
    }
    this.model.loading.value = true;
    const res = await fetchUserList({
      page: this.model.pagination.page,
      size: this.model.pagination.size,
      name: this.model.filterForm.name,
    }).catch(() => {});
    if (res) {
      this.model.userList = res.result.rows;
      this.model.pagination.total = res.result.total;
      this.model.loading.value = false;
    }
  }

  changePage(page: number, pageSize: number) {
    if (pageSize !== this.model.pagination.size) {
      this.model.pagination.page = 1;
      this.model.pagination.size = pageSize;
      this.model.runFetch.value += 1;
    } else {
      this.model.pagination.page = page;
      this.model.runFetch.value += 1;
    }
  }

  changeFilterForm(name: string, value: any) {
    (this.model.filterForm as any)[name] = value;
  }

  resetForm() {
    this.model.filterForm = {} as any;
    this.model.pagination.page = 1;
    this.model.runFetch.value += 1;
  }

  doSearch() {
    this.model.pagination.page = 1;
    this.model.runFetch.value += 1;
  }

  edit(data: Model["modalInfo"]["data"]) {
    this.model.modalInfo.action = "edit";
    this.model.modalInfo.data = data;
    this.model.modalInfo.visible = true;
    this.model.modalInfo.title = "编辑";
  }

  async del(id: number) {
    this.model.loading.value = true;
    await delUser({ id: id }).finally(() => {
      this.model.loading.value = false;
    });
  }
}
