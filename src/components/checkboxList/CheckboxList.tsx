import { ChangeEventHandler, FC } from "react";
import Product from "../../assets/model/product";
import CheckboxComponent from "../checkboxFilter/CheckboxComponent";
import "./CheckboxList.scss";

type CheckboxListProps = {
  name: string;
  items: Array<string>;
  checkedItems: Array<string>;
  handleChange: ChangeEventHandler;
  currentProducts: Array<Product>;
  maxProducts: Array<Product>;
};

const CheckboxList: FC<CheckboxListProps> = ({
  name,
  items,
  checkedItems,
  handleChange,
  currentProducts,
  maxProducts,
}) => {
  return (
    <div className="filters filters__checkbox">
      <p className="category-name">{name}</p>
      {items.map((item) => (
        <CheckboxComponent
          key={item}
          name={item}
          items={items}
          checked={checkedItems.includes(item)}
          handleChange={handleChange}
          current={
            currentProducts.filter(
              (element: any) => element[name.toLowerCase()] === item
            ).length
            /*TODO discuss this 'any'*/
          }
          max={
            maxProducts.filter(
              (element: any) => element[name.toLowerCase()] === item
            ).length
          }
        />
      ))}
    </div>
  );
};

export default CheckboxList;
