import { request } from "./request";

let iframeID = "";

const appInfo = { mac: "", version: "" };

export const setIframeId = (iframeId: string) => {
  iframeID = iframeId;
};

/** 根据 iframeID 判断是否嵌入桌面端 */

export const getIframeId = () => {
  return iframeID;
};

export const getCacheAppInfo = () => {
  return appInfo;
};

export const setCacheAppInfo = (info: { mac: string; version: string }) => {
  appInfo.mac = info.mac;
  appInfo.version = info.version;
};

/** 代理部分方法，嵌入客户端走自定义逻辑 */
export const propxyWindowMethod = () => {
  const windowOpen = window.open;
  window.open = function (
    url?: string | URL,
    target?: string,
    features?: string,
  ) {
    console.log(url, target, features, window.parent);
    // 嵌入客户端中
    if (iframeID) {
      if (typeof url === "string" && !url.startsWith("http")) {
        url = location.origin + url;
      }
      addNewTab(url as string);
      return null;
    } else {
      return windowOpen(url, target, features);
    }
  };
};

export const locationReload = () => {
  if (iframeID) {
    let href = location.href;
    if (href.indexOf("?") === -1) {
      href = href + `?iframeId=${iframeID}`;
    } else {
      if (href.indexOf("iframeId") === -1) {
        href = href + `&iframeId=${iframeID}`;
      }
    }
    location.href = href;
    setTimeout(() => {
      location.reload();
    }, 500);
  } else {
    location.reload();
  }
};

export const locationReplace = (href: string) => {
  if (iframeID) {
    if (href.indexOf("?") === -1) {
      href = href + `?iframeId=${iframeID}`;
    } else {
      if (href.indexOf("iframeId") === -1) {
        href = href + `&iframeId=${iframeID}`;
      }
    }
    location.replace(href);
  } else {
    location.replace(href);
  }
};

export function updateTitle(title: string) {
  return request({
    cmd: "updateTitle",
    data: { title, id: iframeID },
  });
}

export function addNewTab(url: string) {
  return request({
    cmd: "addNewTab",
    data: { url },
  });
}

export function closeOtherTabs(inLoginPage = false) {
  return request({
    cmd: "closeOtherTabs",
    data: { inLoginPage },
  });
}

export function lockScreen() {
  return request({
    cmd: "lockScreen",
  });
}

/** 同步数据到桌面端 */
export function syncAppData(data: {
  token: string;
  role: {
    roleName: string;
    roleCode: string;
  };
}) {
  return request({
    cmd: "syncAppData",
    data,
  });
}

export function getAppInfo() {
  return request<{ version: string; mac: string }>({
    cmd: "getAppInfo",
  });
}

/**
 * @description 获取 mac 地址
 * @returns
 */
export const getMac = () => {
  return request<string>({
    cmd: "getMac",
  });
};

export const setMaximize = () => {
  return request({
    cmd: "setMaximize",
  });
};

export const setMinimize = () => {
  return request({
    cmd: "setMinimize",
  });
};
