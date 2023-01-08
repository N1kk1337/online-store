import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { useSearchParams } from "react-router-dom";
import QueryData from "../queryData/QueryData";
import "./CustomSlider.scss";

interface CustomSliderProps {
  min: number;
  max: number;
  onChange: Function;
  name: string;
  typeOfData: string;
  minValProp: number;
  maxValProp: number;
  queryObject: QueryData;
}

const CustomSlider: FC<CustomSliderProps> = ({
  min,
  max,
  onChange,
  name,
  typeOfData,
  minValProp,
  maxValProp,
  queryObject,
}) => {
  const [queryParams, setQueryParams] = useSearchParams({ search: "" });

  const [minVal, setMinVal] = useState(minValProp);
  const [maxVal, setMaxVal] = useState(maxValProp);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
    (queryObject as any)["min" + typeOfData] = minVal;
    // TODO same "any" problem about keyof
    setQueryParams(queryObject.generateUrl());
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
    (queryObject as any)["max" + typeOfData] = maxVal;
    setQueryParams(queryObject.generateUrl());
    console.log("max val changed");
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);
  // adding onChange will trigger infinite loop?

  const handleClassName = (mVal: number) => {
    return mVal > max - 100
      ? "thumb thumb--zindex-3"
      : "thumb thumb--zindex-3 thumb--zindex-5";
  };
  useEffect(() => {
    // setMinVal(min);
    // setMaxVal(max);
    console.log("пришло из родителя");
  }, [minValProp, maxValProp]);

  return (
    <div className="filters filters__price">
      <p className="slider-name">{name}</p>
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={handleClassName(minVal)}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />
        <div className="slider">
          <div className="slider__track"></div>
          <div ref={range} className="slider__range"></div>
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;