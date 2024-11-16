import handle from "./handle";

/* eslint-disable no-shadow */
const callbacks: { [propName: string]: (data: unknown) => void } = {};
const errorCallbacks: { [propName: string]: (data: unknown) => void } = {};
function postMessage(
  data: { iframeWebCmd: string; data?: unknown },
  cb?: (data: unknown) => void,
  errorCb?: (data: unknown) => void,
) {
  if (cb) {
    const cbid = Date.now();
    callbacks[cbid] = cb;
    window.parent?.postMessage(
      {
        ...data,
        cbid,
      },
      "*",
    );
    if (errorCb) {
      errorCallbacks[cbid] = errorCb;
    }
  } else {
    window.parent?.postMessage(data, "*");
  }
}

export function request<T = unknown>(params: { cmd: string; data?: unknown }) {
  return new Promise<T>((resolve, reject) => {
    postMessage(
      { iframeWebCmd: params.cmd, data: params.data },
      (res) => {
        resolve(res as T);
      },
      (error) => {
        reject(error);
      },
    );
  });
}

function invokeCallback<T = unknown>(cbid: string, res: T) {
  window.parent?.postMessage(
    {
      iframeWebCmd: "postMessageCallback",
      cbid,
      data: res,
      code: 200,
    },
    "*",
  );
}

function invokeErrorCallback(cbid: string, res: unknown) {
  window.parent?.postMessage(
    {
      iframeWebCmd: "postMessageCallback",
      cbid,
      data: res,
      code: 400,
    },
    "*",
  );
}
export const addElectronWebWebEventListener = () => {
  window.addEventListener("message", async (event) => {
    const message = event.data as {
      electronWebCmd: string;
      cbid: string;
      code: number;
      data: never;
    };
    if (message.electronWebCmd) {
      if (message.electronWebCmd !== "postMessageCallback") {
        if (handle[message.electronWebCmd]) {
          try {
            const res = await handle[message.electronWebCmd](message.data);
            invokeCallback(message.cbid, res);
          } catch (ex: unknown) {
            invokeErrorCallback(message.cbid, ex);
          }
        } else {
          invokeErrorCallback(
            message.cbid,
            `方法不存在：${message.electronWebCmd}`,
          );
        }
      } else {
        if (message.code === 200) {
          (callbacks[message.cbid] || function () {})(message.data);
        } else {
          (errorCallbacks[message.cbid] || function () {})(message.data);
        }
        delete callbacks[message.cbid]; // 执行完回调删除
        delete errorCallbacks[message.cbid]; // 执行完回调删除
      }
    }
  });
};
