import Service from "./service";
import { useModel } from "./model";

export interface IProps {
  name: string;
}

export interface IEmit {
  (event: "update", name: string): void;
}

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
