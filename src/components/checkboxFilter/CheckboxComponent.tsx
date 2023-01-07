import { ChangeEventHandler, FC } from "react";

type CheckboxComponentProps = {
  name: string;
  items: Array<string>;
  checked: boolean;
  handleChange: ChangeEventHandler;
  current: number;
  max: number;
};

const CheckboxComponent: FC<CheckboxComponentProps> = ({
  name,
  checked,
  handleChange,
  current,
  max,
}) => {
  return (
    <div className="checkbox-component">
      <label>
        <input
          value={name}
          checked={checked}
          type="checkbox"
          onChange={handleChange}
        />
        {name} |{" "}
      </label>
      <span>
        {current} / {max}
      </span>
    </div>
  );
};

export default CheckboxComponent;
