import { useDispatch, useSelector } from "react-redux";
import { filtercars } from "../redux/slice";
import Input from "../Input/Input";
import Notification from "../Notification/Notification";
import { selectCarsList, selectFilterValue } from "../redux/selectors";
import { useEffect } from "react";
import { fetchAll, deleteContact } from "../redux/operations";

const Contacts = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectCarsList);
  const filterValue = useSelector(selectFilterValue);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(filtercars(value));
  };

  const filteredContacts = items.filter((item) => item.make && item.make.toLowerCase().includes(filterValue.toLowerCase()));

  return (
    <div>
      <Input label="Car brand" value={filterValue} onChange={handleChange} type="text" name="filter" />
      <button type="button">Search</button>
      {!filteredContacts.length ? (
        <Notification message="Contact list is empty." />
      ) : (
        <ul>
          {filteredContacts.map(
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
                <button type="button" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Contacts;
