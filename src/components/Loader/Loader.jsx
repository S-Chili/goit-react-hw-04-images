import React from 'react';
import css from './Loader.module.css';
import { ImSpinner2 } from 'react-icons/im';

export default function Loader() {
  return (
      <div className={css.loader}>
        <ImSpinner2 className={css.loader_icon} color="tomato" />
      </div>
  );
}