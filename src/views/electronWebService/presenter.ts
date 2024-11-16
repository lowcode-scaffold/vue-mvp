import Service from "./service";
import { useModel } from "./model";
import { getMac, setMaximize, setMinimize } from "@/utils/electronWebService";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
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

  return {
    model,
    service,
    handleGetMac,
    handleMaximize,
    handleMinimi,
  };
};
