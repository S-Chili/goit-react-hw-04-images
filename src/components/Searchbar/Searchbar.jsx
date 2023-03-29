import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css'
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase())
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      return toast.error("Введіть назву картинки для пошуку!");
    }

    onSubmit(imageName);
    setImageName('');
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>
        <input
          className={css.SearchForm_input}
          type="text"
          name='imageName'
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  )
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};