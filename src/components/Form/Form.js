import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/operations";
import Input from "../Input/Input";
import Notiflix from "notiflix";
import { selectCarsList } from "../redux/selectors";

const Form = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const number = event.target.number.value;
    const hasName = cars.some((item) => item.name === name);
    if (hasName) {
      Notiflix.Notify.warning(`Car "${name}" already exists.`);
      return;
    }

    dispatch(addContact({ name, number }));
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <Input
        label="Number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contacts</button>
    </form>
  );
};

export default Form;
