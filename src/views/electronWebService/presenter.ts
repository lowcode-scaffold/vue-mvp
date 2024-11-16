import Service from "./service";
import { useModel } from "./model";
import {
  getMac,
  lockScreen,
  setMaximize,
  setMinimize,
} from "@/utils/electronWebService";
import { useRouter } from "vue-router";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const router = useRouter();

  const handleGetMac = () => {
    getMac().then((mac) => {
      model.mac.value = mac;
    });
  };

  const handleMaximize = () => {
    setMaximize();
  };

  const handleMinimi = () => {
    setMinimize();
  };

  const handleRoute = () => {
    router.push("/vue");
  };

  const handleOpen = () => {
    window.open("https://www.baidu.com");
  };

  const handleLockScreen = () => {
    lockScreen();
  };

  return {
    model,
    service,
    handleGetMac,
    handleMaximize,
    handleMinimi,
    handleRoute,
    handleOpen,
    handleLockScreen,
  };
};
