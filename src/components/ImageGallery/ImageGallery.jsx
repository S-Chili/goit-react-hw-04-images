import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem'
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import getImages from 'API/GetImgs';
import css from './ImageGallery.module.css'; 
import PropTypes from 'prop-types';


export default class ImageGallery extends Component {
    static propTypes = {
        imageName: PropTypes.string.isRequired,
    };

    state = {
        images: [],
        loading: false,
        error: false,
        page: 1,
        selectedImage: null,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const currentName = this.props.imageName;
        
        if (prevName !== currentName) {
            this.setState({ loading: true, images: [], page: 1 });
            this.loadImages(currentName);
        }
    }

    loadImages = async (searchTerm) => {
        const { page } = this.state;
        const images = await getImages(searchTerm, page);
        this.setState((prevState) => ({
            images: [...prevState.images, ...images],
            loading: false,
        }));
    };

  loadMoreImages = () => {
        const { imageName } = this.props;
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }), 
            () => this.loadImages(imageName) 
        );
  };
    
    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.setState({ selectedImage: null });
        }
    };

    handleImageClick = (id) => {
        const selectedImage = this.state.images.find(image => image.id === id);
        this.setState({ selectedImage });
        window.addEventListener('keydown', this.handleKeyDown);
    };

    handleModalClose = () => {
        this.setState({ selectedImage: null });
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    render() {
        const { loading, images, selectedImage } = this.state;

        return (
            <div>
                <ul className={css.gallery}>
                    {loading && <Loader />}
                    {images.map((item) => (
                        <ImageGalleryItem key={item.id} onClick={this.handleImageClick} item={item} />
                    ))}
                </ul>
                {images.length > 0 && ( 
                    <div className={css.load_more_container}>
                        <Button onClick={this.loadMoreImages}>Load more</Button>
                    </div>
                )}
                {selectedImage && (
                    <Modal onClose={this.handleModalClose}>
                        <img src={selectedImage.largeImageURL} alt={selectedImage.tags} className={css.ModalImg} />
                    </Modal>
                )}
            </div>
        );
    }
};
