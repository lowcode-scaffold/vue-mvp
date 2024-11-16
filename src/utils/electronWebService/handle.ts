// 处理桌面端主动推送的消息

import { message } from "ant-design-vue";
import { locationReload } from ".";

const handle: Record<string, (data: unknown) => void> = {
  refresh: () => {
    locationReload();
  },
  logOut: async () => {
    // 删除token
    localStorage.removeItem("access_token");
    // 跳转到登录页面
    message.success("退出成功");
  },
};

export default handle;
