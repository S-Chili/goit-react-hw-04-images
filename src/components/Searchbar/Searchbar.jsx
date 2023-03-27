import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css'
import PropTypes from 'prop-types';

export default class Searchbar extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  
  state = {
    imageName: '',
  }

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() })
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.error("Введіть назву картинки для пошуку!");
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    )
  }
};

