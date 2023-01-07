import { ChangeEventHandler, FC } from "react";
import "./CheckboxFilter.scss";

interface CheckboxFilterProps {
  name: string;
  items: Array<string>;
  checkedItems: Array<string>;
  handleChange: ChangeEventHandler;
}

const CheckboxFilter: FC<CheckboxFilterProps> = ({
  name,
  items,
  checkedItems,
  handleChange,
}) => {
  return (
    <div className="filters filters__checkbox">
      {name}
      {items.map((item) => (
        <label key={item}>
          <input
            value={item}
            checked={checkedItems.includes(item)}
            type="checkbox"
            onChange={handleChange}
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default CheckboxFilter;
