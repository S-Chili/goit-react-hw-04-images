import React from 'react';
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item, onClick }) => (
    <li key={item.id}
        className={css.ImageGalleryItem}
        onClick={() => onClick(item.id)}
    >
        <img src={item.webformatURL} alt={item.tags} className={css.ImageGalleryItem_image} />
    </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};