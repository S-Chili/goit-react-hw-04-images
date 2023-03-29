import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';



const Button = ({ onClick, children }) => (
  <button onClick={onClick} className={css.Button} type="button">{children}</button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};