import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ newSearchValue }) => {
  const [input, setInput] = useState('');

  const handleChange = ({ target: { value } }) => {
    setInput(value.trim());
  };

  const submitSearchImg = evt => {
    evt.preventDefault();
    if (!input) {
      alert('Enter data to search!');
      return;
    }
    newSearchValue(input);
    setInput('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={submitSearchImg}>
        <button type="submit" className={css.searchForm_button}>
          <span className={css.searchForm_button_label}>Search</span>
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={input}
          name="input"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  newSearchValue: PropTypes.func.isRequired,
};
