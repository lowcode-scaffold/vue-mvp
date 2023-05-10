import Service from "./service";
import { useModel } from "./model";
import { IEmit, IProps } from "./index.vue";

export const usePresenter = (props: IProps, emit: IEmit) => {
  const model = useModel();
  const service = new Service(model);

  const handleClick = () => {
    emit("update", props.name);
  };

  return {
    model,
    service,
    handleClick,
  };
};
