import { useSelector } from "react-redux";

import { selectCarsList } from "../redux/selectors";
import CarFilter from "../CarFilter/CarFIlter";
import { useState } from "react";

const Cars = () => {
  const items = useSelector(selectCarsList);

  const [filteredCars, setFilteredCars] = useState(items);
  console.log("items", items);
  console.log("filteredCars", filteredCars);
  const handleFilterChange = (filters) => {
    const filtered = items.filter((car) => {
      const nameMatch = car.name.toLowerCase().includes(filters.name.toLowerCase());
      const priceMatch = car.price <= filters.price || !filters.price;
      const mileageMatch =
        (car.mileage >= filters.minMileage || !filters.minMileage) &&
        (car.mileage <= filters.maxMileage || !filters.maxMileage);
      return nameMatch && priceMatch && mileageMatch;
    });
    setFilteredCars(filtered);
  };

  return (
    <div>
      <CarFilter onFilterChange={handleFilterChange} />

      <ul>
        {filteredCars.map(
          ({
            id,
            year,
            make,
            model,
            type,
            img,
            description,
            fuelConsumption,
            engineSize,
            accessories,
            functionalities,
            rentalPrice,
            rentalCompany,
            address,
            rentalConditions,
            mileage,
          }) => (
            <li key={id}>
              <img src={img} alt="car" width="400" />
              <span>
                {make} {model} {year} {rentalPrice}
              </span>
              <span>
                {address} | {rentalCompany} | {type} | {model} | {id} | {functionalities}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Cars;
