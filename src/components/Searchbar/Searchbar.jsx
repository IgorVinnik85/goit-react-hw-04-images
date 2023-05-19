import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from './search.svg';

export const Searchabar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');
  // state = {
  //   searchName: '',
  // };

  const handleChange = e => {
    setSearchName(e.target.value);
    // this.setState({ searchName: e.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchName === '') {
      alert('Enter something!');
      return;
    }
    onSubmit(searchName);
    setSearchName('')
    // this.setState({ searchName: '' });
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className="button-label">{<Search />}</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchabar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
