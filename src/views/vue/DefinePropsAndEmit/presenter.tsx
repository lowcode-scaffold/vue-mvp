import Service from "./service";
import { useModel } from "./model";
import { message } from "ant-design-vue";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  const handleUpdate = (name: string) => {
    message.success(name);
  };

  return {
    model,
    service,
    handleUpdate,
  };
};
