import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { useDispatch } from "react-redux";
import { fetchAll } from "../redux/operations";

const CarFilter = ({ onFilterChange }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleFilterChange = () => {
    onFilterChange({ name, price, minMileage, maxMileage });
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter the text"
        value={name}
        label="Car brand"
        onChange={(e) => setName(e.target.value)}
      />
      <Input type="text" placeholder="To $" value={price} label="Price/ 1 hour" onChange={(e) => setPrice(e.target.value)} />
      <Input
        type="text"
        placeholder="From"
        value={minMileage}
        label="Сar mileage / km"
        onChange={(e) => setMinMileage(e.target.value)}
      />
      <Input type="text" placeholder="To" value={maxMileage} onChange={(e) => setMaxMileage(e.target.value)} />

      <button onClick={handleFilterChange}>Search</button>
    </div>
  );
};

export default CarFilter;
