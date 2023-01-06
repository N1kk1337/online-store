import React, { useState } from "react";
//import "./PriceSlider.scss";

const PriceSlider: React.FC = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "min") {
      setMinPrice(Number(event.target.value));
    } else {
      setMaxPrice(Number(event.target.value));
    }
  };

  return (
    <form>
      <div className="form-group">
        <label>Price range:</label>
        <input
          type="range"
          id="min"
          value={minPrice}
          onChange={handlePriceChange}
          min={0}
          max={maxPrice}
          step={50}
          className="dual-slider"
        />
        <input
          type="range"
          id="max"
          value={maxPrice}
          onChange={handlePriceChange}
          min={minPrice}
          max={1000}
          step={50}
          className="dual-slider"
        />
      </div>
    </form>
  );
};

export default PriceSlider;
